import { NextResponse } from "next/server"

export async function GET() {
  const baseUrl = "https://mdayeen.xyz"
  
  const articles = [
    {
      title: "Designing Warehouse-First Fulfillment Systems",
      desc: "Learn how to architect warehouse management databases prioritizing inventory accuracy, real-time syncs, and multi-outlet reconciliation.",
      slug: "designing-warehouse-first-fulfillment-systems",
      date: new Date("2026-06-02").toUTCString()
    },
    {
      title: "Building Multi-Tenant Franchise Management Platforms",
      desc: "An in-depth look at multi-tenant databases isolation strategies and secure API patterns for franchise networks.",
      slug: "building-multi-tenant-franchise-management-platforms",
      date: new Date("2026-05-28").toUTCString()
    },
    {
      title: "Inventory Management System Design Using PostgreSQL",
      desc: "How to use PostgreSQL constraints, row locks, and trigger hooks to engineer robust real-time stock ledgers.",
      slug: "inventory-management-system-design-using-postgresql",
      date: new Date("2026-05-20").toUTCString()
    },
    {
      title: "Building ERP Systems Using Next.js",
      desc: "Why Next.js App Router Server Components are the ideal environment for compiling enterprise administrative dashboards.",
      slug: "building-erp-systems-using-nextjs",
      date: new Date("2026-05-15").toUTCString()
    },
    {
      title: "Designing B2B Credit Management Platforms",
      desc: "Architecting B2B financial networks: handling credit approvals, credit caps, and automated invoice penalties in Node.js.",
      slug: "designing-b2b-credit-management-platforms",
      date: new Date("2026-05-10").toUTCString()
    },
    {
      title: "Role-Based Access Control in Enterprise Applications",
      desc: "How to design secure permission matrices, JWT claims parsing, and middleware checkers for multi-tier RBAC systems.",
      slug: "role-based-access-control-in-enterprise-applications",
      date: new Date("2026-05-05").toUTCString()
    },
    {
      title: "Building Payroll Systems with PostgreSQL",
      desc: "Designing secure double-entry accounting schemas for payroll, bonus scales, and regulatory tax deduction ledgers.",
      slug: "building-payroll-systems-with-postgresql",
      date: new Date("2026-04-28").toUTCString()
    },
    {
      title: "Building SaaS Platforms with Next.js",
      desc: "Best practices for multi-tenant billing, dynamic routing, metadata rendering, and Vercel infrastructure orchestration.",
      slug: "building-saas-platforms-with-nextjs",
      date: new Date("2026-04-20").toUTCString()
    },
    {
      title: "Next.js App Router SEO Guide",
      desc: "A developer's checklist for indexing dominance: canonicals, metadata APIs, sitemaps, robots, and JSON-LD graph generation.",
      slug: "nextjs-app-router-seo-guide",
      date: new Date("2026-04-15").toUTCString()
    },
    {
      title: "Designing Scalable School ERP Systems",
      desc: "Key modules for school automation: fee ledgers, grading scales, attendance registers, and parent notification gateways.",
      slug: "designing-scalable-school-erp-systems",
      date: new Date("2026-04-08").toUTCString()
    },
    {
      title: "Enterprise Inventory Tracking Architecture",
      desc: "Analyzing barcode/RFID sync loops, stock thresholds, replenishment triggers, and database write throughput under scale.",
      slug: "enterprise-inventory-tracking-architecture",
      date: new Date("2026-03-28").toUTCString()
    },
    {
      title: "Building Supplier Management Systems",
      desc: "Creating supplier ledgers, automated order placement thresholds, shipping registries, and payment audits in MongoDB.",
      slug: "building-supplier-management-systems",
      date: new Date("2026-03-20").toUTCString()
    },
    {
      title: "Designing Delivery Management Platforms",
      desc: "Implementing delivery status checks, geographic coordinate tracking, driver logs, and map integrations in Node.",
      slug: "designing-delivery-management-platforms",
      date: new Date("2026-03-15").toUTCString()
    },
    {
      title: "PostgreSQL Schema Design for ERP Applications",
      desc: "Best practices for normalization, foreign keys cascades, composite indexing, and database backups in business tools.",
      slug: "postgresql-schema-design-for-erp-applications",
      date: new Date("2026-03-10").toUTCString()
    },
    {
      title: "MERN Stack Architecture Best Practices",
      desc: "Optimizing the MERN pipeline: Node clustering, MongoDB query optimization, Express middleware, and React builds.",
      slug: "mern-stack-architecture-best-practices",
      date: new Date("2026-03-02").toUTCString()
    },
    {
      title: "Multi-Role Authentication Design",
      desc: "Detailed security patterns for secure sessions, cross-site forgery defense, token rotation, and dynamic header updates.",
      slug: "multi-role-authentication-design",
      date: new Date("2026-02-25").toUTCString()
    },
    {
      title: "Building Admin Dashboards with Next.js",
      desc: "How to combine Server Components with client charts (Recharts) to construct fast, responsive reporting panels.",
      slug: "building-admin-dashboards-with-nextjs",
      date: new Date("2026-02-18").toUTCString()
    },
    {
      title: "SaaS Billing Architecture",
      desc: "Structuring Stripe webhooks, subscription tier models, credit card renewals, and automated email invoice logs.",
      slug: "saas-billing-architecture",
      date: new Date("2026-02-10").toUTCString()
    },
    {
      title: "Designing API-First Systems",
      desc: "How to document and build extensible REST APIs using Swagger/OpenAPI, version control paths, and rate limit protections.",
      slug: "designing-api-first-systems",
      date: new Date("2026-02-02").toUTCString()
    },
    {
      title: "How I Built Rotana Store Platform",
      desc: "Behind the scenes of an enterprise WMS build: from database normalization roadblocks to deploying a functional product.",
      slug: "how-i-built-rotana-store-platform",
      date: new Date("2026-01-25").toUTCString()
    }
  ]

  const feedItems = articles
    .map(
      (art) => `
    <item>
      <title>${escapeXml(art.title)}</title>
      <link>${baseUrl}/blog/${art.slug}</link>
      <guid>${baseUrl}/blog/${art.slug}</guid>
      <description>${escapeXml(art.desc)}</description>
      <pubDate>${art.date}</pubDate>
    </item>`
    )
    .join("")

  const rssString = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mohammed Ayeenuddin Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Technical articles on Next.js, MERN stack, database design, and SaaS architecture.</description>
    <language>en-in</language>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${feedItems}
  </channel>
</rss>`

  return new Response(rssString, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200"
    }
  })
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;"
      case ">":
        return "&gt;"
      case "&":
        return "&amp;"
      case "'":
        return "&apos;"
      case '"':
        return "&quot;"
      default:
        return c
    }
  })
}
