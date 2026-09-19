import { Metadata } from "next"
import Link from "next/link"
import { Github, Linkedin, Mail, FileText, Calendar, GraduationCap, Briefcase, Award, Sparkles, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "About",
  description: "Professional profile of Mohammed Ayeenuddin, Full Stack Developer, SaaS Architect, and Co-Founder of Anjeer Labs based in Hyderabad, India.",
  alternates: {
    canonical: "/about",
  }
}

export default function About() {
  const experiences = [
    {
      role: "Co-Founder & Technical Lead",
      company: "Anjeer Labs",
      period: "May 2024 - Present",
      location: "Hyderabad, India",
      details: [
        "Co-founded Anjeer Labs, an education-first technology company.",
        "Architected multi-role school ERP platforms and secure travel agency reservation portals.",
        "Lead team technical designs, defining PostgreSQL schemas, Node.js REST API endpoints, and Next.js App Router pre-rendering frameworks.",
        "Establish secure Cloudflare Workers/R2 storage pipelines and perform cloud server deployments on AWS."
      ]
    },
    {
      role: "Full Stack Developer",
      company: "Code For India Org",
      period: "Nov 2022 - April 2023",
      location: "Hyderabad, India",
      details: [
        "Developed custom financial ledgers, secure user accounts management interfaces, and automated credit monitoring limits.",
        "Designed and implemented high-security JWT token structures and RBAC parameters.",
        "Optimized client-side React rendering speeds by profiling components and implementing lazy-loading and asset compression.",
        "Engaged in Scrum workflows, sprint planning, and mentorship sessions for junior developers."
      ]
    },
    {
      role: "Educator",
      company: "RR Education Academy",
      period: "May 2023 - May 2024",
      location: "Hyderabad, India",
      details: [
        "Taught physics and advanced calculus to high school students, designing intuitive logic exercises to improve conceptual reasoning."
      ]
    }
  ]

  const educations = [
    {
      degree: "Bachelor of Engineering in Computer Science",
      institution: "Lords Institute of Engineering And Technology (Osmania University)",
      period: "2020 - 2024",
      location: "Hyderabad, India",
      notes: "Graduated with Honors in Computer Science. Specialized in database management, algorithms, and web applications."
    },
    {
      degree: "Intermediate Education (MPC)",
      institution: "Sri Chandra Junior College",
      period: "2017 - 2019",
      location: "Hyderabad, India",
      notes: "Majored in Mathematics, Physics, and Chemistry."
    }
  ]

  const certifications = [
    "Full Stack Developer Certification - Code For India Org",
    "Next.js App Router Architecture Specialist",
    "PostgreSQL & Database Design Masterclass",
    "Advanced Web Security: JWT, OAuth & RBAC Patterns"
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12 max-w-4xl space-y-12">
        {/* Intro Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-lime-700 dark:text-lime-400 font-semibold text-sm uppercase tracking-wider">
            <Sparkles className="h-4 w-4" /> About The Developer
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Designing Solutions, Not Just Writing Code
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="md:col-span-2 space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg">
              <p>
                Hi, I'm <strong>Mohammed Ayeenuddin</strong>. I'm a Full Stack Developer and SaaS Architect based in Hyderabad, India. I co-founded <strong>Anjeer Labs</strong>, an education-first technology company.
              </p>
              <p>
                I hold a Bachelor's degree in Computer Science Engineering from Osmania University. My passion lies in building operational software like Warehouse Management Systems (WMS), Enterprise Resource Planning (ERP) applications, and custom SaaS dashboards that help businesses replace slow, manual workflows with automated, scalable digital products.
              </p>
              <p>
                I focus heavily on database performance, API security, and search engine optimization. I believe code should be maintainable, APIs should be secure by design, and web interfaces should deliver perfect Core Web Vitals to guarantee indexing dominance.
              </p>
            </div>
            <div className="border rounded-xl p-6 bg-card flex flex-col justify-between h-fit space-y-4">
              <div className="space-y-1">
                <h3 className="font-bold text-lg">Quick Facts</h3>
                <p className="text-xs text-muted-foreground">Entity identifiers</p>
              </div>
              <div className="space-y-3 text-sm text-foreground">
                <div className="flex gap-2 items-center">
                  <MapPin className="h-4 w-4 text-lime-500" />
                  <span>Hyderabad, India</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Briefcase className="h-4 w-4 text-lime-500" />
                  <span>Co-Founder, Anjeer Labs</span>
                </div>
                <div className="flex gap-2 items-center">
                  <GraduationCap className="h-4 w-4 text-lime-500" />
                  <span>B.E. Computer Science</span>
                </div>
              </div>
              <Button asChild className="w-full bg-lime-700 hover:bg-lime-800 text-white">
                <a href="https://cal.com/anjeerlabs">Book a conversation</a>
              </Button>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* Experience Timeline */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-lime-500" /> Career Journey
          </h2>
          <div className="space-y-8 pl-4 border-l border-lime-100 dark:border-lime-900 ml-2">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative space-y-2">
                <div className="absolute -left-[25px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-lime-500 bg-background" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <Badge variant="secondary" className="w-fit">{exp.period}</Badge>
                </div>
                <p className="font-semibold text-lime-700 dark:text-lime-400">
                  {exp.company} — <span className="text-muted-foreground text-sm font-normal">{exp.location}</span>
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground text-sm leading-relaxed pt-1">
                  {exp.details.map((detail, dIdx) => (
                    <li key={dIdx}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-border" />

        {/* Education Timeline */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-lime-500" /> Academic Background
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educations.map((edu, idx) => (
              <div key={idx} className="border rounded-xl p-6 bg-card text-card-foreground space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-lg leading-tight">{edu.degree}</h3>
                  <Badge variant="outline" className="shrink-0">{edu.period}</Badge>
                </div>
                <p className="text-sm text-lime-700 dark:text-lime-400">{edu.institution}</p>
                <p className="text-xs text-muted-foreground">{edu.location}</p>
                <p className="text-sm text-muted-foreground pt-1 border-t">{edu.notes}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-border" />

        {/* Certifications */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Award className="h-6 w-6 text-lime-500" /> Certifications & Credentials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert, idx) => (
              <div key={idx} className="flex gap-3 items-center border rounded-lg p-4 bg-card">
                <Award className="h-5 w-5 text-lime-700 shrink-0" />
                <span className="text-sm font-semibold text-muted-foreground leading-snug">{cert}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="border rounded-2xl p-6 sm:p-8 bg-muted/40 text-center space-y-4">
          <h3 className="text-2xl font-bold">Interested in collaborating?</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            I am currently open to consulting engagements, full-time engineering roles, and custom development work through Anjeer Labs. Let's discuss your next project.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Button asChild className="bg-lime-700 hover:bg-lime-800 text-white">
              <a href="https://cal.com/anjeerlabs">Book a conversation</a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/projects">Browse Portfolio</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}

