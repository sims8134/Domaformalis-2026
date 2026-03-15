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
    title: dict?.seo?.cgu?.title || "Conditions générales d'utilisation | Domaformalis",
    description:
      dict?.seo?.cgu?.description ||
      "Consultez les conditions générales d'utilisation du site Domaformalis.",
    alternates: {
      canonical: `${BASE_URL}/${lang}/cgu`,
      languages: {
        fr: `${BASE_URL}/fr/cgu`,
        en: `${BASE_URL}/en/cgu`,
        es: `${BASE_URL}/es/cgu`,
        bg: `${BASE_URL}/bg/cgu`,
        "x-default": `${BASE_URL}/fr/cgu`,
      },
    },
  };
}

export default async function CGUPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const c = dict.cgu;

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="hero-tag">{c.hero.tag}</span>
          <h1>{c.hero.title}</h1>
          <p>{c.hero.desc}</p>
        </div>
      </section>

      <section className="legal-section">
        <div className="legal-inner">
          <p className="legal-updated">{c.updated}</p>

          {c.sections.map(
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