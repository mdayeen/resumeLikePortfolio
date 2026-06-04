import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://mdayeen.xyz"),
  title: {
    default: "Mohammed Ayeenuddin | Full Stack MERN Developer | Hyderabad, India",
    template: "%s | Mohammed Ayeenuddin"
  },
  description:
    "Official portfolio of Mohammed Ayeenuddin, Full Stack MERN Developer, SaaS Architect, and Co-Founder of Anjeer Labs based in Hyderabad, India. Specialized in React, Node.js, Next.js, and scale ERP architectures.",
  keywords: [
    "Full Stack Developer",
    "MERN Stack Developer",
    "Anjeer Labs",
    "Anjeer Labs Hyderabad",
    "SaaS Developer",
    "React Developer",
    "Node.js Developer",
    "MongoDB",
    "Express.js",
    "Hyderabad Developer",
    "Web Development Hyderabad",
    "JavaScript Developer",
    "TypeScript",
    "Next.js Developer",
    "Mohammed Ayeenuddin",
    "Mohammed Ayeenuddin Developer",
    "Mohammed Ayeenuddin Hyderabad",
    "Mohammed Ayeenuddin MERN Developer",
    "Ayeenuddin Software Developer",
    "Mohammed Ayeenuddin Anjeer Labs",
    "Frontend Developer",
    "Backend Developer",
    "India Developer",
    "Remote Developer",
    "Full Stack Engineer",
    "ERP Architect",
    "Web Application Developer",
    "API Development",
    "Database Design",
    "UI/UX Development",
    "Responsive Web Design",
    "Progressive Web Apps",
    "Cloud Development"
  ],
  authors: [{ name: "Mohammed Ayeenuddin", url: "https://mdayeen.xyz" }],
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
    locale: "en_IN",
    url: "https://mdayeen.xyz",
    title: "Mohammed Ayeenuddin | Full Stack MERN Developer & Co-Founder of Anjeer Labs",
    description:
      "Official portfolio of Mohammed Ayeenuddin, Full Stack MERN Developer, SaaS Architect, and Co-Founder of Anjeer Labs based in Hyderabad, India.",
    siteName: "Mohammed Ayeenuddin Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mohammed Ayeenuddin - Full Stack Developer & Co-Founder of Anjeer Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Ayeenuddin | Full Stack MERN Developer & Co-Founder of Anjeer Labs",
    description:
      "Official portfolio of Mohammed Ayeenuddin, Full Stack MERN Developer, SaaS Architect, and Co-Founder of Anjeer Labs based in Hyderabad, India.",
    images: ["/og-image.png"],
    creator: "@mdayeen",
    site: "@mdayeen",
  },
  alternates: {
    canonical: "./",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "your-google-site-verification",
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
