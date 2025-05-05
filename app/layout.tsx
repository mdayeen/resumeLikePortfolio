import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mohammed Ayeenuddin | Full Stack MERN Developer | Hyderabad, India",
  description:
    "Full Stack Developer from Hyderabad, India specializing in MERN stack and SaaS development. Experienced in React, Node.js, MongoDB, Express.js, and modern web technologies. Available for remote and local opportunities.",
  keywords: [
    "Full Stack Developer",
    "MERN Stack",
    "SaaS Developer",
    "React Developer",
    "Node.js Developer",
    "MongoDB",
    "Express.js",
    "Hyderabad Developer",
    "Web Development",
    "JavaScript Developer",
    "TypeScript",
    "Next.js",
    "Mohammed Ayeenuddin",
    "Frontend Developer",
    "Backend Developer",
    "India Developer",
    "Remote Developer",
    "Full Stack Engineer",
    "Web Application Developer",
    "API Development",
    "Database Design",
    "UI/UX Development",
    "Responsive Web Design",
    "Progressive Web Apps",
    "Cloud Development"
  ],
  authors: [{ name: "Mohammed Ayeenuddin", url: "https://mdayeen.vercel.app/" }],
  creator: "Mohammed Ayeenuddin",
  publisher: "Mohammed Ayeenuddin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://mdayeen.vercel.app/",
    title: "Mohammed Ayeenuddin | Full Stack MERN Developer | Hyderabad, India",
    description:
      "Full Stack Developer from Hyderabad, India specializing in MERN stack and SaaS development. Experienced in React, Node.js, MongoDB, Express.js, and modern web technologies. Available for remote and local opportunities.",
    siteName: "Mohammed Ayeenuddin Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mohammed Ayeenuddin - Full Stack Developer from Hyderabad, India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Ayeenuddin | Full Stack MERN Developer | Hyderabad, India",
    description:
      "Full Stack Developer from Hyderabad, India specializing in MERN stack and SaaS development. Experienced in React, Node.js, MongoDB, Express.js, and modern web technologies. Available for remote and local opportunities.",
    images: ["/og-image.png"],
    creator: "@mdayeen",
    site: "@mdayeen",
  },
  alternates: {
    canonical: "https://mdayeen.vercel.app/",
  },
  verification: {
    google: "your-google-site-verification", // Add your Google Search Console verification code
  },
  category: "technology",
  generator: 'mdayeen'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} vsc-initialized`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          storageKey="portfolio-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
