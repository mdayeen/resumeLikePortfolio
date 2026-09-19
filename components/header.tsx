"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Play,
  Pause,
} from "lucide-react";

import styles from "@/components/portfolio/header.module.css";
import { LiveStats } from "@/components/portfolio/live-stats";

const navItems = [
  { name: "Work", href: "/#work" },
  { name: "About", href: "/#about" },
  { name: "Playground", href: "/#playground" },
];

export function Header({
  motionEnabled,
  onToggleMotion,
}: { motionEnabled?: boolean; onToggleMotion?: () => void } = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    firstLinkRef.current?.focus();

    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsOpen(false);
    };

    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [isOpen]);

  return (
    <header
      ref={headerRef}
      className={styles.header}
      onKeyDown={(event) => {
        if (event.key === "Escape" && isOpen) {
          event.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setIsOpen(false);
      }}
    >
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.brand}
          aria-label="Ayeen — home"
          onClick={() => setIsOpen(false)}
        >
          <svg
            className={styles.brandMark}
            width="27"
            height="27"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M16 2v28M2 16h28M6.1 6.1l19.8 19.8M6.1 25.9 25.9 6.1"
              stroke="currentColor"
              strokeWidth="4.5"
            />
          </svg>
          <span>
            ayeen<span className={styles.brandDot}>.</span>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <span className={styles.status}>
            <span /> Open to collabs
          </span>
          <a
            href="https://cal.com/anjeerlabs"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            Book a call{" "}
            <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>

        <button
          ref={triggerRef}
          type="button"
          className={styles.menuToggle}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <X size={23} aria-hidden="true" />
          ) : (
            <Menu size={23} aria-hidden="true" />
          )}
        </button>
      </div>

      <div className={styles.utilityBar}>
        <LiveStats />
        <div className={styles.utilityActions}>
          {onToggleMotion && (
            <button
              className={styles.motionToggle}
              onClick={onToggleMotion}
              aria-pressed={motionEnabled}
              aria-label="Toggle scroll motion"
              title={
                motionEnabled
                  ? "Scroll motion on"
                  : "Scroll motion off — enable the full experience"
              }
            >
              {motionEnabled ? <Pause size={11} /> : <Play size={11} />}
              <span>MOTION {motionEnabled ? "ON" : "OFF"}</span>
            </button>
          )}
          <nav
            className={styles.viewSwitch}
            aria-label="Portfolio reading mode"
          >
            <Link
              href="/"
              aria-current={pathname !== "/agents" ? "page" : undefined}
            >
              Human
            </Link>
            <Link
              href="/agents"
              aria-current={pathname === "/agents" ? "page" : undefined}
            >
              <span aria-hidden="true">&lt;/&gt;</span> Agent
            </Link>
          </nav>
        </div>
      </div>
      <div
        id="mobile-navigation"
        className={styles.mobilePanel}
        hidden={!isOpen}
      >
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              ref={index === 0 ? firstLinkRef : undefined}
              href={item.href}
              onClick={() => setIsOpen(false)}
            >
              <span className={styles.linkNumber}>0{index + 1}</span>
              {item.name}
              <ArrowUpRight size={23} strokeWidth={1.4} aria-hidden="true" />
            </Link>
          ))}
          <a
            href="https://cal.com/anjeerlabs"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileContact}
            onClick={() => setIsOpen(false)}
          >
            Book a call{" "}
            <ArrowUpRight size={23} strokeWidth={1.4} aria-hidden="true" />
          </a>
        </nav>
        <div className={styles.mobileFooter}>
          <span className={styles.status}>
            <span /> Open to collabs
          </span>
          <div className={styles.socialLinks}>
            <a
              href="https://github.com/mdayeen"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <Github size={19} />
            </a>
            <a
              href="https://linkedin.com/in/mdyeen"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={19} />
            </a>
            <a href="mailto:ayeen0410@gmail.com" aria-label="Email Ayeen">
              <Mail size={19} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
