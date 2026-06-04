import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"

import { articlesDb } from "../articleData"

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
