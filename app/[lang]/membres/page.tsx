import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/app/lib/get-dictionary";

// FIX : Cohérence (pas de www)
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
  const page = dict?.Members?.MembresPage;

  const title = page?.seo?.title || page?.title || "Espace Membres | Domaformalis";
  const description = page?.seo?.description || page?.description || "Inscrivez-vous pour être informé du lancement de l'espace membres Domaformalis.";

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/membres`,
      languages: {
        fr: `${BASE_URL}/fr/membres`,
        en: `${BASE_URL}/en/membres`,
        es: `${BASE_URL}/es/membres`,
        bg: `${BASE_URL}/bg/membres`,
        "x-default": `${BASE_URL}/fr/membres`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/membres`,
      siteName: "Domaformalis",
      images: [{ url: "/og-image.png" }],
      locale: lang === "fr" ? "fr_FR" : lang === "en" ? "en_US" : lang,
      type: "website",
    },
  };
}

export default async function MembresPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const page = dict?.Members?.MembresPage;

  return (
    <main className="launch-page">
      <section className="launch-hero">
        <div className="launch-hero-content">
          <span className="launch-badge">✨ Domaformalis</span>

          <h1>{page?.title || "Be notified about the launch"}</h1>

          <p className="launch-subtitle">
            {page?.subtitle || "The Domaformalis member area will be available soon."}
          </p>

          <p className="launch-description">
            {page?.description ||
              "We are currently preparing the content, training courses and resources. Leave us a message via the contact page to be informed as soon as we launch."}
          </p>

          <div className="launch-actions">
            <Link href={`/${lang}/contact`} className="launch-btn-primary">
              {page?.cta || "Contact me"}
            </Link>

            <Link href={`/${lang}/formations`} className="launch-btn-secondary">
              {page?.secondaryCta || "Courses"}
            </Link>
          </div>

          <div className="launch-features">
            {(page?.features || []).map((feature: string) => (
              <span key={feature}>✓ {feature}</span>
            ))}
          </div>
        </div>

        <div className="launch-card">
          <div className="launch-card-inner">
            <span className="launch-card-tag">
              {page?.card?.tag || "Coming soon"}
            </span>

            <h2>{page?.card?.title || "Domaformalis"}</h2>

            <p>
              {page?.card?.description ||
                "A platform designed to help you learn easily, progress at your own pace and access useful content all in one place."}
            </p>

            <div className="launch-card-list">
              {(page?.card?.items || []).map((item: string) => (
                <div className="launch-card-item" key={item}>
                  <span className="dot" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}