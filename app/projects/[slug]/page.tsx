import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Calendar, CheckCircle2, ChevronRight, Layers, Database, ShieldAlert, Cpu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"

// Static project database object
interface ProjectData {
  title: string
  category: string
  period: string
  client: string
  demo: string
  desc: string
  overview: string
  problem: string
  architectureTitle: string
  architectureDesc: string
  architectureSteps: string[]
  techStack: string[]
  challenges: string[]
  results: string[]
  roadmap: string[]
}

const projectsDb: Record<string, ProjectData> = {
  "rotana-store-platform": {
    title: "Rotana Store Platform",
    category: "WMS & Franchise ERP",
    period: "Nov 2022 - April 2023",
    client: "Sahulat Hyderabad",
    demo: "https://rotana-web-app.vercel.app/",
    desc: "An enterprise Warehouse Management System (WMS) and Franchise Management ERP designed to run complex logistical networks.",
    overview: "Rotana Store Platform is an enterprise-grade digital ecosystem designed to streamline retail franchise operations, supplier accounting, and warehouse logistics. Prior to this platform, franchise inventory reporting was handled manually via spreadsheets and physical ledgers, leading to stock discrepancies, delayed supply chains, and reconciliation errors in supplier payouts.",
    problem: "The management team faced three major hurdles: (1) real-time visibility of stock counts across multiple franchise outlets was non-existent; (2) tracking supplier invoices and B2B credit terms was manual and error-prone; and (3) staff operation logs lacked security parameters, leading to inventory leakage.",
    architectureTitle: "Warehouse-First Architecture & Ledger Schema",
    architectureDesc: "To solve these issues, we designed a centralized system featuring a three-tier relational database structure and secure API endpoints:",
    architectureSteps: [
      "Real-time Inventory Synchronization: Designed a PostgreSQL event-trigger pipeline that automatically updates master stock registers when a franchise reports a transaction.",
      "B2B Credit Ledger System: Built a transactional credit framework allowing franchises to request inventory on credit terms with automated caps and penalty logs.",
      "Secure Role-Based Access Control (RBAC): Implemented JWT authentication with strict authorization profiles (Admin, Warehouse Manager, Franchise Manager, Supplier).",
      "Delivery Route Logistics: Configured a dispatch module that aggregates franchise orders and calculates optimal distribution routes for delivery trucks."
    ],
    techStack: ["Next.js (App Router)", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "JWT", "Tailwind CSS", "Vercel"],
    challenges: [
      "Mitigating concurrency conflicts when multiple franchise outlets concurrently attempted to claim matching warehouse batches.",
      "Designing a secure transaction rollback structure to protect data integrity during network failures in the middle of a ledger check."
    ],
    results: [
      "Achieved 100% real-time inventory visibility across all franchise outlets.",
      "Reduced warehouse order processing times by 45% within the first month of deployment.",
      "Eliminated 90% of manual credit reconciliation errors, saving substantial accounting overhead.",
      "Established strict audit trails for all inventory changes, reducing stock leakages to absolute zero."
    ],
    roadmap: [
      "Integrating predictive AI models to forecast seasonal franchise inventory demands.",
      "Building a custom mobile application for delivery drivers to track logs offline."
    ]
  },
  "al-fahads-tours-travels": {
    title: "Al-Fahads Tours & Travels Portal",
    category: "Travel Booking Platform",
    period: "June 2024 - August 2024",
    client: "Al-Fahads Agency",
    demo: "https://www.alfahadstours.com/",
    desc: "A fully responsive reservation portal with admin statistics panels, staff operations registers, and secure media storage.",
    overview: "Al-Fahads Tours & Travels is a high-traffic travel booking web platform designed to automate client inquiries, package customization logs, and administrative bookings. It transitions a traditionally phone-based booking agency into a structured online portal.",
    problem: "The agency struggled with managing high volumes of travel documents, visa applications, and client passport scans. Storing these assets on local office machines was a security risk, and retrieving files took substantial operational time.",
    architectureTitle: "Cloudflare R2 & Automated Admin Dashboard",
    architectureDesc: "We engineered an administrative console with secure document pipelines:",
    architectureSteps: [
      "Secure Asset Upload Pipeline: Configured an upload interface utilizing presigned URLs to store sensitive passport and visa scans directly in Cloudflare R2 buckets.",
      "Interactive Tour Package Configurator: Developed a rich front-end interface using React context that allows users to customize hotel classes, flight segments, and local transport.",
      "Admin KPI Analytics Panel: Built dashboard charts rendering ticket margins, monthly booking volumes, and visa approval ratios in real-time.",
      "Automated Email Alerts: Integrated Node-mailer notifications triggering booking logs updates to clients instantly."
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Cloudflare R2", "Nodemailer", "Netlify"],
    challenges: [
      "Configuring safe multipart document uploads directly from client browsers to Cloudflare R2 without exposing API keys.",
      "Structuring high-performance queries for elastic tour search indexing."
    ],
    results: [
      "Reduced document retrieval time for travel agents from hours to seconds.",
      "Successfully processed over 10,000 online package inquiries with zero database lag.",
      "Enhanced user bookings rate by 25% due to the interactive tour configuration tools."
    ],
    roadmap: [
      "Integrating direct API connections to airline GDS systems to fetch real-time ticket availability.",
      "Adding multi-currency payment gateways (Stripe & Razorpay)."
    ]
  },
  "ai-resume-builder": {
    title: "AI-Powered Resume Builder",
    category: "SaaS Application",
    period: "September 2024 - October 2024",
    client: "SaaS Product",
    demo: "https://mytask-beryl.vercel.app/",
    desc: "A SaaS tool integrating OpenAI's API to dynamically compile resumes and export them into PDF formats.",
    overview: "This AI-powered Resume Builder is a custom SaaS application designed to help job seekers generate professional, tailor-fit resume structures. The tool reads raw text drafts and reformats them using specialized prompt guidelines.",
    problem: "Standard online builders suffer from generic templates and poor client-side layout rendering. Creating clean, ATS-compliant PDF downloads that match the on-screen interactive editor is a recurring technical issue.",
    architectureTitle: "OpenAI Completion Pipeline & PDF Engine",
    architectureDesc: "We architected a streamlined serverless compilation pipeline:",
    architectureSteps: [
      "OpenAI API Integration: Configured a Node.js route that parses user job experience and feeds it into GPT models to rewrite sections with action verbs.",
      "Dynamic Canvas Sync: Created a React layout state compiler that synchronizes text modifications with a strict ATS-compliant styling template in real-time.",
      "Client-Side PDF Generator: Deployed a custom canvas render engine that compiles layout CSS into print-perfect A4 document structures.",
      "Subscription Billing Setup: Integrated Stripe webhooks to track premium tier tokens and monthly subscriptions."
    ],
    techStack: ["Next.js (App Router)", "OpenAI SDK", "Tailwind CSS", "React Hook Form", "Stripe API", "Vercel"],
    challenges: [
      "Avoiding PDF layout breaks when content overflowed onto secondary pages.",
      "Optimizing prompt responses to ensure high-speed resume generation under 4 seconds."
    ],
    results: [
      "Delivered a seamless generator converting raw descriptions into professional profiles instantly.",
      "Achieved 100% template alignment between the interactive editor and the downloaded PDF document.",
      "Attracted over 1,500 active user signups in the first month of release."
    ],
    roadmap: [
      "Adding direct job board auto-application integration for generated resumes.",
      "Implementing AI resume grading score checkers."
    ]
  },
  "email-builder": {
    title: "Drag-and-Drop Email Builder",
    category: "Web Productivity Tool",
    period: "March 2024 - April 2024",
    client: "Anjeer Labs Product",
    demo: "https://build-email.vercel.app",
    desc: "A graphical editor enabling rapid design of responsive HTML newsletters with real-time JSON compilation.",
    overview: "This Email Builder is a custom WYSIWYG newsletter design tool created to help non-technical marketing staff build mobile-responsive email templates. It compiles complex visual grids into standardized, cross-client HTML code.",
    problem: "Rendering HTML across various mail clients (Outlook, Gmail, Apple Mail) is notoriously difficult due to inconsistent support for CSS classes. Visual drag-and-drop actions must translate to legacy nested tables.",
    architectureTitle: "Canvas Grid Serialization Engine",
    architectureDesc: "We built a specialized editor state-to-HTML parser:",
    architectureSteps: [
      "Interactive Drag-and-Drop Canvas: Created a custom grid layout controller supporting text blocks, image nodes, social buttons, and dividers.",
      "JSON State Serialization: Programmed an editor parser that registers the canvas state as a structured, nested JSON tree in React Context.",
      "Cross-Client HTML Compiler: Developed an output renderer that compiles the JSON state into inline-styled, table-nested HTML templates.",
      "Template Cloud Storage: Set up a MongoDB storage pipeline allowing users to save and retrieve draft templates instantly."
    ],
    techStack: ["React.js", "Material UI", "MongoDB", "Express.js", "Node.js", "React Context API", "Vercel"],
    challenges: [
      "Ensuring clean table nesting loops so output HTML does not break layout in older Outlook clients.",
      "Managing complex React drag-and-drop state updates to prevent browser layout re-paints."
    ],
    results: [
      "Built a fully functional drag-and-drop email editor rendering responsive email code.",
      "Guaranteed consistent layout rendering across 40+ desktop and mobile mail clients.",
      "Reduced corporate newsletter development times from days to under 15 minutes."
    ],
    roadmap: [
      "Adding pre-built marketing template packages.",
      "Integrating automated testing pipelines via Litmus API previews."
    ]
  },
  "school-erp": {
    title: "Multi-Role School ERP Platform",
    category: "Education ERP",
    period: "January 2025 - March 2025",
    client: "Institutional Client",
    demo: "http://schoolrepo.com/",
    desc: "A multi-tenant academic management platform supporting multi-role access panels.",
    overview: "The School ERP is an enterprise management system developed to replace manual paperwork in educational institutes. It manages academic scheduling, fee tracking, attendance registries, and grades logs under a unified system.",
    problem: "Managing communications between administrators, teachers, and parents was fragmented. Calculating fee dues, tracking partial payments, and notifying parents about student absences required significant manual work.",
    architectureTitle: "Multi-Tenant Database & Automated Alert Core",
    architectureDesc: "We engineered a multi-role modular dashboard architecture:",
    architectureSteps: [
      "Multi-Role Permission Grid: Programmed a database access controller defining strict permission routes for Admins, Teachers, Parents, and Students.",
      "Automated Attendance Alerts: Built an API service that scans daily attendance files and triggers automated SMS/email alerts to parents for absent students.",
      "Accounting & Fee Ledger: Programmed a financial dashboard that calculates term-wise fee dues, records partial payments, and prints digital receipts.",
      "Academic Planner & Gradebooks: Created gradebook sheets allowing teachers to enter assessment marks and automatically compute class aggregates."
    ],
    techStack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Tailwind CSS", "Nodemailer", "Twilio API", "Chart.js"],
    challenges: [
      "Designing a flexible database schema to support variable grading weights and partial payment terms.",
      "Ensuring low-latency rendering of student aggregate charts when querying heavy academic tables."
    ],
    results: [
      "Automated the attendance logging process, sending SMS notifications to parents within 10 minutes of classes starting.",
      "Successfully integrated fee accounting, reducing school fee payment delays by 35%.",
      "Created an intuitive portal used daily by 50+ teachers and over 1,200 student profiles."
    ],
    roadmap: [
      "Integrating direct online credit card payment portals.",
      "Building a custom portal for school bus GPS tracking."
    ]
  }
}

export function generateStaticParams() {
  return [
    { slug: "rotana-store-platform" },
    { slug: "al-fahads-tours-travels" },
    { slug: "ai-resume-builder" },
    { slug: "email-builder" },
    { slug: "school-erp" }
  ]
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const project = projectsDb[params.slug]
  if (!project) return {}

  return {
    title: `${project.title} Case Study`,
    description: `${project.category} software development case study: ${project.desc}. Developed by Mohammed Ayeenuddin.`,
    alternates: {
      canonical: `./`,
    }
  }
}

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = projectsDb[params.slug]
  if (!project) notFound()

  // Dynamic schemas for Article & Project entities
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `https://mdayeen.xyz/projects/${params.slug}/#article`,
    "headline": `${project.title}: A Case Study in ${project.category}`,
    "description": project.desc,
    "image": "https://mdayeen.xyz/og-image.png",
    "datePublished": "2025-05-01",
    "author": {
      "@type": "Person",
      "@id": "https://mdayeen.xyz/#person"
    },
    "publisher": {
      "@type": "Person",
      "@id": "https://mdayeen.xyz/#person"
    }
  }

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `https://mdayeen.xyz/projects/${params.slug}/#software`,
    "name": project.title,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "url": project.demo,
    "author": {
      "@type": "Person",
      "@id": "https://mdayeen.xyz/#person"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container py-12 max-w-4xl space-y-12">
          {/* Back Link */}
          <div>
            <Button variant="ghost" asChild className="gap-2 -ml-3">
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4" /> Back to Projects
              </Link>
            </Button>
          </div>

          {/* Project Title Header */}
          <section className="space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              <Badge className="bg-lime-700 hover:bg-lime-800 text-white">{project.category}</Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {project.period}
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {project.desc}
            </p>
            <div className="flex gap-4 pt-2">
              <Button asChild className="bg-lime-700 hover:bg-lime-800 text-white gap-2">
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  View Live Portal <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <div className="text-sm self-center text-muted-foreground">
                Client: <span className="font-semibold text-foreground">{project.client}</span>
              </div>
            </div>
          </section>

          <hr className="border-border" />

          {/* Overview */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Layers className="h-6 w-6 text-lime-500" /> Project Overview
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              {project.overview}
            </p>
          </section>

          {/* Business Problem */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <ShieldAlert className="h-6 w-6 text-lime-500" /> The Business Problem
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              {project.problem}
            </p>
          </section>

          <hr className="border-border" />

          {/* Architecture Details */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <Cpu className="h-6 w-6 text-lime-500" /> {project.architectureTitle}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.architectureDesc}
              </p>
            </div>
            <div className="space-y-4 pl-4 border-l border-lime-100 dark:border-lime-900 ml-2">
              {project.architectureSteps.map((step, idx) => {
                const parts = step.split(": ")
                return (
                  <div key={idx} className="relative space-y-1">
                    <div className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-lime-500" />
                    <h4 className="font-bold text-foreground">{parts[0]}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{parts[1]}</p>
                  </div>
                )
              })}
            </div>
          </section>

          <hr className="border-border" />

          {/* Tech Stack Badge List */}
          <section className="space-y-4">
            <h3 className="font-bold text-xl uppercase tracking-wider text-lime-700 dark:text-lime-400">
              Technology Stack Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
          </section>

          {/* Challenges & Blockers */}
          <section className="space-y-4">
            <h3 className="font-bold text-xl uppercase tracking-wider text-lime-700 dark:text-lime-400">
              Challenges Solved
            </h3>
            <ul className="space-y-3">
              {project.challenges.map((chal, idx) => (
                <li key={idx} className="flex gap-3 items-start text-muted-foreground leading-relaxed">
                  <span className="h-5 w-5 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">!</span>
                  <span>{chal}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Results Checklist */}
          <section className="space-y-4">
            <h3 className="font-bold text-xl uppercase tracking-wider text-lime-700 dark:text-lime-400">
              Project Results
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.results.map((res, idx) => (
                <li key={idx} className="flex gap-3 items-start text-muted-foreground text-sm leading-relaxed border rounded-lg p-4 bg-card">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Roadmap */}
          <section className="space-y-4">
            <h3 className="font-bold text-xl uppercase tracking-wider text-lime-700 dark:text-lime-400">
              Future Roadmap
            </h3>
            <div className="space-y-3 pl-4 border-l border-emerald-100 dark:border-emerald-950 ml-2">
              {project.roadmap.map((road, idx) => (
                <div key={idx} className="relative text-sm text-muted-foreground">
                  <div className="absolute -left-[23px] top-2 w-2 h-2 rounded-full bg-emerald-500" />
                  <p className="leading-relaxed">{road}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
