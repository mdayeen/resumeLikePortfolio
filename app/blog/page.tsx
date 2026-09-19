import { Metadata } from "next"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, Sparkles, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Technical Engineering Blog | Mohammed Ayeenuddin",
  description: "Read technical articles on React, Next.js, MERN stack, database design, SaaS engineering, and software architecture by Mohammed Ayeenuddin.",
  alternates: {
    canonical: "./",
  }
}

export default function Blog() {
  const articles = [
    {
      title: "Designing Warehouse-First Fulfillment Systems",
      desc: "Learn how to architect warehouse management databases prioritizing inventory accuracy, real-time syncs, and multi-outlet reconciliation.",
      category: "SaaS & ERP",
      date: "June 2, 2026",
      readTime: "8 min read",
      slug: "designing-warehouse-first-fulfillment-systems"
    },
    {
      title: "Building Multi-Tenant Franchise Management Platforms",
      desc: "An in-depth look at multi-tenant databases isolation strategies and secure API patterns for franchise networks.",
      category: "SaaS & ERP",
      date: "May 28, 2026",
      readTime: "10 min read",
      slug: "building-multi-tenant-franchise-management-platforms"
    },
    {
      title: "Inventory Management System Design Using PostgreSQL",
      desc: "How to use PostgreSQL constraints, row locks, and trigger hooks to engineer robust real-time stock ledgers.",
      category: "MERN & Database",
      date: "May 20, 2026",
      readTime: "7 min read",
      slug: "inventory-management-system-design-using-postgresql"
    },
    {
      title: "Building ERP Systems Using Next.js",
      desc: "Why Next.js App Router Server Components are the ideal environment for compiling enterprise administrative dashboards.",
      category: "React & Next.js",
      date: "May 15, 2026",
      readTime: "6 min read",
      slug: "building-erp-systems-using-nextjs"
    },
    {
      title: "Designing B2B Credit Management Platforms",
      desc: "Architecting B2B financial networks: handling credit approvals, credit caps, and automated invoice penalties in Node.js.",
      category: "SaaS & ERP",
      date: "May 10, 2026",
      readTime: "9 min read",
      slug: "designing-b2b-credit-management-platforms"
    },
    {
      title: "Role-Based Access Control in Enterprise Applications",
      desc: "How to design secure permission matrices, JWT claims parsing, and middleware checkers for multi-tier RBAC systems.",
      category: "AI & Software Architecture",
      date: "May 5, 2026",
      readTime: "8 min read",
      slug: "role-based-access-control-in-enterprise-applications"
    },
    {
      title: "Building Payroll Systems with PostgreSQL",
      desc: "Designing secure double-entry accounting schemas for payroll, bonus scales, and regulatory tax deduction ledgers.",
      category: "MERN & Database",
      date: "April 28, 2026",
      readTime: "11 min read",
      slug: "building-payroll-systems-with-postgresql"
    },
    {
      title: "Building SaaS Platforms with Next.js",
      desc: "Best practices for multi-tenant billing, dynamic routing, metadata rendering, and Vercel infrastructure orchestration.",
      category: "React & Next.js",
      date: "April 20, 2026",
      readTime: "9 min read",
      slug: "building-saas-platforms-with-nextjs"
    },
    {
      title: "Next.js App Router SEO Guide",
      desc: "A developer's checklist for indexing dominance: canonicals, metadata APIs, sitemaps, robots, and JSON-LD graph generation.",
      category: "React & Next.js",
      date: "April 15, 2026",
      readTime: "7 min read",
      slug: "nextjs-app-router-seo-guide"
    },
    {
      title: "Designing Scalable School ERP Systems",
      desc: "Key modules for school automation: fee ledgers, grading scales, attendance registers, and parent notification gateways.",
      category: "SaaS & ERP",
      date: "April 8, 2026",
      readTime: "10 min read",
      slug: "designing-scalable-school-erp-systems"
    },
    {
      title: "Enterprise Inventory Tracking Architecture",
      desc: "Analyzing barcode/RFID sync loops, stock thresholds, replenishment triggers, and database write throughput under scale.",
      category: "SaaS & ERP",
      date: "March 28, 2026",
      readTime: "8 min read",
      slug: "enterprise-inventory-tracking-architecture"
    },
    {
      title: "Building Supplier Management Systems",
      desc: "Creating supplier ledgers, automated order placement thresholds, shipping registries, and payment audits in MongoDB.",
      category: "SaaS & ERP",
      date: "March 20, 2026",
      readTime: "7 min read",
      slug: "building-supplier-management-systems"
    },
    {
      title: "Designing Delivery Management Platforms",
      desc: "Implementing delivery status checks, geographic coordinate tracking, driver logs, and map integrations in Node.",
      category: "SaaS & ERP",
      date: "March 15, 2026",
      readTime: "6 min read",
      slug: "designing-delivery-management-platforms"
    },
    {
      title: "PostgreSQL Schema Design for ERP Applications",
      desc: "Best practices for normalization, foreign keys cascades, composite indexing, and database backups in business tools.",
      category: "MERN & Database",
      date: "March 10, 2026",
      readTime: "9 min read",
      slug: "postgresql-schema-design-for-erp-applications"
    },
    {
      title: "MERN Stack Architecture Best Practices",
      desc: "Optimizing the MERN pipeline: Node clustering, MongoDB query optimization, Express middleware, and React builds.",
      category: "AI & Software Architecture",
      date: "March 2, 2026",
      readTime: "10 min read",
      slug: "mern-stack-architecture-best-practices"
    },
    {
      title: "Multi-Role Authentication Design",
      desc: "Detailed security patterns for secure sessions, cross-site forgery defense, token rotation, and dynamic header updates.",
      category: "AI & Software Architecture",
      date: "February 25, 2026",
      readTime: "8 min read",
      slug: "multi-role-authentication-design"
    },
    {
      title: "Building Admin Dashboards with Next.js",
      desc: "How to combine Server Components with client charts (Recharts) to construct fast, responsive reporting panels.",
      category: "React & Next.js",
      date: "February 18, 2026",
      readTime: "7 min read",
      slug: "building-admin-dashboards-with-nextjs"
    },
    {
      title: "SaaS Billing Architecture",
      desc: "Structuring Stripe webhooks, subscription tier models, credit card renewals, and automated email invoice logs.",
      category: "AI & Software Architecture",
      date: "February 10, 2026",
      readTime: "8 min read",
      slug: "saas-billing-architecture"
    },
    {
      title: "Designing API-First Systems",
      desc: "How to document and build extensible REST APIs using Swagger/OpenAPI, version control paths, and rate limit protections.",
      category: "AI & Software Architecture",
      date: "February 2, 2026",
      readTime: "9 min read",
      slug: "designing-api-first-systems"
    },
    {
      title: "How I Built Rotana Store Platform",
      desc: "Behind the scenes of an enterprise WMS build: from database normalization roadblocks to deploying a functional product.",
      category: "SaaS & ERP",
      date: "January 25, 2026",
      readTime: "12 min read",
      slug: "how-i-built-rotana-store-platform"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12 max-w-5xl space-y-10">
        {/* Header */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-lime-700 dark:text-lime-400 font-semibold text-sm uppercase tracking-wider">
            <Sparkles className="h-4 w-4" /> Technical Articles
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Engineering Blog
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Sharing research, blueprints, and best practices in Next.js, MERN stack development, SaaS architecture, and database design.
          </p>
        </section>

        <hr className="border-border" />

        {/* Blog Articles Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((art, idx) => (
            <Card key={idx} className="bg-card text-card-foreground border flex flex-col justify-between overflow-hidden hover:border-lime-500/30 transition-all duration-300">
              <CardHeader className="space-y-3 pb-4">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <Badge variant="secondary" className="bg-lime-100/55 dark:bg-lime-950/40 text-lime-700 dark:text-lime-400 font-semibold">
                    {art.category}
                  </Badge>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {art.readTime}</span>
                </div>
                <CardTitle className="text-xl font-bold leading-tight hover:text-lime-700 dark:hover:text-lime-400 transition-colors">
                  <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground pt-1">
                  {art.desc}
                </CardDescription>
              </CardHeader>
              <CardFooter className="border-t pt-4 bg-muted/10 flex justify-between items-center">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> {art.date}
                </span>
                <Button variant="ghost" size="sm" asChild className="text-lime-700 dark:text-lime-400 hover:text-lime-800 dark:hover:text-lime-300 p-0 hover:bg-transparent">
                  <Link href={`/blog/${art.slug}`} className="gap-1 flex items-center">
                    Read Article <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      </main>
    </div>
  )
}
