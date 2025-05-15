"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Github, Linkedin, Mail, FileText, ExternalLink, Phone, Menu, X } from "lucide-react"
import Script from "next/script"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export default function Home() {
  // Add state for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Refs for scrolling to sections
  const educationRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const accomplishmentsRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  // Function to scroll to a section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Add structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohammed Ayeenuddin",
    jobTitle: "Full Stack Developer",
    description: "Full Stack Developer from Hyderabad specializing in MERN stack and SaaS development",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "India",
    },
    email: "ayeen0410@gmail.com",
    url: "https://mdayeen.vercel.app/",
    sameAs: ["https://github.com/mdayeen", "https://linkedin.com/in/mdyeen"],
    knowsAbout: [
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Next.js",
      "TypeScript",
      "MERN Stack",
      "SaaS Development",
      "Web Development",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Lords Institute of Engineering And Technology - Osmania University",
      sameAs: "https://lords.ac.in/",
    },
    workLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        addressCountry: "India",
      },
    },
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-background">
        {/* Header with theme toggle and navigation */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="font-bold text-xl">
              <span className="text-violet-600 dark:text-violet-400">Md</span>Ayeen
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
              <button
                onClick={() => scrollToSection(experienceRef)}
                className="text-sm font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection(skillsRef)}
                className="text-sm font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection(accomplishmentsRef)}
                className="text-sm font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                Accomplishments
              </button>
              <button
                onClick={() => scrollToSection(educationRef)}
                className="text-sm font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                Education
              </button>
              <button
                onClick={() => scrollToSection(projectsRef)}
                className="text-sm font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                Projects
              </button>
              <ThemeToggle />
            </nav>

            {/* Mobile menu and theme toggle */}
            <div className="flex md:hidden items-center space-x-2">
              <ThemeToggle />
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] p-6">
                  <SheetHeader className="border-b pb-4 mb-4">
                    <SheetTitle className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                      Menu
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col space-y-6">
                    <button
                      onClick={() => {
                        scrollToSection(experienceRef)
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center space-x-2 text-lg font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      <span className="text-violet-600 dark:text-violet-400">01.</span>
                      <span>Experience</span>
                    </button>
                    <button
                      onClick={() => {
                        scrollToSection(skillsRef)
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center space-x-2 text-lg font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      <span className="text-violet-600 dark:text-violet-400">02.</span>
                      <span>Skills</span>
                    </button>
                    <button
                      onClick={() => {
                        scrollToSection(accomplishmentsRef)
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center space-x-2 text-lg font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      <span className="text-violet-600 dark:text-violet-400">03.</span>
                      <span>Accomplishments</span>
                    </button>
                    <button
                      onClick={() => {
                        scrollToSection(educationRef)
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center space-x-2 text-lg font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      <span className="text-violet-600 dark:text-violet-400">04.</span>
                      <span>Education</span>
                    </button>
                    <button
                      onClick={() => {
                        scrollToSection(projectsRef)
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center space-x-2 text-lg font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      <span className="text-violet-600 dark:text-violet-400">05.</span>
                      <span>Projects</span>
                    </button>
                  </nav>
                  <div className="mt-auto pt-8 border-t">
                    <div className="flex justify-center space-x-6">
                      <Link
                        href="https://github.com/mdayeen"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400"
                      >
                        <Github className="h-6 w-6" />
                        <span className="sr-only">GitHub</span>
                      </Link>
                      <Link
                        href="https://linkedin.com/in/mdyeen"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400"
                      >
                        <Linkedin className="h-6 w-6" />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                      <Link
                        href="mailto:ayeen0410@gmail.com"
                        className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400"
                      >
                        <Mail className="h-6 w-6" />
                        <span className="sr-only">Email</span>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        <main className="container py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Column - Personal Information */}
            <div className="space-y-12">
              {/* Name and Contact */}
              <section className="space-y-6" itemScope itemType="https://schema.org/Person">
                <h1 className="text-5xl font-bold tracking-tight text-violet-600 dark:text-violet-400" itemProp="name">
                  Mohammed Ayeenuddin
                </h1>
                <h2 className="text-2xl font-medium" itemProp="jobTitle">
                  Full Stack Developer <span itemProp="workLocation">based in Hyderabad</span>
                </h2>
                <p className="text-muted-foreground" itemProp="description">
                  Specialized in MERN stack and SaaS development with a focus on creating scalable and efficient web
                  applications.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="mailto:ayeen0410@gmail.com"
                    className="flex items-center gap-2 text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400"
                    itemProp="email"
                  >
                    <Mail className="h-5 w-5" />
                    <span>ayeen0410@gmail.com</span>
                  </Link>
                  <Link
                    href="https://linkedin.com/in/mdyeen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400"
                    itemProp="sameAs"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>linkedin.com/in/mdyeen</span>
                  </Link>
                  <Link
                    href="https://github.com/mdayeen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400"
                    itemProp="sameAs"
                  >
                    <Github className="h-5 w-5" />
                    <span>github.com/mdayeen</span>
                  </Link>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/Ayeenuddin 2page.pdf';
                      link.download = 'Mohammed_Ayeenuddin_CV.pdf';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <FileText className="h-4 w-4" />
                    Download CV
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2 text-green-600 hover:text-green-700 border-green-600 hover:border-green-700 dark:text-green-500 dark:hover:text-green-400 dark:border-green-500 dark:hover:border-green-400"
                    asChild
                  >
                    <Link href="https://wa.me/+918919066592" target="_blank" rel="noopener noreferrer">
                      <Phone className="h-4 w-4" />
                      WhatsApp
                    </Link>
                  </Button>
                </div>
              </section>

              {/* Experience Section */}
              <section
                ref={experienceRef}
                className="space-y-6 pt-6"
                id="experience"
                aria-labelledby="experience-heading"
              >
                <h2
                  id="experience-heading"
                  className="text-3xl font-bold border-b border-violet-200 dark:border-violet-800 pb-2"
                >
                  Experience
                </h2>
                <div className="space-y-8">
                  {[
                    {
                      title: "Full Stack Developer",
                      company: "Code For India Org",
                      period: "Nov 2022 - April 2023",
                      description:
                        "Designed and developed features for user account management, loan monitoring, and ledger functionality. Implemented secure data access using JWT authentication and robust authorization protocols. Optimized application load times through effective image compression techniques. Debugged critical bugs to ensure smooth application performance. Conducted code reviews and mentoring sessions, boosting team productivity. Followed Agile methodologies and MVC architecture for scalable and efficient development.",
                      location: "Hyderabad, India",
                    },
                    {
                      title: "Educator",
                      company: "RR Education Academy",
                      period: "May 2024 - April 2025",
                      description:
                        "Teach physics and math, simplifying complex concepts for better student understanding. Design engaging lesson plans tailored to individual needs. Evaluate student progress through regular assessments and constructive feedback. Foster an interactive learning environment to build confidence and academic skills.",
                      location: "Hyderabad, India",
                    },
                  ].map((job, index) => (
                    <div key={index} className="space-y-2" itemScope itemType="https://schema.org/WorkPosition">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h3 className="text-xl font-bold" itemProp="name">
                          {job.title}
                        </h3>
                        <Badge variant="outline" className="w-fit">
                          <time itemProp="startDate" dateTime={job.period.split(" - ")[0]}>
                            {job.period.split(" - ")[0]}
                          </time>
                          {" - "}
                          <time itemProp="endDate" dateTime={job.period.split(" - ")[1]}>
                            {job.period.split(" - ")[1]}
                          </time>
                        </Badge>
                      </div>
                      <div className="text-violet-600 dark:text-violet-400 font-medium">
                        <span itemProp="worksFor">{job.company}</span> -{" "}
                        <span itemProp="workLocation">{job.location}</span>
                      </div>
                      <p className="text-muted-foreground" itemProp="description">
                        {job.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Accomplishments Section */}
              <section
                ref={accomplishmentsRef}
                className="space-y-6 pt-6"
                id="accomplishments"
                aria-labelledby="accomplishments-heading"
              >
                <h2
                  id="accomplishments-heading"
                  className="text-3xl font-bold border-b border-violet-200 dark:border-violet-800 pb-2"
                >
                  Accomplishments
                </h2>
                <ul className="space-y-3 list-disc pl-5">
                  <li className="text-muted-foreground">
                    Enhanced a financial services platform by improving features and optimizing performance.
                  </li>
                  <li className="text-muted-foreground">
                    Designed a new system interface (API) that streamlined processes and improved usability.
                  </li>
                  <li className="text-muted-foreground">
                    Built a task management system with automated SMS and email reminders for better workflows.
                  </li>
                  <li className="text-muted-foreground">
                    Implemented advanced security measures, including encrypted tokens, ensuring secure user logins.
                  </li>
                  <li className="text-muted-foreground">
                    Improved application speed by implementing efficient image compression techniques.
                  </li>
                  <li className="text-muted-foreground">
                    Delivered engaging lessons, helping students excel academically in physics and math.
                  </li>
                </ul>
              </section>

              {/* Skills Section */}
              <section ref={skillsRef} className="space-y-6 pt-6" id="skills" aria-labelledby="skills-heading">
                <h2
                  id="skills-heading"
                  className="text-3xl font-bold border-b border-violet-200 dark:border-violet-800 pb-2"
                >
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2" itemScope itemType="https://schema.org/ItemList">
                  {[
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Node.js",
                    "Express",
                    "MongoDB",
                    "PostgreSQL",
                    "HTML",
                    "CSS",
                    "Tailwind CSS",
                    "Git",
                    "Vercel",
                    "Linux",
                    "JWT",
                    "REST API",
                    "MERN Stack",
                    "SaaS Development",
                  ].map((skill, index) => (
                    <Badge
                      key={skill}
                      className="bg-violet-100 text-violet-800 hover:bg-violet-200 dark:bg-violet-900 dark:text-violet-300 dark:hover:bg-violet-800"
                      itemProp="itemListElement"
                      itemScope
                      itemType="https://schema.org/ListItem"
                    >
                      <meta itemProp="position" content={`${index + 1}`} />
                      <span itemProp="name">{skill}</span>
                    </Badge>
                  ))}
                </div>
              </section>

              {/* Education Section */}
              <section ref={educationRef} className="space-y-6 pt-6" id="education" aria-labelledby="education-heading">
                <h2
                  id="education-heading"
                  className="text-3xl font-bold border-b border-violet-200 dark:border-violet-800 pb-2"
                >
                  Education
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      degree: "Bachelor of Engineering in Computer Science",
                      institution: "Lords Institute of Engineering And Technology - OU",
                      period: "2024",
                      description:
                        "Graduated in Computer Science Engineering from Lords Institute of Engg Affiliated to Osmania University",
                      location: "Hyderabad, India",
                    },
                    {
                      degree: "Intermediate - MPC",
                      institution: "Sri Chandra Jr College",
                      period: "2019",
                      description:
                        "Completed Intermediate from Sri Chandra Jr College majors in Maths, Physics and Chemistry",
                      location: "Hyderabad, India",
                    },
                  ].map((edu, index) => (
                    <div
                      key={index}
                      className="space-y-2"
                      itemScope
                      itemType="https://schema.org/EducationalOccupationalCredential"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h3 className="text-xl font-bold" itemProp="credentialCategory">
                          {edu.degree}
                        </h3>
                        <Badge variant="outline" className="w-fit">
                          <time itemProp="dateCreated" dateTime={edu.period}>
                            {edu.period}
                          </time>
                        </Badge>
                      </div>
                      <div
                        className="text-violet-600 dark:text-violet-400 font-medium"
                        itemScope
                        itemType="https://schema.org/EducationalOrganization"
                      >
                        <span itemProp="name">{edu.institution}</span> - <span itemProp="address">{edu.location}</span>
                      </div>
                      <p className="text-muted-foreground" itemProp="description">
                        {edu.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Projects */}
            <section
              ref={projectsRef}
              className="space-y-8 lg:border-l lg:border-violet-200 lg:dark:border-violet-800 lg:pl-16"
              id="projects"
              aria-labelledby="projects-heading"
            >
              <h2
                id="projects-heading"
                className="text-3xl font-bold border-b border-violet-200 dark:border-violet-800 pb-2"
              >
                Projects
              </h2>
              <div className="space-y-12">
                {[
                  {
                    title: "Admin Platform For Banking And Finance Platform",
                    description: "Platform for User Accounts and Financial Operations ",
                    tags: ["React", "Node.js", "MongoDB", "Express", "JWT", "Agile"],
                    github: "https://github.com/mdayeen",
                    demo: "https://sahulathyd.org/",
                  },
                  {
                    title: "Task Manager with Automated Alerts",
                    description: "Task management app with automated SMS and email reminders for deadlines.",
                    tags: ["MongoDB", "Express", "React", "Node", "React Hooks", "CSS", "Nodemailer", "Twilio"],
                    github: "https://github.com/mdayeen/mytask",
                    demo: "https://mytask-beryl.vercel.app/",
                  },
                  {
                    title: "Email Template Builder",
                    description:
                      "A web application to create, edit, and manage responsive email templates with a user-friendly drag-and-drop interface and real-time preview functionality.",
                    tags: [
                      "React",
                      "Tailwind CSS",
                      "MongoDB",
                      "Express",
                      "Node.js",
                      "React Context API",
                      "Material UI",
                    ],
                    github: "https://github.com/mdayeen/Build-Email",
                    demo: "https://build-email.vercel.app",
                  },
                  {
                    title: "Interior Design Website Portfolio Template",
                    description:
                      "A sleek, modern, and customizable portfolio template for interior designers, built with a luxurious black and gold aesthetic and a future-ready fullstack foundation.",
                    tags: [
                      "Next.js 15",
                      "Shadcn UI",
                      "Tailwind CSS",
                      "TypeScript",
                      "Responsive Design",
                      "Fullstack",
                      "Modular Architecture",
                    ],
                    github: "https://github.com/mdayeen/nextInterior",
                    demo: "https://next-interior.vercel.app/",
                  },
                  {
                    title: "Overseas Consultancy Landing Page Template",
                    description:
                      "A fully responsive and customizable landing page template for overseas consultancies, education services, and travel agencies, built with HTML, Tailwind CSS, and JavaScript.",
                    tags: [
                      "HTML5",
                      "Tailwind CSS",
                      "JavaScript",
                      "Responsive Design",
                      "Landing Page",
                      "Mailto Integration",
                    ],
                    github: "https://github.com/mdayeen/Overseas-Teamplate",
                    demo: "https://mau-overseas.netlify.app/",
                  },
                  {
                    title: "Node.js CLI Tools Collection",
                    description:
                      "A set of command-line tools built using Node.js, including a Base64 converter, weather forecast tool, and secure password generator.",
                    tags: ["Node.js", "CLI", "JavaScript", "Base64", "Weather API", "Crypto", "Utilities"],
                    github: "https://github.com/mdayeen/CLI",
                    demo: "https://github.com/mdayeen/CLI", // CLI tools typically don't have a demo URL, so GitHub link is reused here
                  },
                ].map((project, index) => (
                  <div
                    key={index}
                    className="space-y-4 border-b border-violet-100 dark:border-violet-900 pb-8 last:border-0"
                    itemScope
                    itemType="https://schema.org/SoftwareApplication"
                  >
                    <h3 className="text-2xl font-bold" itemProp="name">
                      Project {index + 1}: {project.title}
                    </h3>
                    <p className="text-muted-foreground" itemProp="description">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" itemProp="keywords">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button variant="outline" size="sm" className="gap-2" asChild>
                        <Link href={project.github} target="_blank" rel="noopener noreferrer" itemProp="codeRepository">
                          <Github className="h-4 w-4" />
                          View Code
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2" asChild>
                        <Link href={project.demo} target="_blank" rel="noopener noreferrer" itemProp="url">
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t py-6">
          <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Mohammed Ayeenuddin. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="https://github.com/mdayeen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/in/mdyeen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:ayeen0410@gmail.com"
                className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400"
                aria-label="Email Contact"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
