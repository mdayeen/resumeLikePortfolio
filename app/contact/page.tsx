import { Metadata } from "next"
import { Mail, Phone, MapPin, ExternalLink, Calendar, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "Contact Mohammed Ayeenuddin | Full Stack MERN Developer",
  description: "Get in touch with Mohammed Ayeenuddin, Full Stack MERN Developer and Co-Founder of Anjeer Labs. Based in Hyderabad, India. Available for contract work, SaaS consulting, and agency assignments.",
  alternates: {
    canonical: "./",
  }
}

export default function Contact() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://mdayeen.xyz/#localbusiness",
    "name": "Mohammed Ayeenuddin - Full Stack Developer",
    "image": "https://mdayeen.xyz/placeholder-user.jpg",
    "priceRange": "$$",
    "telephone": "+918919066592",
    "email": "ayeen@mdayeen.xyz",
    "url": "https://mdayeen.xyz",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.3850",
      "longitude": "78.4867"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    }
  }

  const channels = [
    {
      title: "Email",
      value: "ayeen@mdayeen.xyz",
      sub: "Preferred for business inquiries",
      href: "mailto:ayeen@mdayeen.xyz",
      icon: Mail,
      action: "Send Email"
    },
    {
      title: "Alternative Email",
      value: "contact@mdayeen.xyz",
      sub: "Secondary contact channel",
      href: "mailto:contact@mdayeen.xyz",
      icon: Mail,
      action: "Send Email"
    },
    {
      title: "WhatsApp & Call",
      value: "+91 8919066592",
      sub: "Instant messaging & support",
      href: "https://wa.me/918919066592",
      icon: Phone,
      action: "Open WhatsApp"
    },
    {
      title: "Location Office",
      value: "Hyderabad, Telangana, India",
      sub: "Available for on-site local briefs",
      href: "https://maps.google.com/?q=Hyderabad",
      icon: MapPin,
      action: "View Map"
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container py-12 max-w-4xl space-y-12">
          {/* Header */}
          <section className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Let's Build Something <span className="text-violet-600 dark:text-violet-400">Exceptional</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Have a SaaS platform to develop, an ERP database schema to design, or looking to hire a Full Stack Developer in Hyderabad? Get in touch.
            </p>
          </section>

          {/* Contact Methods Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {channels.map((chan, idx) => {
              const Icon = chan.icon
              return (
                <div key={idx} className="border rounded-xl p-6 bg-card text-card-foreground flex flex-col justify-between space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="p-3 rounded-lg bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg leading-tight">{chan.title}</h3>
                      <p className="text-xs text-muted-foreground">{chan.sub}</p>
                      <p className="font-semibold text-foreground break-all pt-1">{chan.value}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full gap-2 border-violet-200 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-950/20" asChild>
                    <a href={chan.href} target={chan.title === "Location Office" || chan.title === "WhatsApp & Call" ? "_blank" : undefined} rel={chan.title === "Location Office" || chan.title === "WhatsApp & Call" ? "noopener noreferrer" : undefined}>
                      {chan.action} <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )
            })}
          </section>

          {/* Contact Notice */}
          <section className="border rounded-2xl p-6 sm:p-8 bg-muted/40 text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="font-bold text-xl">Service Response Time</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I read and respond to direct client emails daily. For urgent development emergencies, system crashes, or immediate SaaS consultation queries, reaching out via WhatsApp is recommended. I am available Monday through Saturday, from 9:00 AM to 7:00 PM IST.
            </p>
          </section>
        </main>
      </div>
    </>
  )
}
