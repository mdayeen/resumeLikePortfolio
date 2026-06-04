import { Metadata } from "next"
import Link from "next/link"
import { Calendar, Briefcase, Sparkles, Zap, BookOpen } from "lucide-react"

import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "What I'm Doing Now | Mohammed Ayeenuddin Current Focus",
  description: "A updates log showing the current technical projects, learning objectives, and agency operations at Anjeer Labs for Mohammed Ayeenuddin.",
  alternates: {
    canonical: "./",
  }
}

export default function Now() {
  const currentFocusses = [
    {
      title: "Scaling Anjeer Labs Operations",
      icon: Briefcase,
      desc: "Expanding our software agency in Hyderabad. We are actively taking on new startup briefs for customized SaaS builds, B2B dashboards, and enterprise school management ERPs."
    },
    {
      title: "Enhancing WMS Platforms",
      icon: Zap,
      desc: "Refining core transactional pipelines in our flagship Warehouse Management Systems. Implementing PostgreSQL trigger optimizations, automated ledger reconciliations, and low-latency delivery status caching structures."
    },
    {
      title: "Deepening Systems Engineering & DevOps",
      icon: BookOpen,
      desc: "Deep diving into advanced cloud systems: container orchestration (Docker/Kubernetes) and microservices routing. Scaling database read performance and load balancing using custom Cloudflare worker scripts."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12 max-w-3xl space-y-10">
        {/* Intro */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-semibold text-sm uppercase tracking-wider">
            <Sparkles className="h-4 w-4" /> Live Focus Status
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            What I'm Doing Now
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            This is a "now" page inspired by Derek Sivers' concept. It serves as a public registry of my current priorities, active projects, and technical learning objectives.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted border w-fit px-3 py-1 rounded-full">
            <Calendar className="h-3.5 w-3.5 text-violet-500" />
            <span>Last updated: June 5, 2026</span>
          </div>
        </section>

        <hr className="border-border" />

        {/* Focus items */}
        <section className="space-y-6">
          {currentFocusses.map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="flex gap-4 border p-6 rounded-xl bg-card text-card-foreground">
                <div className="p-3 rounded-lg bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 shrink-0 h-fit">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </section>

        {/* Outro */}
        <section className="text-center text-sm text-muted-foreground pt-4">
          <p>
            Looking to collaborate on any of the above, or need technical help building a platform? 
            Check out my <Link href="/contact" className="text-violet-600 dark:text-violet-400 hover:underline">Contact page</Link> to get in touch.
          </p>
        </section>
      </main>
    </div>
  )
}
