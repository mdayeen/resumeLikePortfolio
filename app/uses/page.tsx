import { Metadata } from "next"
import { Monitor, Laptop, Code, Terminal, Sliders, Sparkles } from "lucide-react"

import { Header } from "@/components/header"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "What I Use | Mohammed Ayeenuddin Tools & Workspace",
  description: "A comprehensive look at the hardware, software development environment, applications, and productivity tools used by Mohammed Ayeenuddin.",
  alternates: {
    canonical: "./",
  }
}

export default function Uses() {
  const sections = [
    {
      title: "Development Environment",
      icon: Code,
      items: [
        { name: "Visual Studio Code", desc: "Main IDE for writing TypeScript, Next.js, and Node.js. Customized with Dracula Theme or GitHub Dark Default." },
        { name: "Warp / Windows Terminal", desc: "Command line shell environment with custom ZSH aliases and auto-completions." },
        { name: "Git & GitHub Desktop", desc: "Version control management system." },
        { name: "Postman & MongoDB Compass", desc: "Essential tools for debugging API endpoints and running raw database queries." }
      ]
    },
    {
      title: "Core Stack & Technologies",
      icon: Terminal,
      items: [
        { name: "Next.js 15 & React 19", desc: "My framework of choice for building fast, SEO-optimized, pre-rendered applications." },
        { name: "Node.js & Express.js", desc: "Backend execution environments for running REST APIs and workers." },
        { name: "PostgreSQL & MongoDB", desc: "Relational database structures for ERP logs, and document stores for rapid SaaS iterations." },
        { name: "Tailwind CSS & Shadcn UI", desc: "For styling and assembly of clean, accessible web components." }
      ]
    },
    {
      title: "Hardware Setup",
      icon: Laptop,
      items: [
        { name: "Developer Workstation", desc: "High-performance processing rig capable of compiling heavy Node structures, local database instances, and running emulators." },
        { name: "High-Resolution Display", desc: "Main screen for side-by-side IDE editing and responsive layouts browser previews." },
        { name: "Mechanical Keyboard & Ergonomic Mouse", desc: "For maximum typing velocity and fatigue reduction during long coding runs." }
      ]
    },
    {
      title: "Productivity Apps & Services",
      icon: Sliders,
      items: [
        { name: "Vercel & Netlify", desc: "Hosting environments for static assets, SSR routes, and automated CI/CD deployments." },
        { name: "Cloudflare (Workers, DNS, R2)", desc: "Web firewall management, media asset buckets, and lightweight worker scripts." },
        { name: "Notion", desc: "For technical documentation, database schemas design drafts, client briefing notes, and roadmap trackers." }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12 max-w-4xl space-y-10">
        {/* Intro */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-semibold text-sm uppercase tracking-wider">
            <Sparkles className="h-4 w-4" /> Gear & Software
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            What I Use
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Developers often ask about setup configurations, gear, and software choices. Here is a comprehensive list of the tools and hardware I rely on daily to build SaaS platforms and ERP software.
          </p>
        </section>

        <hr className="border-border" />

        {/* Setup Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((sect, idx) => {
            const Icon = sect.icon
            return (
              <Card key={idx} className="bg-card border text-card-foreground">
                <CardHeader className="flex flex-row items-center gap-3 border-b pb-4 mb-4">
                  <div className="p-2 rounded bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl font-bold">{sect.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sect.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="space-y-1">
                      <h4 className="font-bold text-sm text-foreground">{item.name}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </section>
      </main>
    </div>
  )
}
