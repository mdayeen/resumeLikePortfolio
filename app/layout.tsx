import type React from "react";
import "@/app/globals.css";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AmbientAudio } from "@/components/portfolio/ambient-audio";
import { profile } from "@/lib/profile";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
const title = "Ayeen — Full Stack Developer & Co-Founder of Anjeer Labs";

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: {
    default: title,
    template: "%s | Mohammed Ayeenuddin",
  },
  description: profile.description,
  authors: [{ name: profile.name, url: profile.url }],
  creator: profile.name,
  publisher: profile.name,
  formatDetection: { email: false, address: false, telephone: false },
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
    type: "website",
    locale: "en_IN",
    url: profile.url,
    title,
    description: profile.description,
    siteName: "Ayeen — Mohammed Ayeenuddin",
    images: [
      { url: profile.image, width: 1440, height: 1440, alt: profile.name },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.description,
    images: [profile.image],
    creator: "@mdayeen",
  },
  alternates: { canonical: "./" },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="text/plain"
          href="/llms-full.txt"
          title="Plain-text portfolio"
        />
        <link
          rel="alternate"
          type="application/json"
          href="/profile.json"
          title="Structured portfolio"
        />
      </head>
      <body
        className={`${inter.className} ${display.variable} ${mono.variable}`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          storageKey="portfolio-theme"
        >
          {children}
          <AmbientAudio />
        </ThemeProvider>
      </body>
    </html>
  );
}
