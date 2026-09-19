import { profile } from "@/lib/profile";

export const dynamic = "force-static";

export function GET() {
  return Response.json(profile, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "noindex",
      Link: `<${profile.url}/agents>; rel="canonical"`,
    },
  });
}
