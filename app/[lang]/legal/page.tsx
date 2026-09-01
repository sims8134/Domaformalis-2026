import type { Metadata } from "next";
import { getDictionary } from "../../lib/get-dictionary";
import { buildAlternates } from "@/app/lib/seo";


type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title:
      dict?.seo?.legal?.title || "Mentions légales | Domaformalis",
    description:
      dict?.seo?.legal?.description ||
      "Consultez les mentions légales de Domaformalis.",
    alternates: buildAlternates(lang, "/legal"),
  };
}

export default async function MentionsLegalesPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const m = dict.legal;

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="hero-tag">{m.hero.tag}</span>
          <h1>{m.hero.title}</h1>
          <p>{m.hero.desc}</p>
        </div>
      </section>

      <section className="legal-section">
        <div className="legal-inner">
          <p className="legal-updated">{m.updated}</p>

          {m.sections.map(
            (section: { title: string; content: string[] }, i: number) => (
              <div key={i} className="legal-block">
                <h2>{section.title}</h2>
                {section.content.map((paragraph: string, j: number) => (
                  <p
                    key={j}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}