import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Braces, FileText } from "lucide-react";
import {
  organizationSchema,
  personSchema,
  profile,
  serializeJsonLd,
} from "@/lib/profile";
import s from "./agents.module.css";

export const metadata: Metadata = {
  title: "Agent View — Profile, Projects & Contact",
  description:
    "A plain, server-rendered profile of Mohammed Ayeenuddin: verified contact links, development skills, and selected projects. Available as HTML, plain text, and JSON.",
  alternates: { canonical: "/agents" },
  openGraph: {
    title: "Mohammed Ayeenuddin — Agent View",
    description: profile.description,
    url: "/agents",
    type: "profile",
    images: [profile.image],
  },
};

export default function AgentsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${profile.url}/agents#webpage`,
        url: `${profile.url}/agents`,
        name: `${profile.name} — Agent View`,
        mainEntity: { "@id": `${profile.url}/#person` },
        description: profile.description,
      },
      personSchema,
      organizationSchema,
    ],
  };

  return (
    <div className={s.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
      <header className={s.header}>
        <Link
          href="/"
          className={s.wordmark}
          aria-label="Ayeen, visual portfolio"
        >
          ayeen<span>.</span>
        </Link>
        <nav className={s.switch} aria-label="Portfolio view">
          <Link href="/">Human</Link>
          <Link href="/agents" aria-current="page">
            Agent
          </Link>
        </nav>
      </header>

      <main className={s.main}>
        <div className={s.eyebrow}>
          <span /> PORTFOLIO / PLAIN VIEW
        </div>
        <h1>
          The person.
          <br />
          The work.
          <br />
          <span>The facts.</span>
        </h1>
        <p className={s.intro}>
          A readable reference for people and AI assistants. Same portfolio,
          less interface.
        </p>

        <nav className={s.formats} aria-label="Machine-readable formats">
          <a href="/llms-full.txt">
            <FileText size={16} aria-hidden="true" /> Plain text{" "}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a href="/profile.json">
            <Braces size={16} aria-hidden="true" /> JSON{" "}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a href="/llms.txt">
            llms.txt <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>

        <section className={s.section} aria-labelledby="identity">
          <div className={s.label}>
            <span>01</span>
            <h2 id="identity">Identity</h2>
          </div>
          <div className={s.content}>
            <p className={s.summary}>{profile.description}</p>
            <dl className={s.facts}>
              <div>
                <dt>Name</dt>
                <dd>{profile.name}</dd>
              </div>
              <div>
                <dt>Also known as</dt>
                <dd>{profile.shortName}</dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>
                  {profile.location.city}, {profile.location.country}
                </dd>
              </div>
              <div>
                <dt>Organization</dt>
                <dd>
                  <a href={profile.organization.url}>
                    {profile.organization.name} ↗
                  </a>
                  <p>{profile.organization.description}</p>
                </dd>
              </div>
              <div>
                <dt>Website</dt>
                <dd>
                  <a href={profile.url}>{profile.url}</a>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className={s.section} aria-labelledby="work">
          <div className={s.label}>
            <span>02</span>
            <h2 id="work">Selected work</h2>
          </div>
          <div className={s.content}>
            {profile.projects.map((project) => (
              <article key={project.name} className={s.project}>
                <p className={s.category}>{project.category}</p>
                <h3>
                  <a href={project.url}>
                    {project.name}
                    <ArrowUpRight size={22} aria-hidden="true" />
                  </a>
                </h3>
                <p>{project.description}</p>
                <a className={s.source} href={project.url}>
                  {project.url}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className={s.section} aria-labelledby="skills">
          <div className={s.label}>
            <span>03</span>
            <h2 id="skills">Technical focus</h2>
          </div>
          <ul className={s.skills}>
            {profile.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>

        <section className={s.section} aria-labelledby="answers">
          <div className={s.label}>
            <span>04</span>
            <h2 id="answers">Quick answers</h2>
          </div>
          <div className={s.content}>
            {profile.faq.map(({ question, answer }) => (
              <div className={s.faq} key={question}>
                <h3>{question}</h3>
                <p>{answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          className={`${s.section} ${s.contact}`}
          aria-labelledby="contact"
        >
          <div className={s.label}>
            <span>05</span>
            <h2 id="contact">Get in touch</h2>
          </div>
          <div className={s.content}>
            <a className={s.booking} href={profile.bookingUrl}>
              Book a conversation <ArrowUpRight size={22} aria-hidden="true" />
            </a>
            <a className={s.email} href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <div className={s.socials}>
              {profile.socials.map(({ name, url }) => (
                <a href={url} key={name}>
                  {name} ↗
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className={s.footer}>
        <Link href="/">
          <ArrowLeft size={16} aria-hidden="true" /> Back to the experience
        </Link>
        <Link href="/privacy-policy">Privacy</Link>
      </footer>
    </div>
  );
}
