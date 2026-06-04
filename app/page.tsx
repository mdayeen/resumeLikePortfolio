import Link from "next/link"
import { Github, Linkedin, Mail, FileText, ExternalLink, Phone, ArrowRight, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Home() {
  // Consolidated JSON-LD Schema Graph
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://mdayeen.xyz/#person",
        "name": "Mohammed Ayeenuddin",
        "jobTitle": "Full Stack MERN Developer & Co-Founder",
        "description": "Full Stack MERN Developer, SaaS Architect, and Co-Founder of Anjeer Labs based in Hyderabad, India.",
        "url": "https://mdayeen.xyz",
        "image": "https://mdayeen.xyz/placeholder-user.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "addressCountry": "India"
        },
        "email": "ayeen@mdayeen.xyz",
        "telephone": "+918919066592",
        "sameAs": [
          "https://github.com/mdayeen",
          "https://linkedin.com/in/mdyeen",
          "https://x.com/mdayeen",
          "https://anjeerlabs.com",
          "https://about.me/mdayeen"
        ],
        "knowsAbout": [
          "React",
          "Next.js",
          "Node.js",
          "Express.js",
          "MongoDB",
          "TypeScript",
          "PostgreSQL",
          "AWS",
          "Cloudflare",
          "MERN Stack",
          "SaaS Architecture",
          "Software Engineering"
        ],
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Lords Institute of Engineering And Technology - Osmania University",
          "sameAs": "https://lords.ac.in/"
        },
        "worksFor": {
          "@type": "Organization",
          "@id": "https://anjeerlabs.com/#organization"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://anjeerlabs.com/#organization",
        "name": "Anjeer Labs",
        "url": "https://anjeerlabs.com",
        "logo": "https://anjeerlabs.com/logo.png",
        "description": "Software development agency designing and building custom web and mobile SaaS applications.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "addressCountry": "India"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://mdayeen.xyz/#website",
        "url": "https://mdayeen.xyz",
        "name": "Mohammed Ayeenuddin Portfolio",
        "publisher": {
          "@id": "https://mdayeen.xyz/#person"
        }
      },
      {
        "@type": "ProfilePage",
        "@id": "https://mdayeen.xyz/#webpage",
        "url": "https://mdayeen.xyz",
        "name": "Mohammed Ayeenuddin | Full Stack MERN Developer | Hyderabad",
        "about": {
          "@id": "https://mdayeen.xyz/#person"
        },
        "isPartOf": {
          "@id": "https://mdayeen.xyz/#website"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://mdayeen.xyz/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Who is Mohammed Ayeenuddin?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Mohammed Ayeenuddin is a Full Stack MERN Developer, Software Architect, and Co-Founder of Anjeer Labs based in Hyderabad, India."
            }
          },
          {
            "@type": "Question",
            "name": "Where is Mohammed Ayeenuddin located?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "He is located in Hyderabad, Telangana, India, and works with clients locally and remotely worldwide."
            }
          },
          {
            "@type": "Question",
            "name": "What technologies does Mohammed Ayeenuddin specialize in?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "He specializes in the MERN Stack (MongoDB, Express.js, React, Node.js) along with Next.js, TypeScript, PostgreSQL, AWS, and Cloudflare architectures."
            }
          },
          {
            "@type": "Question",
            "name": "What is Anjeer Labs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Anjeer Labs is a software development agency co-founded by Mohammed Ayeenuddin, focusing on building SaaS platforms, ERP solutions, and custom mobile apps."
            }
          },
          {
            "@type": "Question",
            "name": "How can I hire Mohammed Ayeenuddin?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can contact him directly via email at ayeen@mdayeen.xyz, connect on LinkedIn, or reach out via WhatsApp at +918919066592."
            }
          }
        ]
      }
    ]
  }

  const faqItems = [
    {
      q: "Who is Mohammed Ayeenuddin?",
      a: "Mohammed Ayeenuddin is a Full Stack MERN Developer, SaaS Architect, and Co-Founder of Anjeer Labs based in Hyderabad, India. He has extensive experience in designing ERP systems, Warehouse Management Systems (WMS), and custom SaaS dashboards."
    },
    {
      q: "Where is Mohammed Ayeenuddin located?",
      a: "He is based in Hyderabad, Telangana, India. He provides software consulting and development services both locally and remotely to global startups and enterprises."
    },
    {
      q: "What technologies does Mohammed Ayeenuddin specialize in?",
      a: "His primary expertise lies in the MERN Stack (MongoDB, Express.js, React, Node.js), TypeScript, Next.js (App Router), PostgreSQL, Tailwind CSS, AWS, and Cloudflare deployments."
    },
    {
      q: "What is Anjeer Labs?",
      a: "Anjeer Labs is a software development and design agency co-founded by Mohammed Ayeenuddin. The agency specializes in digital transformations, helping businesses build robust custom apps and SaaS platforms to automate manual operations."
    },
    {
      q: "What projects has Mohammed Ayeenuddin built?",
      a: "He has built flagship systems like the Rotana Store Platform (an enterprise-grade Warehouse & Franchise Management System), Al-Fahads Tours & Travels Portal, an AI-powered Resume Builder, responsive email builder tools, and multi-role School ERP systems."
    },
    {
      q: "How can I hire Mohammed Ayeenuddin?",
      a: "You can reach out directly via email at ayeen@mdayeen.xyz or contact@mdayeen.xyz, call/WhatsApp at +918919066592, or send a message through his LinkedIn profile."
    }
  ]

  const accomplishments = [
    "Architected and deployed Rotana Store Platform, an enterprise-grade WMS/Franchise system resolving multi-million inventory pipelines.",
    "Co-Founded Anjeer Labs, a tech agency delivering SaaS, School ERPs, and custom software in Hyderabad, India.",
    "Built a high-performance task management application with automated SMS and email reminders using Twilio & Nodemailer.",
    "Integrated advanced secure authentication modules, incorporating robust JWT encryption and multi-tier RBAC parameters.",
    "Optimized Next.js App Router performance, resolving image caching issues to achieve flawless Core Web Vitals scores.",
    "Designed and engineered a drag-and-drop responsive email template builder with dynamic JSON/HTML serialization."
  ]

  return (
    <>
      {/* Centralized JSON-LD Schema Graph Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container py-12 space-y-20">
          {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-6">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted text-muted-foreground text-xs font-medium">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Available for Projects & Tech Consulting
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                Mohammed <span className="text-violet-600 dark:text-violet-400">Ayeenuddin</span>
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-foreground">
                Full Stack MERN Developer & Co-Founder of{" "}
                <span className="text-violet-600 dark:text-violet-400 font-semibold">Anjeer Labs</span>
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                Based in Hyderabad, India. I specialize in Next.js, React, Node.js, and high-scale database architecture.
                I design and build secure, multi-role SaaS systems, ERP databases, and custom products that help businesses scale.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild size="lg" className="bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white gap-2">
                  <Link href="/contact">
                    Get in Touch <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="gap-2" asChild>
                  <a href="/Ayeenuddin 2page.pdf" download="Mohammed_Ayeenuddin_CV.pdf">
                    <FileText className="h-4 w-4" /> Download CV
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 text-green-600 hover:text-green-700 border-green-600 hover:border-green-700 dark:text-green-500 dark:hover:text-green-400 dark:border-green-500 dark:hover:border-green-400"
                  asChild
                >
                  <a href="https://wa.me/+918919066592" target="_blank" rel="noopener noreferrer">
                    <Phone className="h-4 w-4" /> WhatsApp
                  </a>
                </Button>
              </div>

              <div className="flex gap-6 pt-4 border-t max-w-md">
                <a href="https://linkedin.com/in/mdyeen" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 flex items-center gap-2">
                  <Linkedin className="h-5 w-5" /> <span>LinkedIn</span>
                </a>
                <a href="https://github.com/mdayeen" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 flex items-center gap-2">
                  <Github className="h-5 w-5" /> <span>GitHub</span>
                </a>
                <a href="mailto:ayeen@mdayeen.xyz" className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 flex items-center gap-2">
                  <Mail className="h-5 w-5" /> <span>Email</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border bg-muted flex items-center justify-center p-4">
                {/* Fallback avatar visual representation */}
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center mx-auto text-violet-600 dark:text-violet-400 font-extrabold text-3xl">
                    MA
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Mohammed Ayeenuddin</h3>
                    <p className="text-xs text-muted-foreground">Hyderabad, India</p>
                  </div>
                  <Badge className="bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-300">
                    MERN Stack Architect
                  </Badge>
                </div>
              </div>
            </div>
          </section>

          {/* Section Divider */}
          <hr className="border-border" />

          {/* Featured Project - Rotana Store Platform */}
          <section className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
                  Flagship Development
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold">Rotana Store Platform</h2>
              </div>
              <Button variant="ghost" asChild className="gap-1 hidden sm:flex">
                <Link href="/projects/rotana-store-platform">
                  Read Case Study <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border rounded-xl p-6 sm:p-8 bg-card text-card-foreground">
              <div className="lg:col-span-7 space-y-6">
                <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  WMS & Franchise ERP
                </Badge>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Rotana Store Platform is an enterprise Warehouse Management System (WMS) and Franchise Management ERP designed to run complex logistical networks. It serves as a unified digital ecosystem connecting warehouse pipelines, franchise outlets, B2B supplier transactions, B2C operations, credit ledgers, and secure role-based staff operations.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-violet-500" /> Multi-outlet inventory sync
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-violet-500" /> B2B supplier credit ledger
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-violet-500" /> Role-based action security
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-violet-500" /> Automated delivery routing
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "Node.js", "PostgreSQL", "MongoDB", "Express", "JWT", "Tailwind CSS"].map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button asChild className="bg-violet-600 hover:bg-violet-700 text-white">
                    <Link href="/projects/rotana-store-platform">View Full Case Study</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://sahulathyd.org/" target="_blank" rel="noopener noreferrer" className="gap-2">
                      <ExternalLink className="h-4 w-4" /> Live Portal
                    </a>
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-5 bg-muted rounded-lg p-6 border flex flex-col justify-between h-full space-y-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-lg">Key Metrics Solved</h4>
                  <p className="text-xs text-muted-foreground">Operational efficiency parameters achieved post-launch:</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-1">
                      <span>Inventory Update Delay</span>
                      <span className="text-violet-600 dark:text-violet-400">Instant (Realtime)</span>
                    </div>
                    <div className="w-full bg-violet-200 dark:bg-violet-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-violet-600 dark:bg-violet-400 h-full w-[100%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-1">
                      <span>Order Processing Speed</span>
                      <span className="text-violet-600 dark:text-violet-400">Improved +45%</span>
                    </div>
                    <div className="w-full bg-violet-200 dark:bg-violet-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-violet-600 dark:bg-violet-400 h-full w-[85%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-1">
                      <span>Human Reconciliation Errors</span>
                      <span className="text-violet-600 dark:text-violet-400">Reduced 90%</span>
                    </div>
                    <div className="w-full bg-violet-200 dark:bg-violet-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-violet-600 dark:bg-violet-400 h-full w-[90%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section Divider */}
          <hr className="border-border" />

          {/* Core Sections Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Main Column */}
            <div className="lg:col-span-7 space-y-12">
              {/* Experience Timeline */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold border-b pb-2 border-violet-200 dark:border-violet-800">
                  Professional Experience
                </h2>
                <div className="space-y-8">
                  {[
                    {
                      title: "Co-Founder & Technical Lead",
                      company: "Anjeer Labs",
                      period: "May 2024 - Present",
                      location: "Hyderabad, India",
                      desc: "Co-Founded and established Anjeer Labs, a tech development agency in Hyderabad. Formulate architecture blueprints for enterprise SaaS, multi-tenant school ERPs, and travel booking backends. Lead development teams using Next.js 15, Node.js, and PostgreSQL. Mentor junior developers, define API development guidelines, and oversee cloud deployments."
                    },
                    {
                      title: "Full Stack Developer",
                      company: "Code For India Org",
                      period: "Nov 2022 - April 2023",
                      location: "Hyderabad, India",
                      desc: "Designed and engineered financial tracking features, user ledgers, and credit limit frameworks. Implemented secure role-based user account authentication with JWT protocols. Optimized client-side React rendering speeds, managed MongoDB transaction rollbacks, and mentored junior recruits in Agile/MVC paradigms."
                    },
                    {
                      title: "Educator",
                      company: "RR Education Academy",
                      period: "May 2023 - May 2024",
                      location: "Hyderabad, India",
                      desc: "Instructed Mathematics and Physics, developing core curriculum and simplifying logical principles to build strong problem-solving skills in students."
                    }
                  ].map((job, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        <Badge variant="outline" className="w-fit">{job.period}</Badge>
                      </div>
                      <div className="text-violet-600 dark:text-violet-400 font-medium">
                        {job.company} — <span className="text-muted-foreground text-sm font-normal">{job.location}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{job.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Accomplishments */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold border-b pb-2 border-violet-200 dark:border-violet-800">
                  Key Accomplishments
                </h2>
                <ul className="space-y-3 pl-5 list-disc text-muted-foreground">
                  {accomplishments.map((item, index) => (
                    <li key={index} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              </section>

              {/* Technical Skills */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold border-b pb-2 border-violet-200 dark:border-violet-800">
                  Technical Expertise
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { cat: "Languages", skills: ["JavaScript (ES6+)", "TypeScript", "HTML5/CSS3", "SQL"] },
                    { cat: "Frameworks & Libraries", skills: ["React", "Next.js 15 (App Router)", "Node.js", "Express.js"] },
                    { cat: "Databases", skills: ["PostgreSQL", "MongoDB", "Redis"] },
                    { cat: "Cloud & Devops", skills: ["AWS", "Cloudflare R2/Workers", "Vercel", "Git", "Linux"] }
                  ].map((group, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-card">
                      <h4 className="font-bold text-violet-600 dark:text-violet-400 mb-2">{group.cat}</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {group.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Side Column */}
            <div className="lg:col-span-5 space-y-12">
              {/* Other Key Projects List */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold border-b pb-2 border-violet-200 dark:border-violet-800">
                  Software Projects
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      name: "Al-Fahads Tours & Travels Portal",
                      desc: "Modern travel booking application integrated with advanced search filters, admin analytics dashboards, multi-level staff roles, and Cloudflare R2 media storage assets.",
                      tags: ["React", "Node.js", "MongoDB", "Cloudflare R2"],
                      demo: "https://mau-overseas.netlify.app/",
                      slug: "al-fahads-tours-travels"
                    },
                    {
                      name: "AI-Powered Resume Builder",
                      desc: "SaaS platform incorporating OpenAI API. Enables template customization, interactive formatting, custom subheadings, and seamless client-side PDF downloads.",
                      tags: ["Next.js", "OpenAI API", "Tailwind CSS", "PDF Compiler"],
                      demo: "https://mytask-beryl.vercel.app/",
                      slug: "ai-resume-builder"
                    },
                    {
                      name: "Drag-and-Drop Email Builder",
                      desc: "A web editor that allows users to create mobile-responsive newsletter templates via an interactive canvas, compiling into clean HTML/JSON formats.",
                      tags: ["React", "Material UI", "MongoDB", "Express"],
                      demo: "https://build-email.vercel.app",
                      slug: "email-builder"
                    },
                    {
                      name: "Multi-Role School ERP Platform",
                      desc: "Enterprise management system for educational institutions. Coordinates fee ledgers, automated attendance alerts, class scheduling, and academic performance charts.",
                      tags: ["Node.js", "Express", "MongoDB", "Tailwind CSS"],
                      demo: "https://next-interior.vercel.app/",
                      slug: "school-erp"
                    }
                  ].map((proj, idx) => (
                    <div key={idx} className="border-b border-violet-100 dark:border-violet-900 pb-6 last:border-0 last:pb-0 space-y-3">
                      <h3 className="font-bold text-xl">{proj.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{proj.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-3 text-xs pt-1">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/projects/${proj.slug}`}>Case Study</Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild className="text-violet-600 dark:text-violet-400">
                          <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="gap-1 flex items-center">
                            <ExternalLink className="h-3.5 w-3.5" /> Demo
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/projects">View All Software Projects</Link>
                  </Button>
                </div>
              </section>

              {/* Education section in side column */}
              <section className="space-y-6">
                <h2 className="text-3xl font-bold border-b pb-2 border-violet-200 dark:border-violet-800">
                  Education
                </h2>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold">Bachelor of Engineering in Computer Science</h4>
                    <p className="text-sm text-violet-600 dark:text-violet-400">
                      Lords Institute of Engineering And Technology (Osmania University)
                    </p>
                    <p className="text-xs text-muted-foreground">Class of 2024 | Hyderabad, India</p>
                  </div>
                  <div>
                    <h4 className="font-bold">Intermediate Education (MPC)</h4>
                    <p className="text-sm text-violet-600 dark:text-violet-400">Sri Chandra Junior College</p>
                    <p className="text-xs text-muted-foreground">Class of 2019 | Hyderabad, India</p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Section Divider */}
          <hr className="border-border" />

          {/* FAQ Section */}
          <section className="space-y-6 max-w-4xl mx-auto" id="faq">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Find answers to common questions about Mohammed Ayeenuddin and his work.</p>
            </div>
            <Accordion type="single" collapsible className="w-full border rounded-xl p-4 sm:p-6 bg-card">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="last:border-b-0">
                  <AccordionTrigger className="text-left font-semibold text-base sm:text-lg hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed pt-2">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t py-8 bg-muted/30">
          <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Mohammed Ayeenuddin. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Co-Founder of Anjeer Labs. Developer from Hyderabad, India.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400">
                Privacy Policy
              </Link>
              <span className="text-muted-foreground/20 text-xs">|</span>
              <a href="https://github.com/mdayeen" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400">
                GitHub
              </a>
              <span className="text-muted-foreground/20 text-xs">|</span>
              <a href="https://linkedin.com/in/mdyeen" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400">
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
