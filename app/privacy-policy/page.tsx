import { Metadata } from "next"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "Privacy Policy | Mohammed Ayeenuddin",
  description: "Privacy policy disclosures and data protection parameters for the personal portfolio website of Mohammed Ayeenuddin.",
  alternates: {
    canonical: "./",
  }
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12 max-w-3xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="text-xs text-muted-foreground">Last updated: June 5, 2026</p>
        </div>

        <div className="prose dark:prose-invert max-w-none text-muted-foreground space-y-6 leading-relaxed text-sm sm:text-base">
          <p>
            Welcome to the personal website of <strong>Mohammed Ayeenuddin</strong>. This website, located at <code>https://mdayeen.xyz</code>, serves as a professional portfolio, project registry, and personal blog.
          </p>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">1. Data Collection and Usage</h2>
            <p>
              This website is designed to be highly secure and respects user privacy. We do not run dynamic user tracking databases, we do not require user logins, and we do not maintain client database collection channels on this domain.
            </p>
            <p>
              If you utilize the direct links (Email, Phone, or WhatsApp) on this website to contact Mohammed Ayeenuddin or Anjeer Labs, the transmission of your messages and contact details will occur through the respective secure external provider (your mail client, WhatsApp secure end-to-end encryption server, or mobile network). This data is strictly used to address your engineering briefs, consulting inquiries, and recruitment processes, and is never shared, sold, or redistributed.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">2. Third-Party Services</h2>
            <p>
              We integrate Google Analytics (GA4) and Microsoft Clarity to track anonymous user interaction trends (like page views, bounce rates, and session durations). This helps us optimize Core Web Vitals performance and technical SEO indexing. These platforms aggregate data anonymously and do not identify individual users.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">3. Cookies</h2>
            <p>
              Next.js and theme providers (such as <code>next-themes</code>) may save a small cookie file on your local machine to preserve your UI preferences (like retaining the "dark" or "light" theme choice across visits).
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">4. Contact Information</h2>
            <p>
              If you have any questions regarding this privacy policy or wish to request data updates, please contact us at:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Primary Email: <code>ayeen@mdayeen.xyz</code></li>
              <li>Alternative: <code>contact@mdayeen.xyz</code></li>
              <li>Phone/WhatsApp: <code>+91 8919066592</code></li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
