import { Metadata } from "next"
import Link from "next/link"
import { FileText, Download, Briefcase, GraduationCap, Award, Mail, Phone, MapPin, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "Professional Resume | Mohammed Ayeenuddin",
  description: "Curriculum Vitae of Mohammed Ayeenuddin, Full Stack MERN Developer, SaaS Architect, and Co-Founder of Anjeer Labs. Detailed education, skills, and work experiences.",
  alternates: {
    canonical: "./",
  }
}

export default function Resume() {
  const experiences = [
    {
      role: "Co-Founder & Technical Lead",
      company: "Anjeer Labs",
      period: "May 2024 - Present",
      location: "Hyderabad, India",
      details: [
        "Oversee architectural design and cloud systems configuration for all client products.",
        "Engineered the Rotana Store WMS platform, handling franchise inventories, supplier invoice credits, and automated delivery pipelines.",
        "Managed database schema structures in PostgreSQL and MongoDB, creating optimized indexes and handling high-performance queries.",
        "Built responsive web apps with Next.js, React, TypeScript, and Tailwind CSS."
      ]
    },
    {
      role: "Full Stack Developer",
      company: "Code For India Org",
      period: "Nov 2022 - April 2023",
      location: "Hyderabad, India",
      details: [
        "Implemented secure JWT user login sessions and multi-role RBAC authorization structures.",
        "Designed and maintained back-office ledger ledgers and loan monitoring APIs.",
        "Resolved React bundle size issues, reduced rendering latency by 35% through code-splitting and asset compression.",
        "Contributed to database designs, write tests, and mentored entry-level developers."
      ]
    },
    {
      role: "Educator",
      company: "RR Education Academy",
      period: "May 2023 - May 2024",
      location: "Hyderabad, India",
      details: [
        "Formulated lesson guidelines, simplifying physics and mathematics concepts for students."
      ]
    }
  ]

  const skills = {
    languages: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "SQL"],
    frameworks: ["React.js", "Next.js 15 (App Router)", "Node.js", "Express.js"],
    databases: ["PostgreSQL", "MongoDB", "Redis"],
    tools: ["Git", "GitHub", "Vercel", "AWS", "Cloudflare R2", "Linux", "Docker"]
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12 max-w-4xl space-y-10">
        {/* Top Controls */}
        <div className="flex justify-between items-center bg-card border rounded-xl p-4">
          <div>
            <h1 className="text-xl font-bold">Mohammed Ayeenuddin</h1>
            <p className="text-xs text-muted-foreground">Full Stack Developer Curriculum Vitae</p>
          </div>
          <Button className="bg-violet-600 hover:bg-violet-700 text-white gap-2" asChild>
            <a href="/Ayeenuddin 2page.pdf" download="Mohammed_Ayeenuddin_CV.pdf">
              <Download className="h-4 w-4" /> Download PDF Version
            </a>
          </Button>
        </div>

        {/* Resume Paper Container */}
        <div className="border rounded-2xl p-6 sm:p-10 bg-card text-card-foreground shadow-sm space-y-8 print:border-0 print:shadow-none">
          {/* Header */}
          <div className="text-center space-y-3 pb-6 border-b">
            <h2 className="text-3xl font-extrabold tracking-tight">Mohammed Ayeenuddin</h2>
            <p className="text-violet-600 dark:text-violet-400 font-semibold text-lg">Full Stack MERN Developer & SaaS Architect</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> ayeen@mdayeen.xyz</span>
              <span className="flex items-center gap-1.5"><Phone className="h-4 w-4" /> +91 8919066592</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Hyderabad, India</span>
              <span className="flex items-center gap-1.5"><Globe className="h-4 w-4" /> https://mdayeen.xyz</span>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold uppercase tracking-wider border-b pb-1 text-violet-600 dark:text-violet-400">Professional Summary</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Results-driven Full Stack MERN Developer and Co-Founder of Anjeer Labs based in Hyderabad. Specialized in engineering performant, secure web SaaS platforms, database architectures, and custom enterprise tools. Strong expertise in optimizing React performance, writing secure REST APIs, designing PostgreSQL/MongoDB schemas, and orchestrating serverless infrastructure.
            </p>
          </div>

          {/* Core Skills */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold uppercase tracking-wider border-b pb-1 text-violet-600 dark:text-violet-400">Technical Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-bold text-muted-foreground block mb-1">Languages & Dialects</span>
                <p className="text-foreground">{skills.languages.join(", ")}</p>
              </div>
              <div>
                <span className="font-bold text-muted-foreground block mb-1">Frameworks & Libraries</span>
                <p className="text-foreground">{skills.frameworks.join(", ")}</p>
              </div>
              <div>
                <span className="font-bold text-muted-foreground block mb-1">Database Engines</span>
                <p className="text-foreground">{skills.databases.join(", ")}</p>
              </div>
              <div>
                <span className="font-bold text-muted-foreground block mb-1">DevOps & Cloud Ecosystem</span>
                <p className="text-foreground">{skills.tools.join(", ")}</p>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-wider border-b pb-1 text-violet-600 dark:text-violet-400">Work Experience</h3>
            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-start flex-wrap gap-1">
                    <span className="font-bold text-base">{exp.role}</span>
                    <span className="text-xs text-muted-foreground font-semibold bg-muted px-2 py-0.5 rounded">{exp.period}</span>
                  </div>
                  <div className="text-sm font-semibold text-violet-600 dark:text-violet-400">
                    {exp.company} <span className="text-muted-foreground text-xs font-normal">| {exp.location}</span>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1.5 leading-relaxed pt-1">
                    {exp.details.map((detail, dIdx) => (
                      <li key={dIdx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-wider border-b pb-1 text-violet-600 dark:text-violet-400">Education</h3>
            <div className="space-y-4 text-sm">
              <div className="space-y-1">
                <div className="flex justify-between items-start flex-wrap gap-1">
                  <span className="font-bold text-base">Bachelor of Engineering in Computer Science</span>
                  <span className="text-xs text-muted-foreground font-semibold bg-muted px-2 py-0.5 rounded">2020 - 2024</span>
                </div>
                <p className="text-violet-600 dark:text-violet-400 font-semibold text-sm">Lords Institute of Engineering And Technology (Osmania University)</p>
                <p className="text-xs text-muted-foreground">Hyderabad, India | Graduated with CSE Honors</p>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-start flex-wrap gap-1">
                  <span className="font-bold text-base">Intermediate Board of Education (MPC)</span>
                  <span className="text-xs text-muted-foreground font-semibold bg-muted px-2 py-0.5 rounded">2017 - 2019</span>
                </div>
                <p className="text-violet-600 dark:text-violet-400 font-semibold text-sm">Sri Chandra Junior College</p>
                <p className="text-xs text-muted-foreground">Hyderabad, India</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
