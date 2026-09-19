import { Portfolio } from "@/components/portfolio/portfolio";
import {
  organizationSchema,
  personSchema,
  profile,
  serializeJsonLd,
} from "@/lib/profile";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${profile.url}/#webpage`,
      url: profile.url,
      name: `${profile.name} — Full Stack Developer`,
      description: profile.description,
      mainEntity: { "@id": `${profile.url}/#person` },
      isPartOf: { "@id": `${profile.url}/#website` },
      hasPart: [
        { "@id": `${profile.url}/#selected-projects` },
        { "@id": `${profile.url}/#faq` },
      ],
    },
    personSchema,
    organizationSchema,
    {
      "@type": "WebSite",
      "@id": `${profile.url}/#website`,
      url: profile.url,
      name: "Ayeen — Mohammed Ayeenuddin",
      publisher: { "@id": `${profile.url}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "ItemList",
      "@id": `${profile.url}/#selected-projects`,
      name: "Selected projects",
      numberOfItems: profile.projects.length,
      itemListElement: profile.projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.name,
          description: project.description,
          url: project.url,
        },
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${profile.url}/#faq`,
      mainEntity: profile.faq.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
      <Portfolio />
    </>
  );
}
