/* Behavioral regression checks for the real scroll controller, without a browser. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const source = fs.readFileSync(
  path.resolve(__dirname, "../components/portfolio/use-scroll-motion.ts"),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;

function eventTarget() {
  const listeners = new Map();
  return {
    listeners,
    addEventListener(type, callback) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(callback);
    },
    removeEventListener(type, callback) {
      listeners.get(type)?.delete(callback);
    },
    dispatch(type) {
      for (const callback of [...(listeners.get(type) || [])]) callback({ type });
    },
  };
}

function makeHarness() {
  const reads = [];
  const writes = [];
  const frames = new Map();
  const observers = [];
  let nextFrame = 0;
  let clock = 0;
  const browser = Object.assign(eventTarget(), {
    innerHeight: 800,
    innerWidth: 1280,
    scrollY: 0,
    scrollX: 0,
    matchMedia: () => ({ matches: false }),
  });

  class Element {
    constructor(name, top, height, attributes = {}) {
      Object.assign(this, eventTarget());
      this.name = name;
      this.top = top;
      this.height = height;
      this.children = [];
      this.attributes = new Map(Object.entries(attributes));
      this.dataset = new Proxy({}, {
        set: (target, key, value) => {
          target[key] = String(value);
          this.attributes.set(`data-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`, String(value));
          return true;
        },
        deleteProperty: (target, key) => {
          delete target[key];
          this.attributes.delete(`data-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`);
          return true;
        },
      });
      const styles = new Map();
      const record = (key, value) => {
        styles.set(key, String(value));
        writes.push({ element: this, key, value: String(value) });
      };
      this.style = new Proxy({
        setProperty: record,
        getPropertyValue: (key) => styles.get(key) || "",
        removeProperty: (key) => {
          const previous = styles.get(key) || "";
          styles.delete(key);
          writes.push({ element: this, key, value: "" });
          return previous;
        },
      }, {
        get: (target, key) => key in target ? target[key] : styles.get(key) || "",
        set: (_target, key, value) => { record(key, value); return true; },
      });
    }
    append(child) { child.parentElement = this; this.children.push(child); return child; }
    matches(selector) {
      if (selector.endsWith(":first-child")) return this.matches(selector.slice(0, -12)) && this.parentElement?.children[0] === this;
      if (selector.startsWith("#")) return this.attributes.get("id") === selector.slice(1);
      const attribute = selector.match(/^\[([^=\]]+)(?:=["']?([^"'\]]+)["']?)?\]$/);
      if (attribute) return this.attributes.has(attribute[1]) && (attribute[2] === undefined || this.attributes.get(attribute[1]) === attribute[2]);
      return this.name === selector;
    }
    querySelectorAll(selector) {
      const selectors = selector.split(",").map((part) => part.trim());
      const found = [];
      const visit = (parent) => {
        for (const child of parent.children) {
          if (selectors.some((part) => child.matches(part))) found.push(child);
          visit(child);
        }
      };
      visit(this);
      return found;
    }
    querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
    getAttribute(name) { return this.attributes.get(name) ?? null; }
    setAttribute(name, value) { this.attributes.set(name, String(value)); }
    removeAttribute(name) { this.attributes.delete(name); }
    getBoundingClientRect() {
      reads.push({ element: this, key: "getBoundingClientRect" });
      const top = this.top - browser.scrollY;
      return { top, bottom: top + this.height, height: this.height, left: 0, right: 1280, width: 1280, x: 0, y: top };
    }
    get offsetTop() { reads.push({ element: this, key: "offsetTop" }); return this.top - (this.parentElement?.top || 0); }
    get offsetHeight() { reads.push({ element: this, key: "offsetHeight" }); return this.height; }
    get offsetWidth() { reads.push({ element: this, key: "offsetWidth" }); return 1280; }
    get offsetParent() { return this.parentElement || null; }
    get clientHeight() { reads.push({ element: this, key: "clientHeight" }); return this.height; }
    get scrollHeight() { reads.push({ element: this, key: "scrollHeight" }); return this.height; }
  }

  const root = new Element("site", 0, 7600);
  const add = (parent, name, top, height, attribute) => parent.append(new Element(name, top, height, { [attribute]: "" }));
  const progress = add(root, "progress", 0, 3, "data-scroll-progress");
  const hero = add(root, "hero", 0, 900, "data-scroll-hero");
  add(hero, "hero-copy", 100, 500, "data-hero-copy");
  add(hero, "hero-art", 100, 600, "data-hero-art");
  for (let index = 0; index < 3; index++) {
    const project = add(root, `project-${index}`, 1100 + index * 450, 400, "data-scroll-project");
    add(project, "visual", project.top, 320, "data-project-visual");
    add(project, "details", project.top + 320, 80, "data-project-details");
  }
  for (const top of [1000, 4200, 5400, 6500]) {
    const chapter = add(root, "chapter", top, 120, "data-scroll-chapter");
    chapter.append(new Element("h2", top, 120));
  }
  const story = add(root, "story", 2600, 1760, "data-scroll-story");
  for (let index = 0; index < 3; index++) add(story, `word-${index}`, 2800 + index * 140, 140, "data-story-word");
  const orbit = add(story, "orbit", 2900, 450, "data-story-orbit");
  add(orbit, "svg", 2900, 450, "data-story-star");
  add(story, "counter", 3200, 20, "data-story-counter");
  const about = root.append(new Element("about", 4400, 800, { id: "about" }));
  add(about, "photo", 4500, 450, "data-about-photo");
  add(about, "sticker", 4900, 100, "data-about-sticker");
  add(root, "playground", 5500, 800, "data-scroll-ambient");
  const contact = root.append(new Element("contact", 6500, 900, { id: "contact" }));
  add(contact, "arrow", 6650, 200, "data-contact-arrow");
  const document = Object.assign(eventTarget(), {
    documentElement: new Element("html", 0, 7600),
    body: root,
    fonts: Object.assign(eventTarget(), { ready: Promise.resolve() }),
    visibilityState: "visible",
    hidden: false,
  });
  class ResizeObserver {
    constructor(callback) { this.callback = callback; this.targets = new Set(); this.disconnected = false; observers.push(this); }
    observe(element) { this.targets.add(element); }
    unobserve(element) { this.targets.delete(element); }
    disconnect() { this.targets.clear(); this.disconnected = true; }
    fire() { if (!this.disconnected) this.callback([...this.targets].map((target) => ({ target }))); }
  }
  const requestAnimationFrame = (callback) => { const id = ++nextFrame; frames.set(id, callback); return id; };
  const cancelAnimationFrame = (id) => frames.delete(id);
  Object.assign(browser, { requestAnimationFrame, cancelAnimationFrame });
  const module = { exports: {} };
  vm.runInNewContext(compiled, {
    module,
    exports: module.exports,
    require: (name) => { assert.equal(name, "react"); return { useEffect: () => {} }; },
    window: browser,
    document,
    HTMLElement: Element,
    ResizeObserver,
    requestAnimationFrame,
    cancelAnimationFrame,
    performance: { now: () => clock },
    console,
  }, { filename: "use-scroll-motion.js" });
  assert.equal(typeof module.exports.observeScrollMotion, "function", "The real scroll controller must expose its lifecycle for regression checks");

  const flush = () => {
    let passes = 0;
    while (frames.size) {
      assert.ok(++passes <= 10, "Scroll animation should settle instead of running a permanent frame loop");
      const queued = [...frames];
      frames.clear();
      clock += 16.67;
      for (const [, callback] of queued) callback(clock);
    }
  };
  const scroll = (position) => { browser.scrollY = position; browser.dispatch("scroll"); flush(); };
  return { root, hero, progress, browser, document, reads, writes, frames, observers, flush, scroll, start: (enabled = true) => module.exports.observeScrollMotion(root, enabled) };
}

async function setup(enabled = true) {
  const harness = makeHarness();
  harness.cleanup = harness.start(enabled);
  await Promise.resolve(); // Fonts may finish loading immediately after mounting.
  harness.flush();
  return harness;
}

async function main() {
  let passed = 0;
  async function check(name, test) {
    await test();
    console.log(`PASS ${name}`);
    passed++;
  }

  await check("scrolling reuses measured geometry and still updates the visible animation", async () => {
    const h = await setup();
    assert.ok(h.reads.length, "Initial layout must be measured");
    h.reads.length = 0;
    h.writes.length = 0;
    h.scroll(150);
    h.scroll(350);
    assert.equal(h.reads.length, 0, "Scroll frames must not force layout reads");
    assert.ok(h.writes.some((write) => write.element !== h.progress && write.element !== h.root), "Visible elements must continue animating");
    h.cleanup();
  });

  await check("motion never writes inherited CSS variables to the whole site", async () => {
    const h = await setup();
    for (const position of [250, 1600, 3100, 4650, 6650]) h.scroll(position);
    assert.deepEqual(h.writes.filter((write) => write.element === h.root && write.key.startsWith("--")), []);
    h.cleanup();
  });

  await check("unchanged scroll position produces no redundant style writes", async () => {
    const h = await setup();
    h.scroll(300);
    h.writes.length = 0;
    h.scroll(300);
    h.scroll(300);
    assert.equal(h.writes.length, 0);
    h.cleanup();
  });

  await check("ResizeObserver invalidates cached geometry before subsequent scroll frames", async () => {
    const h = await setup();
    h.scroll(300);
    h.reads.length = 0;
    h.writes.length = 0;
    h.hero.height += 500;
    assert.ok(h.observers.some((observer) => observer.targets.size), "Layout changes must be observed");
    for (const observer of h.observers) observer.fire();
    h.flush();
    assert.ok(h.reads.length > 0, "A resized layout must be measured again");
    assert.ok(h.writes.length > 0, "The current visual state must reflect the changed layout");
    h.reads.length = 0;
    h.scroll(350);
    assert.equal(h.reads.length, 0, "Scrolling after resize should reuse the new measurements");
    h.cleanup();
  });

  await check("motion disabled only updates page progress and leaves content untransformed", async () => {
    const h = await setup(false);
    h.scroll(300);
    h.scroll(3100);
    assert.ok(h.writes.length > 0, "Page progress should still update");
    assert.ok(h.writes.every((write) => write.element === h.progress));
    assert.equal(h.hero.getAttribute("data-scroll-active"), null);
    h.cleanup();
    assert.equal(h.progress.style.getPropertyValue("transform"), "");
  });

  await check("hidden pages cancel queued frames and refresh geometry when visible again", async () => {
    const h = await setup();
    h.browser.dispatch("scroll");
    assert.ok(h.frames.size > 0);
    h.document.hidden = true;
    h.document.dispatch("visibilitychange");
    assert.equal(h.frames.size, 0);
    h.reads.length = 0;
    h.document.hidden = false;
    h.document.dispatch("visibilitychange");
    h.flush();
    assert.ok(h.reads.length > 0, "Resuming the page must refresh potentially stale layout");
    h.cleanup();
  });

  await check("teardown cancels pending frames and removes listeners and observers", async () => {
    const h = await setup();
    h.browser.scrollY = 300;
    h.browser.dispatch("scroll");
    assert.ok(h.frames.size > 0, "Scroll event should have scheduled a frame");
    const animatedStyles = [...h.writes];
    h.cleanup();
    assert.equal(h.frames.size, 0);
    assert.ok(h.observers.every((observer) => observer.disconnected));
    for (const { element, key } of animatedStyles) assert.equal(element.style.getPropertyValue(key), "", "Teardown must remove animation-owned inline styles");
    assert.equal(h.hero.getAttribute("data-scroll-active"), null);
    for (const target of [h.root, h.browser, h.document, h.document.fonts]) {
      for (const listeners of target.listeners.values()) assert.equal(listeners.size, 0);
    }
    h.reads.length = 0;
    h.writes.length = 0;
    h.browser.dispatch("scroll");
    h.browser.dispatch("resize");
    for (const observer of h.observers) observer.fire();
    h.flush();
    assert.equal(h.reads.length, 0);
    assert.equal(h.writes.length, 0);
  });

  console.log(`\n${passed} scroll-motion regression checks passed.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
