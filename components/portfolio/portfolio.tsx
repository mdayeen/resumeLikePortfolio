"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  MapPin,
  MoveUpRight,
  Pause,
  Play,
  CalendarDays,
} from "lucide-react";
import { Header } from "@/components/header";
import { ProjectArt } from "./project-art";
import { SignalGame } from "./signal-game";
import { useScrollMotion } from "./use-scroll-motion";
import { profile } from "@/lib/profile";
import s from "./portfolio.module.css";

function Spark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M50 0 58 32 85 15 68 42 100 50 68 58 85 85 58 68 50 100 42 68 15 85 32 58 0 50 32 42 15 15 42 32Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChromeLoop() {
  return (
    <svg viewBox="0 0 240 240" className={s.chromeLoop} aria-hidden="true">
      <defs>
        <linearGradient id="chrome" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#faffeb" />
          <stop offset=".17" stopColor="#707566" />
          <stop offset=".32" stopColor="#e9f0de" />
          <stop offset=".45" stopColor="#454c3b" />
          <stop offset=".51" stopColor="#0f190c" />
          <stop offset=".63" stopColor="#d4ff5f" />
          <stop offset=".78" stopColor="#6c8140" />
          <stop offset=".9" stopColor="#efffca" />
          <stop offset="1" stopColor="#575e4c" />
        </linearGradient>
        <linearGradient id="chromeEdge" x1="0" y1="1" x2="1" y2="0">
          <stop stopColor="#2b3622" />
          <stop offset=".5" stopColor="#faffec" />
          <stop offset="1" stopColor="#d4ff5f" />
        </linearGradient>
        <filter id="loopShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="10" dy="15" stdDeviation="9" floodOpacity=".45" />
        </filter>
      </defs>
      <g transform="rotate(-32 120 120)" filter="url(#loopShadow)">
        <ellipse
          cx="120"
          cy="120"
          rx="72"
          ry="82"
          stroke="url(#chrome)"
          strokeWidth="38"
        />
        <ellipse
          cx="120"
          cy="120"
          rx="88"
          ry="99"
          stroke="url(#chromeEdge)"
          strokeWidth="1.5"
          opacity=".7"
        />
        <ellipse
          cx="120"
          cy="120"
          rx="53"
          ry="63"
          stroke="#efffc9"
          strokeWidth="1"
          opacity=".55"
        />
      </g>
    </svg>
  );
}

const projects = [
  {
    number: "01",
    kind: "rotana" as const,
    title: "Rotana",
    category: "COMPLEX SYSTEMS. SIMPLE EXPERIENCES.",
    description:
      "One connected platform for warehouses, inventory, and the people keeping everything moving.",
    tags: ["Full stack", "ERP platform"],
    slug: "rotana-store-platform",
    href: "/projects/rotana-store-platform",
  },
  {
    number: "02",
    kind: "school" as const,
    title: "School Repo",
    category: "LESS PAPERWORK. MORE POSSIBILITY.",
    description:
      "Students, attendance, fees, payroll, and academics. A connected workspace for a calmer school day.",
    tags: ["School management", "ERP platform"],
    slug: "school-erp",
    href: "https://schoolrepo.com",
  },
  {
    number: "03",
    kind: "hamuzair" as const,
    title: "Hamuzair",
    category: "FROM A THOUGHT TO A THREAD.",
    description:
      "An idea becomes artwork. A 3D garment becomes your canvas. AI-powered custom apparel, made personal.",
    tags: ["AI + 3D", "Custom commerce"],
    slug: "hamuzair",
    href: "https://www.hamuzair.com",
  },
];

