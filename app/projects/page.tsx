import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ExternalLink, ShieldCheck, Database, Layers, Brain, LayoutGrid } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Software Projects Portfolio | Mohammed Ayeenuddin",
  description: "Browse software projects engineered by Mohammed Ayeenuddin, including flagship ERP platforms, Warehouse Management Systems (WMS), travel portals, and SaaS tools.",
  alternates: {
    canonical: "./",
  }
}

export default function Projects() {
  const projects = [
    {
      title: "Rotana Store Platform",
      category: "WMS & Franchise ERP",
      desc: "An enterprise Warehouse Management System (WMS) and Franchise Management ERP designed to run complex logistical networks. Integrates live stock status syncs, supplier credits ledgers, delivery routings, and multi-tier RBAC profiles.",
      tags: ["Next.js", "Node.js", "PostgreSQL", "MongoDB", "Express", "JWT"],
      slug: "rotana-store-platform",
      demo: "https://sahulathyd.org/",
      icon: Layers,
      featured: true
    },
    {
      title: "Al-Fahads Tours & Travels",
      category: "Travel Booking Platform",
      desc: "A fully responsive reservation portal with admin statistics panels, staff operations registers, interactive travel plan builders, and secure Cloudflare R2 media storage assets.",
      tags: ["React.js", "Node.js", "MongoDB", "Express", "Cloudflare R2"],
      slug: "al-fahads-tours-travels",
      demo: "https://mau-overseas.netlify.app/",
      icon: ShieldCheck,
      featured: false
    },
    {
      title: "AI-Powered Resume Builder",
      category: "SaaS Application",
      desc: "A SaaS tool integrating OpenAI's API. Provides resume template customizations, dynamic subheadings generation, formatted structures edits, and client-side PDF export compiler systems.",
      tags: ["Next.js", "OpenAI API", "Tailwind CSS", "PDF Compiler"],
      slug: "ai-resume-builder",
      demo: "https://mytask-beryl.vercel.app/",
      icon: Brain,
      featured: false
    },
    {
      title: "Drag-and-Drop Email Builder",
      category: "Web Productivity Tool",
      desc: "A graphic editor tool enabling rapid design of responsive HTML email newsletters with an interactive canvas editor compiling into direct HTML/JSON schemas.",
      tags: ["React.js", "Material UI", "MongoDB", "Express", "Node.js"],
      slug: "email-builder",
      demo: "https://build-email.vercel.app",
      icon: LayoutGrid,
      featured: false
    },
    {
      title: "Multi-Role School ERP Platform",
      category: "Education ERP",
      desc: "A multi-tenant academic management platform supporting multi-role access (Admin, Teachers, Parents, Students). Coordinates automated attendance alerts, billing/fee ledgers, and academic status monitoring charts.",
      tags: ["Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      slug: "school-erp",
      demo: "https://next-interior.vercel.app/",
      icon: Database,
      featured: false
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12 max-w-5xl space-y-10">
        {/* Intro */}
        <section className="space-y-4">
          <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
            Case Registries
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Software Portfolio
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            I engineer software solutions tailored to solve actual business operational bottlenecks. Below is an index of my completed projects, highlighting custom ERPs, SaaS systems, and API-first web tools.
          </p>
        </section>

        <hr className="border-border" />

        {/* Projects Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj, idx) => {
            const Icon = proj.icon
            return (
              <Card key={idx} className={`bg-card text-card-foreground border flex flex-col justify-between overflow-hidden ${
                proj.featured ? "md:col-span-2 border-violet-500/40 shadow-sm" : ""
              }`}>
                <CardHeader className="space-y-3 pb-4">
                  <div className="flex justify-between items-center">
                    <Badge variant={proj.featured ? "default" : "outline"} className={proj.featured ? "bg-violet-600 hover:bg-violet-700 text-white" : ""}>
                      {proj.category}
                    </Badge>
                    {proj.featured && (
                      <span className="text-[10px] uppercase font-bold text-violet-600 dark:text-violet-400 tracking-wider">
                        Featured Flagship
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Icon className="h-6 w-6 text-violet-500" /> {proj.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed pt-1">
                    {proj.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex gap-4 bg-muted/20">
                  <Button asChild className="bg-violet-600 hover:bg-violet-700 text-white gap-2">
                    <Link href={`/projects/${proj.slug}`}>
                      Read Case Study <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="gap-2">
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </section>
      </main>
    </div>
  )
}
