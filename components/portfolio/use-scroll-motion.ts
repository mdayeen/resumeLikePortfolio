"use client";

import { useEffect, type RefObject } from "react";

const clamp = (value: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, value));
const fixed = (value: number) => Math.round(value * 10000) / 10000;

type Scene = {
  node: HTMLElement;
  top: number;
  height: number;
  active: boolean | null;
  draw: (top: number, height: number) => void;
};

// offsetTop follows layout, so animated transforms never feed back into measurement.
function layoutTop(element: HTMLElement): number {
  let top = 0;
  let current: HTMLElement | null = element;
  while (current) {
    top += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return top;
}

/** Cache geometry between layout changes; scroll frames only calculate and write. */
export function observeScrollMotion(element: HTMLElement, enabled: boolean) {
  const scenes: Scene[] = [];
  const ownedStyles = new Map<Element, Map<string, string>>();
  const select = (selector: string) =>
    element.querySelector<HTMLElement>(selector);
  let viewportHeight = 1;
  let mobile = false;
  let scrollRange = 1;
  let frame = 0;
  let layoutDirty = true;
  let disposed = false;

  const write = (
    target: HTMLElement | SVGElement | null,
    property: string,
    value: string,
  ) => {
    if (!target) return;
    let previous = ownedStyles.get(target);
    if (!previous) {
      previous = new Map();
      ownedStyles.set(target, previous);
    }
    if (previous.get(property) === value) return;
    previous.set(property, value);
    target.style.setProperty(property, value);
  };
  const scene = (node: HTMLElement | null, draw: Scene["draw"]) => {
    if (node) scenes.push({ node, top: 0, height: 0, active: null, draw });
  };
  const progressBar = select("[data-scroll-progress]");

  if (enabled) {
    const heroCopy = select("[data-hero-copy]");
    const heroArt = select("[data-hero-art]");
    scene(select("[data-scroll-hero]"), (top, height) => {
      const p = clamp(-top / Math.max(height, 1));
      write(heroCopy, "transform", `translate3d(0,${fixed(p * -50)}px,0)`);
      write(heroCopy, "opacity", `${fixed(1 - p * 0.75)}`);
      write(
        heroArt,
        "transform",
        `translate3d(0,${fixed(p * (mobile ? 36 : 125))}px,0) rotate(${fixed(p * 13)}deg)`,
      );
    });

    element
      .querySelectorAll<HTMLElement>("[data-scroll-project]")
      .forEach((project, index) => {
        const visual = project.querySelector<HTMLElement>(
          "[data-project-visual]",
        );
        const details = project.querySelector<HTMLElement>(
          "[data-project-details]",
        );
        scene(project, (top) => {
          const p = clamp((viewportHeight - top) / (viewportHeight * 0.72));
          const remaining = Math.pow(1 - p, 3);
          write(
            visual,
            "transform",
            `perspective(1000px) translate3d(0,${fixed(remaining * (mobile ? 35 : 100))}px,0) rotateX(${fixed(remaining * 9)}deg) rotateZ(${fixed(remaining * (index % 2 ? 5 : -5))}deg) scale(${fixed(1 - remaining * 0.13)})`,
          );
          write(details, "opacity", `${fixed(1 - remaining * 0.8)}`);
          write(
            details,
            "transform",
            `translate3d(0,${fixed(remaining * 30)}px,0)`,
          );
        });
      });

    element
      .querySelectorAll<HTMLElement>("[data-scroll-chapter]")
      .forEach((chapter) => {
        const heading = chapter.querySelector<HTMLElement>("h2");
        scene(chapter, (top) => {
          const p = clamp((viewportHeight - top) / (viewportHeight * 0.68));
          write(
            heading,
            "transform",
            `translate3d(0,${fixed((1 - p) * 45)}px,0)`,
          );
          write(heading, "opacity", `${fixed(0.25 + p * 0.75)}`);
        });
      });

    const photo = select("[data-about-photo]");
    const sticker = select("[data-about-sticker]");
    scene(select("#about"), (top) => {
      const p = clamp((viewportHeight - top) / (viewportHeight * 0.6));
      const parallax =
        clamp((viewportHeight / 2 - top) / viewportHeight, -1, 1) *
        (mobile ? 18 : 55);
      write(
        photo,
        "transform",
        `translate3d(0,${fixed(parallax)}px,0) rotate(${fixed(-6 + p * 3)}deg)`,
      );
      write(
        sticker,
        "transform",
        `translate3d(0,${fixed(parallax * -0.5)}px,0) rotate(${fixed(16 - p * 9)}deg)`,
      );
    });

    const story = select("[data-scroll-story]");
    const orbit = select("[data-story-orbit]");
    const star = orbit?.querySelector<SVGElement>("svg:first-child") ?? null;
    const counter = select("[data-story-counter]");
    const words = [
      ...element.querySelectorAll<HTMLElement>("[data-story-word]"),
    ];
    let storyStep = -1;
    scene(story, (top, height) => {
      const p = clamp(-top / Math.max(1, height - viewportHeight));
      write(
        orbit,
        "transform",
        `rotate(${fixed(p * 200)}deg) scale(${fixed(0.7 + p * 0.4)})`,
      );
      write(star, "transform", `rotate(${fixed(p * -420)}deg)`);
      write(counter, "--story-progress", `${fixed(p)}`);
      const step = Math.min(2, Math.floor(p * 3));
      if (story && step !== storyStep) {
        story.dataset.step = `${step}`;
        storyStep = step;
      }
      words.forEach((word, index) => {
        write(
          word,
          "--word-progress",
          `${fixed(clamp((p * 3 - index) * 1.6 + 0.25))}`,
        );
      });
    });

    const arrow = select("[data-contact-arrow]");
    scene(select("#contact"), (top) => {
      const p = clamp((viewportHeight - top) / (viewportHeight * 0.65));
      write(
        arrow,
        "transform",
        `rotate(${fixed((1 - p) * -80)}deg) scale(${fixed(0.65 + p * 0.35)})`,
      );
    });
    element
      .querySelectorAll<HTMLElement>("[data-scroll-ambient]")
      .forEach((node) => scene(node, () => {}));
  }

  const render = () => {
    frame = 0;
    if (disposed) return;
    const measure = layoutDirty;
    // All layout reads happen together, before any style or attribute writes.
    if (measure) {
      viewportHeight = Math.max(1, window.innerHeight);
      mobile = window.innerWidth < 760;
      scrollRange = Math.max(
        1,
        document.documentElement.scrollHeight - viewportHeight,
      );
      scenes.forEach((item) => {
        item.top = layoutTop(item.node);
        item.height = item.node.offsetHeight;
      });
      layoutDirty = false;
    }
    const scroll = window.scrollY;
    write(
      progressBar,
      "transform",
      `scaleX(${fixed(clamp(scroll / scrollRange))})`,
    );
    scenes.forEach((item) => {
      const top = item.top - scroll;
      const active = top < viewportHeight + 150 && top + item.height > -150;
      const wasActive = item.active;
      if (active !== wasActive) {
        item.node.dataset.scrollActive = `${active}`;
        item.active = active;
      }
      // Initialize and settle boundary states, but skip distant scenes on ordinary frames.
      if (measure || active || wasActive) item.draw(top, item.height);
    });
  };
  const schedule = () => {
    if (!disposed && !frame) frame = requestAnimationFrame(render);
  };
  const invalidate = () => {
    layoutDirty = true;
    schedule();
  };
  const visibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else invalidate();
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", invalidate, { passive: true });
  document.addEventListener("visibilitychange", visibility);
  element.addEventListener("load", invalidate, true);
  const resize = new ResizeObserver(invalidate);
  // Observe flow containers too: expanding an FAQ or loading a font can move later scenes.
  const layoutNodes = new Set<Element>([
    element,
    ...scenes.map(({ node }) => node),
    ...element.querySelectorAll("section"),
  ]);
  layoutNodes.forEach((node) => resize.observe(node));
  void document.fonts?.ready.then(() => {
    if (!disposed) invalidate();
  });
  schedule();

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", invalidate);
    document.removeEventListener("visibilitychange", visibility);
    element.removeEventListener("load", invalidate, true);
    resize.disconnect();
    scenes.forEach(({ node }) => {
      delete node.dataset.scrollActive;
    });
    ownedStyles.forEach((properties, node) => {
      properties.forEach((_, property) =>
        (node as HTMLElement | SVGElement).style.removeProperty(property),
      );
    });
  };
}

export function useScrollMotion(
  root: RefObject<HTMLDivElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (root.current) return observeScrollMotion(root.current, enabled);
  }, [enabled, root]);
}
