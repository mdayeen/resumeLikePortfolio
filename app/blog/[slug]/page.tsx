import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"

interface ArticleContent {
  title: string
  category: string
  date: string
  readTime: string
  summary: string
  contentBlocks: Array<{
    type: "paragraph" | "heading" | "code" | "list"
    text?: string
    code?: string
    items?: string[]
  }>
}

const articlesDb: Record<string, ArticleContent> = {
  "designing-warehouse-first-fulfillment-systems": {
    title: "Designing Warehouse-First Fulfillment Systems",
    category: "SaaS & ERP",
    date: "June 2, 2026",
    readTime: "8 min read",
    summary: "How to architect warehouse management databases prioritizing inventory accuracy, real-time syncs, and multi-outlet reconciliation.",
    contentBlocks: [
      { type: "heading", text: "Introduction to Warehouse Operations" },
      { type: "paragraph", text: "Warehouse-first fulfillment systems are the backbone of modern supply chain management. In retail and franchise industries, keeping an accurate real-time count of stock is critical. When multiple physical outlets sell products simultaneously, inventory counts must sync instantly with a centralized warehouse repository to prevent over-selling and shipping backlogs." },
      { type: "heading", text: "Database Transaction Isolation" },
      { type: "paragraph", text: "To guarantee inventory integrity, we use strict database transaction isolation levels. In SQL environments, locking rows during updates prevents race conditions when concurrent orders target the same batch numbers." },
      { type: "code", code: "BEGIN TRANSACTION;\nSELECT quantity FROM stock_registers WHERE item_id = 101 FOR UPDATE;\n-- Validate stock and perform updates\nUPDATE stock_registers SET quantity = quantity - 5 WHERE item_id = 101;\nCOMMIT;" },
      { type: "heading", text: "Best Practices Checklist" },
      { type: "list", items: [
        "Enforce strict foreign keys across outlet registers and warehouse databases.",
        "Implement triggers to automatically update credit ledgers during transactions.",
        "Run periodic physical audits and sync them using transactional rollback commands."
      ]}
    ]
  },
  "building-multi-tenant-franchise-management-platforms": {
    title: "Building Multi-Tenant Franchise Management Platforms",
    category: "SaaS & ERP",
    date: "May 28, 2026",
    readTime: "10 min read",
    summary: "An in-depth look at multi-tenant databases isolation strategies and secure API patterns for franchise networks.",
    contentBlocks: [
      { type: "heading", text: "Understanding Multi-Tenancy" },
      { type: "paragraph", text: "When building enterprise platforms for franchises, isolating data per store is an absolute requirement. Multi-tenancy can be approached via three primary database models: database-per-tenant, schema-per-tenant, or shared-database with tenant-ID column-level isolation." },
      { type: "heading", text: "Implementing Row-Level Security (RLS)" },
      { type: "paragraph", text: "In PostgreSQL, Row-Level Security provides a robust framework to enforce tenant isolation at the database tier, preventing accidental leakages between store contexts." },
      { type: "code", code: "ALTER TABLE store_transactions ENABLE ROW LEVEL SECURITY;\nCREATE POLICY tenant_isolation_policy ON store_transactions\n  FOR ALL TO authenticated_users\n  USING (tenant_id = current_setting('app.current_tenant_id'));" }
    ]
  },
  "inventory-management-system-design-using-postgresql": {
    title: "Inventory Management System Design Using PostgreSQL",
    category: "MERN & Database",
    date: "May 20, 2026",
    readTime: "7 min read",
    summary: "How to use PostgreSQL constraints, row locks, and trigger hooks to engineer robust real-time stock ledgers.",
    contentBlocks: [
      { type: "heading", text: "Why Relational Databases for Inventory" },
      { type: "paragraph", text: "Inventory systems require strict transactional consistency (ACID properties). Unlike document-based datastores which can suffer from data duplicate lag, PostgreSQL ensures every transaction is fully isolated and atomic." },
      { type: "heading", text: "Creating the Inventory Schema" },
      { type: "code", code: "CREATE TABLE inventory_ledgers (\n  id SERIAL PRIMARY KEY,\n  product_id INT REFERENCES products(id),\n  quantity_change INT NOT NULL,\n  transaction_type VARCHAR(50) NOT NULL,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);" }
    ]
  },
  "building-erp-systems-using-next-js": {
    title: "Building ERP Systems Using Next.js",
    category: "React & Next.js",
    date: "May 15, 2026",
    readTime: "6 min read",
    summary: "Why Next.js App Router Server Components are the ideal environment for compiling enterprise administrative dashboards.",
    contentBlocks: [
      { type: "heading", text: "The ERP Dashboard Performance Challenge" },
      { type: "paragraph", text: "ERPs compile vast matrices of data including accounting records, customer accounts, and system parameters. Loading these arrays in traditional single-page apps leads to huge bundle payloads and slow browser hydration delays." },
      { type: "heading", text: "Leveraging Server-Side Rendering" },
      { type: "paragraph", text: "By using Next.js App Router Server Components, we fetch large database arrays on the server, compile the layout HTML statically, and stream lightweight elements to the user. This improves Interaction to Next Paint (INP) scores and speeds up initial page load." }
    ]
  },
  "designing-b2b-credit-management-platforms": {
    title: "Designing B2B Credit Management Platforms",
    category: "SaaS & ERP",
    date: "May 10, 2026",
    readTime: "9 min read",
    summary: "Architecting B2B financial networks: handling credit approvals, credit caps, and automated invoice penalties in Node.js.",
    contentBlocks: [
      { type: "heading", text: "Credit Ledger Frameworks" },
      { type: "paragraph", text: "In B2B commerce, transactions rarely settle in cash immediately. Instead, franchises operate on monthly credit ledgers. Architecting these systems requires real-time credit limit verification, invoice aging reports, and automated late penalty trigger hooks in the backend." }
    ]
  },
  "role-based-access-control-in-enterprise-applications": {
    title: "Role-Based Access Control in Enterprise Applications",
    category: "AI & Software Architecture",
    date: "May 5, 2026",
    readTime: "8 min read",
    summary: "How to design secure permission matrices, JWT claims parsing, and middleware checkers for multi-tier RBAC systems.",
    contentBlocks: [
      { type: "heading", text: "Defining The RBAC Matrix" },
      { type: "paragraph", text: "Enterprise systems require granular permission structures. For instance, a warehouse manager should edit stock lists but not modify supplier credit records. We use JWT payloads to securely store roles and run permissions checks at the middleware routing layer." }
    ]
  },
  "building-payroll-systems-with-postgresql": {
    title: "Building Payroll Systems with PostgreSQL",
    category: "MERN & Database",
    date: "April 28, 2026",
    readTime: "11 min read",
    summary: "Designing secure double-entry accounting schemas for payroll, bonus scales, and regulatory tax deduction ledgers.",
    contentBlocks: [
      { type: "heading", text: "Payroll Schema Integrity" },
      { type: "paragraph", text: "Payroll databases must track employee wages, tax allocations, benefits, and net salary payouts. Designing these ledgers requires a strict double-entry ledger bookkeeping approach to ensure that total expenses match transaction logs." }
    ]
  },
  "building-saas-platforms-with-next-js": {
    title: "Building SaaS Platforms with Next.js",
    category: "React & Next.js",
    date: "April 20, 2026",
    readTime: "9 min read",
    summary: "Best practices for multi-tenant billing, dynamic routing, metadata rendering, and Vercel infrastructure orchestration.",
    contentBlocks: [
      { type: "heading", text: "SaaS Architecture Pillars" },
      { type: "paragraph", text: "SaaS applications rely on three major systems: multi-tenant database routing, subscription billing configurations, and custom domains maps. Integrating these elements with Next.js is streamlined via middleware-level subdomain routing and custom headers lookup." }
    ]
  },
  "nextjs-app-router-seo-guide": {
    title: "Next.js App Router SEO Guide",
    category: "React & Next.js",
    date: "April 15, 2026",
    readTime: "7 min read",
    summary: "A developer's checklist for indexing dominance: canonicals, metadata APIs, sitemaps, robots, and JSON-LD graph generation.",
    contentBlocks: [
      { type: "heading", text: "Technical SEO in App Router" },
      { type: "paragraph", text: "Next.js 13+ App Router revolutionized web page SEO. Moving from client-side meta tags to static server-side configurations prevents crawlers from indexing blank template layouts." }
    ]
  },
  "designing-scalable-school-erp-systems": {
    title: "Designing Scalable School ERP Systems",
    category: "SaaS & ERP",
    date: "April 8, 2026",
    readTime: "10 min read",
    summary: "Key modules for school automation: fee ledgers, grading scales, attendance registers, and parent notification gateways.",
    contentBlocks: [
      { type: "heading", text: "Structuring School ERP Databases" },
      { type: "paragraph", text: "Educational institutions require complex relational mappings: students to classes, teachers to subjects, and parents to student profiles. Scaling these systems requires careful database schema optimization and indexing." }
    ]
  },
  "enterprise-inventory-tracking-architecture": {
    title: "Enterprise Inventory Tracking Architecture",
    category: "SaaS & ERP",
    date: "March 28, 2026",
    readTime: "8 min read",
    summary: "Analyzing barcode/RFID sync loops, stock thresholds, replenishment triggers, and database write throughput under scale.",
    contentBlocks: [
      { type: "heading", text: "Scale Stock Registries" },
      { type: "paragraph", text: "Tracking millions of physical items in real-time requires high-throughput databases. We utilize composite keys and Redis write-back caching to manage concurrent barcode scans without overload." }
    ]
  },
  "building-supplier-management-systems": {
    title: "Building Supplier Management Systems",
    category: "SaaS & ERP",
    date: "March 20, 2026",
    readTime: "7 min read",
    summary: "Creating supplier ledgers, automated order placement thresholds, shipping registries, and payment audits in MongoDB.",
    contentBlocks: [
      { type: "heading", text: "Supplier Logistics Core" },
      { type: "paragraph", text: "Automating supplier restocks is a key cost-saving feature in WMS systems. By setting minimum stock limits in Mongoose schemas, the backend triggers automated purchase requests to suppliers when inventory drops." }
    ]
  },
  "designing-delivery-management-platforms": {
    title: "Designing Delivery Management Platforms",
    category: "SaaS & ERP",
    date: "March 15, 2026",
    readTime: "6 min read",
    summary: "Implementing delivery status checks, geographic coordinate tracking, driver logs, and map integrations in Node.",
    contentBlocks: [
      { type: "heading", text: "Last-Mile Distribution Architecture" },
      { type: "paragraph", text: "Delivery logistics systems need to process live driver location inputs, optimize drop sequences, and record digital proof of delivery. We use geolocation libraries and Node.js event streams to handle tracking updates." }
    ]
  },
  "postgresql-schema-design-for-erp-applications": {
    title: "PostgreSQL Schema Design for ERP Applications",
    category: "MERN & Database",
    date: "March 10, 2026",
    readTime: "9 min read",
    summary: "Best practices for normalization, foreign keys cascades, composite indexing, and database backups in business tools.",
    contentBlocks: [
      { type: "heading", text: "Normalization vs. Denormalization" },
      { type: "paragraph", text: "In enterprise ERP platforms, striking the right balance between database normalization (reducing duplicate data) and denormalization (improving read speeds) is a key architectural decision." }
    ]
  },
  "mern-stack-architecture-best-practices": {
    title: "MERN Stack Architecture Best Practices",
    category: "AI & Software Architecture",
    date: "March 2, 2026",
    readTime: "10 min read",
    summary: "Optimizing the MERN pipeline: Node clustering, MongoDB query optimization, Express middleware, and React builds.",
    contentBlocks: [
      { type: "heading", text: "Scaling MERN stack applications" },
      { type: "paragraph", text: "MERN applications scale efficiently when Node.js backends are clustered and MongoDB queries leverage compound indexes. We use Redis caching to offset common database read bottlenecks." }
    ]
  },
  "multi-role-authentication-design": {
    title: "Multi-Role Authentication Design",
    category: "AI & Software Architecture",
    date: "February 25, 2026",
    readTime: "8 min read",
    summary: "Detailed security patterns for secure sessions, cross-site forgery defense, token rotation, and dynamic header updates.",
    contentBlocks: [
      { type: "heading", text: "Secure Session Architecture" },
      { type: "paragraph", text: "Implementing multi-role authorization requires secure cookie storage, double-submit CSRF configurations, and automatic access token rotations to secure enterprise business sessions." }
    ]
  },
  "building-admin-dashboards-with-next-js": {
    title: "Building Admin Dashboards with Next.js",
    category: "React & Next.js",
    date: "February 18, 2026",
    readTime: "7 min read",
    summary: "How to combine Server Components with client charts (Recharts) to construct fast, responsive reporting panels.",
    contentBlocks: [
      { type: "heading", text: "Constructing ERP Visualizations" },
      { type: "paragraph", text: "By isolating heavy chart libraries in client-side components while pre-fetching data arrays in Server Components, Next.js applications maintain rapid initial rendering speeds." }
    ]
  },
  "saas-billing-architecture": {
    title: "SaaS Billing Architecture",
    category: "AI & Software Architecture",
    date: "February 10, 2026",
    readTime: "8 min read",
    summary: "Structuring Stripe webhooks, subscription tier models, credit card renewals, and automated email invoice logs.",
    contentBlocks: [
      { type: "heading", text: "Stripe Webhooks & Token Buckets" },
      { type: "paragraph", text: "Structuring subscription-based SaaS requires a reliable Stripe webhook handler. We use Express middleware to verify signing signatures and update user quotas in MongoDB dynamically." }
    ]
  },
  "designing-api-first-systems": {
    title: "Designing API-First Systems",
    category: "AI & Software Architecture",
    date: "February 2, 2026",
    readTime: "9 min read",
    summary: "How to document and build extensible REST APIs using Swagger/OpenAPI, version control paths, and rate limit protections.",
    contentBlocks: [
      { type: "heading", text: "The API-First Manifesto" },
      { type: "paragraph", text: "By defining REST schemas using Swagger/OpenAPI specifications before writing backend code, developers ensure compatibility, ease of integration, and reliable validation rules." }
    ]
  },
  "how-i-built-rotana-store-platform": {
    title: "How I Built Rotana Store Platform",
    category: "SaaS & ERP",
    date: "January 25, 2026",
    readTime: "12 min read",
    summary: "Behind the scenes of an enterprise WMS build: from database normalization roadblocks to deploying a functional product.",
    contentBlocks: [
      { type: "heading", text: "The Genesis of Rotana ERP" },
      { type: "paragraph", text: "Building the Rotana Store Platform was a challenging engineering journey. Replacing manual spreadsheet bookkeeping across dozens of retail outlets required a clean warehouse-first architecture, complex SQL transactional queries, and robust API securities." }
    ]
  }
}