export function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const portrait = useRef<HTMLDivElement>(null);
  const [motion, setMotion] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [time, setTime] = useState("INDIA · IST");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useScrollMotion(root, motion);

  const toggleMotion = () => {
    setMotion((previous) => {
      try {
        localStorage.setItem("ayeen-motion", previous ? "off" : "on");
      } catch {}
      return !previous;
    });
  };

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem("ayeen-motion");
      } catch {}
      setMotion(saved === "on" || (saved !== "off" && !preference.matches));
    };
    sync();
    preference.addEventListener("change", sync);
    const clock = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()) + " IST",
      );
    clock();
    const interval = setInterval(clock, 60000);
    return () => {
      clearInterval(interval);
      preference.removeEventListener("change", sync);
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  useEffect(() => {
    const sections =
      root.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!sections) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top > window.innerHeight && motion)
        section.setAttribute("data-visible", "false");
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, [motion]);

  const tilt = (event: PointerEvent<HTMLDivElement>) => {
    if (!motion || event.pointerType !== "mouse" || !portrait.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    portrait.current.style.setProperty(
      "--ry",
      `${((event.clientX - rect.left - rect.width / 2) / rect.width) * 16}deg`,
    );
    portrait.current.style.setProperty(
      "--rx",
      `${(-(event.clientY - rect.top - rect.height / 2) / rect.height) * 12}deg`,
    );
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyError(false);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  };

  return (
    <div className={s.site} ref={root} data-motion={motion ? "on" : "off"}>
      <div
        className={s.scrollProgress}
        data-scroll-progress
        aria-hidden="true"
      />
      <a className={s.skipLink} href="#main">
        Skip to content
      </a>
      <Header motionEnabled={motion} onToggleMotion={toggleMotion} />
      <main id="main">
        <section
          className={`${s.hero} ${s.wrap}`}
          aria-labelledby="hero-title"
          data-scroll-hero
        >
          <div className={s.heroCopy} data-hero-copy>
            <div className={s.eyebrow}>
              <span className={s.statusDot} /> A DEVELOPER. A BUILDER. A LITTLE
              DIFFERENT.
            </div>
            <h1 id="hero-title">
              Coffee. Code.
              <br />
              <span className={s.heroSecond}>
                Past <em>midnight.</em>
                <Spark className={s.headlineSpark} />
              </span>
            </h1>
            <div className={s.heroIntro}>
              <span className={s.introLine} />
              <p>
                Hey, I’m <strong>Ayeen.</strong> A full stack developer turning
                <br className={s.desktopBreak} /> big “what ifs” into things you
                can actually use.
              </p>
            </div>
            <div className={s.heroActions}>
              <a
                className={s.primaryButton}
                href={profile.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a call <ArrowUpRight size={19} />
              </a>
              <a className={s.textButton} href="#work">
                Explore my work <ArrowDownRight size={16} />
              </a>
            </div>
            <div className={s.heroByline}>
              <span>BASED IN HYDERABAD, INDIA</span>
              <span className={s.tinyCross}>+</span>
              <span>BUILDING FOR EVERYWHERE</span>
            </div>
          </div>

          <div
            className={s.heroArt}
            data-hero-art
            onPointerMove={tilt}
            onPointerLeave={() => {
              portrait.current?.style.setProperty("--rx", "0deg");
              portrait.current?.style.setProperty("--ry", "0deg");
            }}
          >
            <div className={s.orbitBack} aria-hidden="true" />
            <svg
              className={s.orbitLine}
              viewBox="0 0 540 540"
              fill="none"
              aria-hidden="true"
            >
              <ellipse
                cx="270"
                cy="270"
                rx="252"
                ry="156"
                transform="rotate(-35 270 270)"
                stroke="#73796a"
                strokeWidth=".8"
                strokeDasharray="4 7"
              />
              <circle cx="65" cy="356" r="6" fill="#d4ff5f" />
              <path d="M415 77v22m-11-11h22" stroke="#d4ff5f" />
            </svg>
            <div className={s.portraitDepth} ref={portrait}>
              <div className={s.portraitFrame}>
                <Image
                  src="/images/ayeen-red.webp"
                  alt="Ayeen in black sunglasses, lit by a red studio light"
                  fill
                  priority
                  sizes="(max-width: 600px) 76vw, (max-width: 1000px) 60vw, 420px"
                  className={s.portrait}
                />
                <div className={s.portraitGrain} />
                <div className={s.portraitCaption}>
                  <span>MOHAMMED AYEENUDDIN</span>
                  <span>↗</span>
                </div>
              </div>
            </div>
            <div className={s.codeTag}>
              <span>&lt;/&gt;</span> ideas into reality.
            </div>
            <div className={s.loopWrap}>
              <ChromeLoop />
            </div>
            <div className={s.roundSeal}>
              <svg viewBox="0 0 120 120" aria-hidden="true">
                <defs>
                  <path
                    id="sealCircle"
                    d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
                  />
                </defs>
                <text>
                  <textPath href="#sealCircle" textLength="271">
                    CREATIVE MIND · DEVELOPER AT HEART ·{" "}
                  </textPath>
                </text>
              </svg>
              <Spark />
            </div>
            <span className={s.photoNote}>yes, i do touch grass.</span>
            <svg className={s.noteArrow} viewBox="0 0 80 55" aria-hidden="true">
              <path
                d="M4 5C55 1 64 19 55 42m-9-9 9 12 13-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className={s.heroBottom}>
            <a href="#work">
              <span className={s.scrollMouse}>
                <span />
              </span>{" "}
              SCROLL TO EXPLORE <ArrowDown size={13} />
            </a>
            <span className={s.availability}>
              <span className={s.statusDot} /> OPEN FOR GOOD PROJECTS & GREAT
              PEOPLE
            </span>
            <button
              onClick={toggleMotion}
              aria-pressed={motion}
              aria-label={
                motion ? "Pause site animations" : "Enable site animations"
              }
            >
              {motion ? <Pause size={12} /> : <Play size={12} />} MOTION{" "}
              {motion ? "ON" : "OFF"}
            </button>
          </div>
        </section>

        <div
          className={s.marquee}
          data-scroll-ambient
          aria-label="Full stack development, creative thinking, thoughtful experiences, real-world impact"
        >
          <div className={s.marqueeTrack} aria-hidden="true">
            {[0, 1].map((copy) => (
              <div className={s.marqueeGroup} key={copy}>
                {[
                  "FULL STACK DEVELOPMENT",
                  "CREATIVE THINKING",
                  "THOUGHTFUL EXPERIENCES",
                  "REAL-WORLD IMPACT",
                ].map((label) => (
                  <span key={label}>
                    {label}
                    <Spark />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section
          className={`${s.work} ${s.wrap}`}
          id="work"
          aria-labelledby="work-title"
        >
          <div className={s.sectionTop} data-reveal data-scroll-chapter>
            <div>
              <p className={s.sectionLabel}>
                <span>01 / SELECTED WORK</span>
                <span>IDEAS THAT MADE IT OUT OF MY HEAD</span>
              </p>
              <h2 id="work-title">
                Less talk.
                <br />
                <span className={s.muted}>More </span>
                <em>shipped.</em>
              </h2>
            </div>
            <Link href="/projects" className={s.outlineButton}>
              All projects <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className={s.projectGrid}>
            {projects.map((project, index) => (
              <Link
                href={project.href}
                target={project.href.startsWith("https") ? "_blank" : undefined}
                rel={
                  project.href.startsWith("https")
                    ? "noopener noreferrer"
                    : undefined
                }
                key={project.slug}
                className={`${s.projectCard} ${index === 0 ? s.featuredProject : ""}`}
                data-scroll-project
              >
                <div className={s.projectVisual} data-project-visual>
                  <ProjectArt kind={project.kind} />
                  <div className={s.projectNumber}>/{project.number}</div>
                  <span className={s.projectOpen} aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </div>
                <div className={s.projectDetails} data-project-details>
                  <div>
                    <p className={s.projectCategory}>{project.category}</p>
                    <h3>
                      {project.title}
                      <ArrowUpRight size={25} />
                    </h3>
                    <p className={s.projectDescription}>
                      {project.description}
                    </p>
                  </div>
                  <div className={s.projectTags}>
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section
          className={s.scrollStory}
          data-scroll-story
          aria-labelledby="story-title"
        >
          <div className={s.storySticky}>
            <div className={`${s.storyInner} ${s.wrap}`}>
              <p className={s.sectionLabel}>THE PROCESS / KEEP SCROLLING</p>
              <h2
                id="story-title"
                className={s.storyWords}
                aria-label="Think it. Build it. Ship it."
              >
                <span data-story-word data-word="Think it." aria-hidden="true">
                  Think it.
                </span>
                <span data-story-word data-word="Build it." aria-hidden="true">
                  Build it.
                </span>
                <span data-story-word data-word="Ship it." aria-hidden="true">
                  Ship it.
                </span>
              </h2>
              <div className={s.storyOrbit} data-story-orbit aria-hidden="true">
                <Spark />
                <svg viewBox="0 0 300 300">
                  <circle
                    cx="150"
                    cy="150"
                    r="142"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="2 10"
                  />
                  <ellipse
                    cx="150"
                    cy="150"
                    rx="141"
                    ry="48"
                    fill="none"
                    stroke="currentColor"
                    transform="rotate(-30 150 150)"
                  />
                </svg>
              </div>
              <div className={s.storyNotes}>
                <p>
                  Find the real problem.
                  <br />
                  <span>Ask better questions.</span>
                </p>
                <p>
                  Give the idea a shape.
                  <br />
                  <span>Make every detail count.</span>
                </p>
                <p>
                  Put it in people’s hands.
                  <br />
                  <span>Learn. Improve. Repeat.</span>
                </p>
              </div>
              <span className={s.storyCounter} aria-hidden="true">
                <i data-story-counter /> SCROLL INTO THE NEXT CHAPTER
              </span>
            </div>
          </div>
        </section>
        <section className={s.about} id="about" aria-labelledby="about-title">
          <div className={`${s.aboutGrid} ${s.wrap}`}>
            <div className={s.aboutPhotoWrap} data-reveal>
              <div className={s.aboutPhoto} data-about-photo>
                <Image
                  src="/images/ayeen-sun.webp"
                  alt="Ayeen wearing round sunglasses in warm afternoon sunlight"
                  fill
                  sizes="(max-width: 760px) 90vw, 420px"
                />
                <span className={s.photoCorner}>
                  A LITTLE OFFLINE MOMENT ↗
                </span>
              </div>
              <div className={s.aboutSticker} data-about-sticker>
                human
                <br />
                before
                <br />
                <em>developer.</em>
                <Spark />
              </div>
              <div className={s.photoCoordinates}>
                <MapPin size={12} /> HYDERABAD, INDIA{" "}
                <span>17.38° N · 78.48° E</span>
              </div>
            </div>
            <div className={s.aboutCopy} data-reveal data-scroll-chapter>
              <p className={s.sectionLabel}>02 / THE HUMAN BIT</p>
              <h2 id="about-title">
                Not just a<br />
                pair of <em>hands.</em>
              </h2>
              <p className={s.aboutLead}>
                A curious mind. A builder’s instinct.
                <br />
                An unreasonable attention to detail.
              </p>
              <p>
                I’m Mohammed Ayeenuddin — Ayeen for short. I build full stack
                products and co-founded{" "}
                <a
                  href="https://anjeerlabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Anjeer Labs <ArrowUpRight size={14} />
                </a>
                , an education-first technology company.
              </p>
              <p>
                I care about what happens behind the interface just as much as
                how it feels to use. From the first sketch to the last API call,
                I like making the whole thing click.
              </p>
              <a
                className={s.educationNote}
                href={profile.organization.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BookOpen size={21} strokeWidth={1.5} aria-hidden="true" />
                <span>
                  <strong>Education first.</strong>
                  <span>The heart of Anjeer Labs.</span>
                </span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <div className={s.aboutLinks}>
                <a
                  href="/Ayeenuddin%202page.pdf"
                  download="Mohammed_Ayeenuddin_CV.pdf"
                  className={s.darkButton}
                >
                  The résumé, if you’re curious <ArrowDown size={16} />
                </a>
                <a
                  href="https://github.com/mdayeen"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ayeen on GitHub"
                >
                  <Github size={21} />
                </a>
                <a
                  href="https://linkedin.com/in/mdyeen"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ayeen on LinkedIn"
                >
                  <Linkedin size={21} />
                </a>
              </div>
            </div>
          </div>
          <div className={`${s.stackLine} ${s.wrap}`}>
            <span>MY EVERYDAY TOOLKIT</span>
            <div>
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "PostgreSQL",
                "AWS",
              ].map((tool, i) => (
                <span key={tool}>
                  <span className={s.stackIcon}>
                    {["⚛", "N", "TS", "⬡", "◉", "↗"][i]}
                  </span>
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section
          className={`${s.playground} ${s.wrap}`}
          id="playground"
          aria-labelledby="playground-title"
        >
          <div className={s.playgroundCopy} data-reveal data-scroll-chapter>
            <p className={s.sectionLabel}>03 / A LITTLE MENTAL PLAY</p>
            <h2 id="playground-title">
              Big ideas.
              <br />
              <em>Sharp minds.</em>
            </h2>
            <p>
              Great builds start with spotting a pattern.
              <br />
              How long can you keep the signal alive?
            </p>
            <div className={s.playgroundNote}>
              <ArrowRight size={20} />
              <span>
                Watch. Remember. Repeat.
                <br />
                <small>Nine tiles. Ten rounds. Three places at the top.</small>
              </span>
            </div>
            <span className={s.labLabel}>
              <span className={s.statusDot} /> SIGNAL SPRINT — A MEMORY
              MICROGAME
            </span>
          </div>
          <div className={s.gameWrap}>
            <SignalGame motion={motion} />
          </div>
        </section>

        <section className={`${s.faq} ${s.wrap}`} aria-labelledby="faq-title">
          <div data-scroll-chapter>
            <p className={s.sectionLabel}>THE SHORT ANSWERS</p>
            <h2 id="faq-title">
              A little more <em>context.</em>
            </h2>
          </div>
          <div className={s.faqItems}>
            {profile.faq.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section
          className={s.contact}
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className={s.wrap}>
            <div className={s.contactTop}>
              <p className={s.sectionLabel}>04 / YOUR MOVE</p>
              <span>
                <span className={s.statusDot} /> OPEN TO COLLABORATIONS
              </span>
            </div>
            <div className={s.contactHeadline} data-reveal data-scroll-chapter>
              <h2 id="contact-title">
                Got a good
                <br />
                <em>“what if”?</em>
              </h2>
              <a
                href={profile.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={s.contactArrow}
                data-contact-arrow
                aria-label="Book a call with Ayeen on Cal.com"
              >
                <MoveUpRight />
              </a>
            </div>
            <div className={s.contactBottom}>
              <div className={s.bookingCopy}>
                <a
                  href={profile.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.bookingLink}
                >
                  <CalendarDays size={18} /> Pick a time. Let’s talk.{" "}
                  <ArrowUpRight size={17} />
                </a>
                <p>
                  Let’s make something people
                  <br />
                  want to spend time with.
                </p>
              </div>
              <div className={s.emailBlock}>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <button onClick={copyEmail} aria-label="Copy email address">
                  {copied ? <Check size={20} /> : <Copy size={19} />}
                </button>
                <span className={s.copyFeedback} aria-live="polite">
                  {copied
                    ? "Copied. Your move!"
                    : copyError
                      ? "Select the email to copy it, or click to open your mail app."
                      : ""}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className={`${s.footer} ${s.wrap}`}>
        <div className={s.footerTop}>
          <Link href="/" className={s.footerBrand}>
            ayeen
            <Spark />.
          </Link>
          <div>
            <a
              href="https://github.com/mdayeen"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <ArrowUpRight size={13} />
            </a>
            <a
              href="https://linkedin.com/in/mdyeen"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight size={13} />
            </a>
            <a
              href="https://x.com/mdayeen"
              target="_blank"
              rel="noopener noreferrer"
            >
              X / Twitter <ArrowUpRight size={13} />
            </a>
            <Link href="/blog">
              Field notes <ArrowUpRight size={13} />
            </Link>
          </div>
          <a className={s.backTop} href="#main">
            BACK TO TOP <ArrowUpRight size={16} />
          </a>
        </div>
        <div className={s.footerBottom}>
          <span>© {new Date().getFullYear()} MOHAMMED AYEENUDDIN</span>
          <span>MADE WITH INTENTION. AND A LITTLE OBSESSION.</span>
          <span>HYDERABAD · {time}</span>
        </div>
      </footer>
    </div>
  );
}
