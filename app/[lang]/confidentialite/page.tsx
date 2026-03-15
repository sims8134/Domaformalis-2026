import type { Metadata } from "next";
import { getDictionary } from "../../lib/get-dictionary";

const BASE_URL = "https://domaformalis.com";

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
      dict?.seo?.privacy?.title || "Politique de confidentialité | Domaformalis",
    description:
      dict?.seo?.privacy?.description ||
      "Consultez la politique de confidentialité de Domaformalis.",
    alternates: {
      canonical: `${BASE_URL}/${lang}/confidentialite`,
      languages: {
        fr: `${BASE_URL}/fr/confidentialite`,
        en: `${BASE_URL}/en/confidentialite`,
        es: `${BASE_URL}/es/confidentialite`,
        bg: `${BASE_URL}/bg/confidentialite`,
        "x-default": `${BASE_URL}/fr/confidentialite`,
      },
    },
  };
}

export default async function ConfidentialitePage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const p = dict.privacy;

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="hero-tag">{p.hero.tag}</span>
          <h1>{p.hero.title}</h1>
          <p>{p.hero.desc}</p>
        </div>
      </section>

      <section className="legal-section">
        <div className="legal-inner">
          <p className="legal-updated">{p.updated}</p>

          {p.sections.map(
            (section: { title: string; content: string[] }, i: number) => (
              <div key={i} className="legal-block">
                <h2>{section.title}</h2>
                {section.content.map((paragraph: string, j: number) => (
                  <p key={j} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}