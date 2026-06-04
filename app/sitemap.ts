import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mdayeen.xyz'
  
  const staticRoutes = [
    '',
    '/about',
    '/projects',
    '/blog',
    '/resume',
    '/contact',
    '/privacy-policy',
    '/uses',
    '/now'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  const projectSlugs = [
    'rotana-store-platform',
    'al-fahads-tours-travels',
    'ai-resume-builder',
    'email-builder',
    'school-erp'
  ]

  const projectRoutes = projectSlugs.map(slug => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogSlugs = [
    'designing-warehouse-first-fulfillment-systems',
    'building-multi-tenant-franchise-management-platforms',
    'inventory-management-system-design-using-postgresql',
    'building-erp-systems-using-nextjs',
    'designing-b2b-credit-management-platforms',
    'role-based-access-control-in-enterprise-applications',
    'building-payroll-systems-with-postgresql',
    'building-saas-platforms-with-nextjs',
    'nextjs-app-router-seo-guide',
    'designing-scalable-school-erp-systems',
    'enterprise-inventory-tracking-architecture',
    'building-supplier-management-systems',
    'designing-delivery-management-platforms',
    'postgresql-schema-design-for-erp-applications',
    'mern-stack-architecture-best-practices',
    'multi-role-authentication-design',
    'building-admin-dashboards-with-nextjs',
    'saas-billing-architecture',
    'designing-api-first-systems',
    'how-i-built-rotana-store-platform'
  ]

  const blogRoutes = blogSlugs.map(slug => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
