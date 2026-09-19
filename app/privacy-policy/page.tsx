import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { profile } from "@/lib/profile"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How this portfolio uses visitor counters, browser preferences, the optional game leaderboard, and external contact links.",
  alternates: { canonical: "/privacy-policy" },
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-16 max-w-3xl space-y-8">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">Privacy policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: September 19, 2026</p>
        </div>
        <div className="text-muted-foreground space-y-8 leading-relaxed text-sm sm:text-base">
          <p>This is the personal portfolio of {profile.name} at <a className="underline" href={profile.url}>mdayeen.xyz</a>. This page describes the features provided by the site. No account is needed to browse it.</p>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Visitor and view counters</h2>
            <p>The live counter uses a random browser identifier stored in local storage to distinguish browsers and avoid counting the same browser as several concurrent visitors. While the page is visible, it sends a presence update approximately every 20 seconds. An active presence expires after 60 seconds without an update. These are approximate browser counts, not a count of identified people.</p>
            <p>A separate page-view token prevents retries of the same view from increasing the view total. Inactive presence records become eligible for cleanup after five minutes; view tokens after 24 hours. Cleanup happens when the backend processes requests. Counters use the site&apos;s own backend. The application does not store raw IP addresses for these features. Hosting providers may process normal request logs as part of operating the website.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Game and leaderboard</h2>
            <p>The optional game uses a signed, HttpOnly cookie that lasts up to 24 hours and server sessions that expire after 10 minutes to validate runs and score submissions. If you submit a score, your chosen three-character initials, score, and run duration are saved. Only the top three results are retained on the public leaderboard. Please avoid initials that identify you if you prefer to remain anonymous.</p>
            <p>Gameplay and counter records use the database configured for the deployed site. Local previews may instead store these records on the development computer. Temporary presence and game sessions expire; aggregate view totals and leaderboard results are retained to keep those features useful.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Preferences and music</h2>
            <p>Theme and motion preferences may be saved in your browser&apos;s local storage. Clearing this site&apos;s browser data resets these preferences and its visitor identifier. You can reduce animation using the site&apos;s motion control or your device&apos;s reduced-motion setting.</p>
            <p>Ambient music is optional and starts only when you enable it. It is synthesized on your device; it does not stream from a music service or introduce a music-tracking service.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">External services and contact</h2>
            <p>Booking links take you to Cal.com. Email links open your email application. Project and social links open their respective websites. Those services handle the information you give them under their own policies. Contact details you send are used to respond to your inquiry.</p>
            <p>This portfolio does not embed Google Analytics or Microsoft Clarity.</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Questions or data requests</h2>
            <p>Email <a className="underline text-foreground" href={`mailto:${profile.email}`}>{profile.email}</a> with privacy questions or a request concerning a leaderboard entry. Include enough information to identify the relevant entry.</p>
            <Link className="inline-block underline" href="/">Back to the portfolio</Link>
          </section>
        </div>
      </main>
    </div>
  )
}
