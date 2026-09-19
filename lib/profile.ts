/** Public profile facts shared by the website, structured data, and agent view. */
export const profile = {
  name: "Mohammed Ayeenuddin",
  shortName: "Ayeen",
  role: "Full Stack Developer & Co-Founder of Anjeer Labs",
  description:
    "Mohammed Ayeenuddin (Ayeen) is a full stack developer based in Hyderabad, India, and co-founder of Anjeer Labs, an education-first technology company. He builds web applications, SaaS products, and business management software.",
  url: "https://mdayeen.xyz",
  email: "ayeen0410@gmail.com",
  bookingUrl: "https://cal.com/anjeerlabs",
  image: "https://mdayeen.xyz/images/ayeen-red.webp",
  location: {
    city: "Hyderabad",
    region: "Telangana",
    country: "India",
    countryCode: "IN",
  },
  organization: {
    name: "Anjeer Labs",
    url: "https://anjeerlabs.com",
    description:
      "An education-first technology company co-founded by Mohammed Ayeenuddin.",
  },
  socials: [
    { name: "GitHub", url: "https://github.com/mdayeen" },
    { name: "LinkedIn", url: "https://linkedin.com/in/mdyeen" },
    { name: "X", url: "https://x.com/mdayeen" },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "MongoDB",
    "REST APIs",
    "SaaS",
    "ERP systems",
  ],
  projects: [
    {
      name: "Rotana Store Platform",
      category: "Warehouse & franchise management",
      description:
        "A warehouse and franchise management platform for inventory, supplier workflows, credit ledgers, and delivery operations.",
      url: "https://rotana-web-app.vercel.app/",
      caseStudyUrl: "/projects/rotana-store-platform",
    },
    {
      name: "School Repo",
      category: "School management ERP",
      description:
        "A school management platform from Anjeer Labs covering students, attendance, fees, payroll, academics, inventory, and role-based permissions.",
      url: "https://schoolrepo.com",
    },
    {
      name: "Hamuzair",
      category: "AI-powered custom apparel",
      description:
        "A custom apparel platform with AI artwork generation, a live 3D garment customizer, and made-to-order ecommerce.",
      url: "https://www.hamuzair.com",
    },
  ],
  faq: [
    {
      question: "Who is Mohammed Ayeenuddin?",
      answer:
        "Mohammed Ayeenuddin, also known as Ayeen, is a full stack developer based in Hyderabad, India, and co-founder of Anjeer Labs, an education-first technology company.",
    },
    {
      question: "What does Ayeen build?",
      answer:
        "Ayeen builds web applications, SaaS products, and business management software. Selected projects include Rotana Store Platform, School Repo, and Hamuzair.",
    },
    {
      question: "How can I discuss a project with Ayeen?",
      answer:
        "Book a conversation at https://cal.com/anjeerlabs or email ayeen0410@gmail.com with your project brief.",
    },
  ],
} as const;

export const contactPoint = {
  "@type": "ContactPoint",
  contactType: "Project inquiries",
  email: profile.email,
  url: profile.bookingUrl,
};

export const personSchema = {
  "@type": "Person",
  "@id": `${profile.url}/#person`,
  name: profile.name,
  alternateName: profile.shortName,
  description: profile.description,
  jobTitle: profile.role,
  image: profile.image,
  url: profile.url,
  email: profile.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location.city,
    addressRegion: profile.location.region,
    addressCountry: profile.location.countryCode,
  },
  worksFor: { "@id": `${profile.url}/#organization` },
  sameAs: profile.socials.map(({ url }) => url),
  knowsAbout: profile.skills,
  contactPoint,
};

export const organizationSchema = {
  "@type": "Organization",
  "@id": `${profile.url}/#organization`,
  name: profile.organization.name,
  url: profile.organization.url,
  description: profile.organization.description,
};

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
