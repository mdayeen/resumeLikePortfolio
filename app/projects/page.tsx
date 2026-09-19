import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Mail,
} from "lucide-react";

import { Header } from "@/components/header";
import { ProjectArt } from "@/components/portfolio/project-art";
import s from "@/components/portfolio/projects-index.module.css";

export const metadata: Metadata = {
  title: "Selected Software Projects",
  description:
    "Browse software projects engineered by Mohammed Ayeenuddin, including flagship ERP platforms, Warehouse Management Systems (WMS), travel portals, and SaaS tools.",
  alternates: {
    canonical: "./",
  },
};

const projects = [
  {
    title: "Hamuzair",
    category: "AI + 3D Custom Commerce",
    desc: "An AI-powered custom apparel experience: generate artwork, refine it on a live 3D garment, and order a piece made for you.",
    tags: ["AI artwork", "3D customizer", "E-commerce"],
    slug: "hamuzair",
    demo: "https://www.hamuzair.com",
    kind: "hamuzair" as const,
  },
  {
    title: "Rotana Store Platform",
    category: "WMS & Franchise ERP",
    desc: "An enterprise Warehouse Management System (WMS) and Franchise Management ERP designed to run complex logistical networks. Integrates live stock status syncs, supplier credits ledgers, delivery routings, and multi-tier RBAC profiles.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "MongoDB", "Express", "JWT"],
    slug: "rotana-store-platform",
    demo: "https://rotana-web-app.vercel.app/",
    kind: "rotana" as const,
  },
  {
    title: "Al-Fahads Tours & Travels",
    category: "Travel Booking Platform",
    desc: "A fully responsive reservation portal with admin statistics panels, staff operations registers, interactive travel plan builders, and secure Cloudflare R2 media storage assets.",
    tags: ["React.js", "Node.js", "MongoDB", "Express", "Cloudflare R2"],
    slug: "al-fahads-tours-travels",
    demo: "https://www.alfahadstours.com/",
    kind: "travel" as const,
  },
  {
    title: "AI-Powered Resume Builder",
    category: "SaaS Application",
    desc: "A SaaS tool integrating OpenAI's API. Provides resume template customizations, dynamic subheadings generation, formatted structures edits, and client-side PDF export compiler systems.",
    tags: ["Next.js", "OpenAI API", "Tailwind CSS", "PDF Compiler"],
    slug: "ai-resume-builder",
    demo: "https://mytask-beryl.vercel.app/",
    kind: "resume" as const,
  },
  {
    title: "Drag-and-Drop Email Builder",
    category: "Web Productivity Tool",
    desc: "A graphic editor tool enabling rapid design of responsive HTML email newsletters with an interactive canvas editor compiling into direct HTML/JSON schemas.",
    tags: ["React.js", "Material UI", "MongoDB", "Express", "Node.js"],
    slug: "email-builder",
    demo: "https://build-email.vercel.app",
    kind: "email" as const,
  },
  {
    title: "Multi-Role School ERP Platform",
    category: "Education ERP",
    desc: "A multi-tenant academic management platform supporting multi-role access (Admin, Teachers, Parents, Students). Coordinates automated attendance alerts, billing/fee ledgers, and academic status monitoring charts.",
    tags: ["Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    slug: "school-erp",
    demo: "https://schoolrepo.com/",
    kind: "school" as const,
  },
];

function EmailArt() {
  return (
    <div className={`${s.typeArt} ${s.emailArt}`} aria-hidden="true">
      <span className={s.artEyebrow}>GOOD IDEAS. DELIVERED.</span>
      <div className={s.emailWord}>
        Build.
        <br />
        Send.
        <br />
        <span>Connect.</span>
      </div>
      <div className={s.emailTile}>
        <Mail strokeWidth={1} />
        <span>Made to open.</span>
        <i />
        <i />
        <i />
      </div>
      <svg className={s.emailPath} viewBox="0 0 520 325" fill="none">
        <path
          d="M280 56H440V240H340"
          stroke="currentColor"
          strokeDasharray="4 5"
        />
        <path d="m351 230-11 10 11 10" stroke="currentColor" />
      </svg>
      <span className={s.artCaption}>DRAG. DROP. MAKE IT YOURS.</span>
    </div>
  );
}

function SchoolArt() {
  return (
    <div className={`${s.typeArt} ${s.schoolArt}`} aria-hidden="true">
      <span className={s.artEyebrow}>ONE SCHOOL. EVERY PERSPECTIVE.</span>
      <div className={s.schoolRings}>
        <span />
        <span />
        <span />
      </div>
      <span className={s.schoolNode}>Teachers</span>
      <span className={s.schoolNode}>Students</span>
      <span className={s.schoolNode}>Parents</span>
      <div className={s.schoolWord}>
        A better
        <br />
        <span>school day.</span>
      </div>
      <span className={s.artCaption}>CONNECTED BY DESIGN.</span>
    </div>
  );
}

export default function Projects() {
  return (
    <div className={s.page}>
      <a className={s.skipLink} href="#projects-main">
        Skip to projects
      </a>
      <Header />
      <main id="projects-main" className={s.main}>
        <section className={s.intro} aria-labelledby="projects-title">
          <div className={s.eyebrow}>
            <span /> THE WORK / SELECTED PROJECTS
          </div>
          <div className={s.headingRow}>
            <h1 id="projects-title">
              Built to
              <br />
              be <em>used.</em>
              <Asterisk
                className={s.headingStar}
                strokeWidth={1.3}
                aria-hidden="true"
              />
            </h1>
            <div className={s.introNote}>
              <ArrowDownRight size={35} strokeWidth={1} aria-hidden="true" />
              <p>
                Big ideas, real-world problems,
                <br />
                and the software that connects them.
              </p>
              <span>06 PROJECTS · FROM IDEA TO INTERFACE</span>
            </div>
          </div>
          <div className={s.indexBar}>
            <span>THE FULL COLLECTION</span>
            <span>ERP · SAAS · WEB EXPERIENCES</span>
          </div>
        </section>

        <section className={s.grid} aria-label="Project collection">
          {projects.map((project, index) => (
            <article className={s.project} key={project.slug}>
              <Link
                href={
                  project.kind === "hamuzair"
                    ? project.demo
                    : `/projects/${project.slug}`
                }
                className={s.artLink}
                aria-label={`View ${project.title}${project.kind === "hamuzair" ? " website" : " case study"}`}
              >
                {project.kind === "email" ? (
                  <EmailArt />
                ) : (
                  <ProjectArt kind={project.kind} />
                )}
                <span className={s.artArrow}>
                  <ArrowUpRight
                    size={21}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </span>
              </Link>
              <div className={s.projectTop}>
                <span className={s.projectNumber}>0{index + 1}</span>
                <span>{project.category}</span>
                {index === 0 && <span className={s.featured}>FEATURED</span>}
              </div>
              <h2>
                <Link
                  href={
                    project.kind === "hamuzair"
                      ? project.demo
                      : `/projects/${project.slug}`
                  }
                >
                  {project.title}
                </Link>
              </h2>
              <p className={s.description}>{project.desc}</p>
              <ul className={s.tags} aria-label="Technologies">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <div className={s.projectLinks}>
                <Link
                  href={
                    project.kind === "hamuzair"
                      ? project.demo
                      : `/projects/${project.slug}`
                  }
                >
                  {project.kind === "hamuzair"
                    ? "Explore the product"
                    : "The case study"}{" "}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live demo <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}

          <aside className={s.nextProject}>
            <Asterisk size={72} strokeWidth={1} aria-hidden="true" />
            <span className={s.eyebrow}>THERE&apos;S ROOM FOR ONE MORE.</span>
            <h2>
              Your idea.
              <br />
              <em>Our next build.</em>
            </h2>
            <p>
              Something useful, something ambitious,
              <br />
              or something a little unexpected.
            </p>
            <Link
              href="https://cal.com/anjeerlabs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Let&apos;s make it happen{" "}
              <ArrowUpRight size={19} aria-hidden="true" />
            </Link>
            <span className={s.nextNumber}>07 / NEXT UP?</span>
          </aside>
        </section>
        <footer className={s.footer}>
          <Link href="/">
            <ArrowLeft size={16} aria-hidden="true" /> Back to the playground
          </Link>
          <span>THOUGHTFULLY BUILT BY AYEEN.</span>
          <Link
            href="https://cal.com/anjeerlabs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </footer>
      </main>
    </div>
  );
}