// Format slug strings to match database keys
const slugToDbKey = (slug: string): string => {
  return slug.toLowerCase()
}

export function generateStaticParams() {
  return Object.keys(articlesDb).map(key => ({
    slug: key
  }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const key = slugToDbKey(params.slug)
  const article = articlesDb[key]
  if (!article) return {}

  return {
    title: article.title,
    description: article.summary,
    alternates: {
      canonical: `./`,
    }
  }
}

export default async function BlogPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const key = slugToDbKey(params.slug)
  const article = articlesDb[key]
  if (!article) notFound()

  // BlogPosting Schema Markup
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://mdayeen.xyz/blog/${params.slug}/#post`,
    "headline": article.title,
    "description": article.summary,
    "datePublished": "2026-05-01",
    "dateModified": "2026-06-05",
    "author": {
      "@type": "Person",
      "@id": "https://mdayeen.xyz/#person"
    },
    "publisher": {
      "@type": "Person",
      "@id": "https://mdayeen.xyz/#person"
    },
    "mainEntityOfPage": `https://mdayeen.xyz/blog/${params.slug}`
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container py-12 max-w-3xl space-y-8">
          {/* Back Button */}
          <div>
            <Button variant="ghost" asChild className="gap-2 -ml-3">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4" /> Back to Blog
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <header className="space-y-4">
            <Badge className="bg-violet-600 hover:bg-violet-700 text-white w-fit">{article.category}</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {article.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed italic">
              {article.summary}
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2 border-y py-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {article.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {article.readTime}</span>
              <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> By Mohammed Ayeenuddin</span>
            </div>
          </header>

          {/* Article Body */}
          <article className="prose dark:prose-invert max-w-none text-muted-foreground space-y-6 leading-relaxed">
            {article.contentBlocks.map((block, idx) => {
              if (block.type === "heading") {
                return (
                  <h2 key={idx} className="text-2xl font-bold text-foreground mt-8 mb-4 border-b pb-2">
                    {block.text}
                  </h2>
                )
              }
              if (block.type === "paragraph") {
                return (
                  <p key={idx} className="text-base sm:text-lg">
                    {block.text}
                  </p>
                )
              }
              if (block.type === "code") {
                return (
                  <pre key={idx} className="bg-muted p-4 rounded-lg overflow-x-auto border font-mono text-sm text-foreground my-6">
                    <code>{block.code}</code>
                  </pre>
                )
              }
              if (block.type === "list") {
                return (
                  <ul key={idx} className="list-disc pl-6 space-y-2 text-base my-4">
                    {block.items?.map((item, itemIdx) => (
                      <li key={itemIdx}>{item}</li>
                    ))}
                  </ul>
                )
              }
              return null
            })}
          </article>

          {/* Social Share Footer */}
          <footer className="border-t pt-8 mt-12 flex justify-between items-center text-sm text-muted-foreground">
            <span>Written by Mohammed Ayeenuddin</span>
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <a href={`https://twitter.com/intent/tweet?url=https://mdayeen.xyz/blog/${params.slug}&text=${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer">
                <Share2 className="h-4 w-4" /> Share on X
              </a>
            </Button>
          </footer>
        </main>
      </div>
    </>
  )
}
