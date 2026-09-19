import type { MetadataRoute } from "next"
import { articlesDb } from "@/app/blog/articleData"
import { profile } from "@/lib/profile"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/agents", "/projects", "/blog", "/resume", "/contact", "/privacy-policy", "/uses", "/now"]
  const projectSlugs = ["rotana-store-platform", "al-fahads-tours-travels", "ai-resume-builder", "email-builder", "school-erp"]

  return [
    ...staticRoutes.map(route => ({ url: `${profile.url}${route}` })),
    ...projectSlugs.map(slug => ({ url: `${profile.url}/projects/${slug}` })),
    ...Object.keys(articlesDb).map(slug => ({ url: `${profile.url}/blog/${slug}` })),
  ]
}
