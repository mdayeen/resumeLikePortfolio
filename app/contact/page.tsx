import type { Metadata } from "next"
import { Mail, MapPin, Github, Calendar, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { organizationSchema, personSchema, profile, serializeJsonLd } from "@/lib/profile"

export const metadata: Metadata = {
  title: "Contact & Project Inquiries",
  description: "Discuss a web application, SaaS product, or development project with Mohammed Ayeenuddin. Book a conversation with Anjeer Labs or email ayeen0410@gmail.com.",
  alternates: { canonical: "/contact" },
}

export default function Contact() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${profile.url}/contact#webpage`,
        name: "Contact Mohammed Ayeenuddin",
        url: `${profile.url}/contact`,
        about: { "@id": `${profile.url}/#person` },
      },
      personSchema,
      organizationSchema,
    ],
  }
  const channels = [
    { title: "Book a conversation", value: "cal.com/anjeerlabs", sub: "Choose a time to talk about your project", href: profile.bookingUrl, icon: Calendar, action: "Find a time" },
    { title: "Email", value: profile.email, sub: "Send your brief, questions, or an introduction", href: `mailto:${profile.email}`, icon: Mail, action: "Send an email" },
    { title: "GitHub", value: "github.com/mdayeen", sub: "Explore code and connect", href: profile.socials[0].url, icon: Github, action: "Visit GitHub" },
    { title: "Based in Hyderabad", value: "Hyderabad, Telangana, India", sub: "Full stack developer & co-founder of Anjeer Labs", href: profile.organization.url, icon: MapPin, action: "Meet Anjeer Labs" },
  ]
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-16 max-w-4xl space-y-12">
          <section className="space-y-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Start a conversation</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">Big idea?<br /><span className="text-lime-700 dark:text-lime-400">Let&apos;s build it.</span></h1>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">Tell me what you have in mind. I build web applications, SaaS products, and software that makes business operations simpler.</p>
            <Button size="lg" className="gap-2 bg-lime-400 text-black hover:bg-lime-300" asChild><a href={profile.bookingUrl}>Book a conversation <ArrowUpRight size={18} /></a></Button>
          </section>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5" aria-label="Contact options">
            {channels.map((channel) => {
              const Icon = channel.icon
              return (
                <article key={channel.title} className="border rounded-xl p-6 bg-card text-card-foreground flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <Icon className="h-6 w-6 text-lime-700 dark:text-lime-400" aria-hidden="true" />
                    <div className="space-y-2">
                      <h2 className="font-semibold text-xl">{channel.title}</h2>
                      <p className="text-sm text-muted-foreground">{channel.sub}</p>
                      <p className="font-medium break-words">{channel.value}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full justify-between" asChild><a href={channel.href}>{channel.action}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a></Button>
                </article>
              )
            })}
          </section>
        </main>
      </div>
    </>
  )
}
