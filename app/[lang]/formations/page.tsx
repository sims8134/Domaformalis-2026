import type { Metadata } from "next";
import { getDictionary } from "@/app/lib/get-dictionary";
import FormationsCatalogue from "@/components/FormationsCatalogue";
import Link from "next/link";

const BASE_URL = "https://www.domaformalis.com";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const title =
    dict?.seo?.formations?.title || "Formations | Domaformalis";

  const description =
    dict?.seo?.formations?.description ||
    "Découvrez toutes les formations Domaformalis.";

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/formations`,
      languages: {
        fr: `${BASE_URL}/fr/formations`,
        en: `${BASE_URL}/en/formations`,
        es: `${BASE_URL}/es/formations`,
        bg: `${BASE_URL}/bg/formations`,
        "x-default": `${BASE_URL}/fr/formations`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/formations`,
      siteName: "Domaformalis",
      locale: lang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title:
      dict?.seo?.formations?.title || "Formations | Domaformalis",
    description:
      dict?.seo?.formations?.description ||
      "Découvrez toutes les formations Domaformalis : langues, informatique, IA, multimédia et plus encore.",
    alternates: {
      canonical: `${BASE_URL}/${lang}/formations`,
      languages: {
        fr: `${BASE_URL}/fr/formations`,
        en: `${BASE_URL}/en/formations`,
        es: `${BASE_URL}/es/formations`,
        bg: `${BASE_URL}/bg/formations`,
        "x-default": `${BASE_URL}/fr/formations`,
      },
    },
  };
}

export default async function FormationsPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <h2>{dict.page?.formations?.tag || "📖 Catalogue complet"}</h2>
          <h1
            dangerouslySetInnerHTML={{
              __html:
                dict.page?.formations?.title ||
                "Toutes nos <span>formations</span>",
            }}
          />
          <p>
            {dict.page?.formations?.desc ||
              "Langues, informatique, IA, multimédia, réseaux sociaux — des contenus clairs, progressifs et accessibles à tous les niveaux."}
          </p>

          <div className="hero-stats">
            <div className="hero-stat">
              <strong>{dict.stats?.formations?.value || "14+"}</strong>
              <span>{dict.stats?.formations?.label || "formations"}</span>
            </div>
            <div className="hero-stat">
              <strong>{dict.stats?.niveaux?.value || "3"}</strong>
              <span>{dict.stats?.niveaux?.label || "niveaux / formations"}</span>
            </div>
            <div className="hero-stat">
              <strong>{dict.stats?.online?.value || "100%"}</strong>
              <span>{dict.stats?.online?.label || "en ligne"}</span>
            </div>
          </div>
        </div>
      </section>

      <FormationsCatalogue dict={dict} lang={lang} />

      <section className="cta-banner">
        <h2>{dict.cta?.title || "Prêt à commencer ?"}</h2>
        <p>
          {dict.cta?.desc ||
            "Toutes nos formations sont disponibles en PDF, accessibles immédiatement après achat. Apprenez à votre rythme, où que vous soyez."}
        </p>
        <div className="cta-btns">
          <Link href={`/${lang}/boutique`} className="btn-primary">
            {dict.cta?.btn1 || "🛒 Voir la boutique"}
          </Link>
          <Link href={`/${lang}/contact`} className="btn-outline-white">
            {dict.cta?.btn2 || "Nous contacter"}
          </Link>
        </div>
      </section>
    </main>
  );
}