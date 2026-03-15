import type { Metadata } from "next";
import { getDictionary } from "../lib/get-dictionary";
import FoundersCarousel from "../../components/FoundersCarousel";
import FormationsTabs from "../../components/FormationsTabs";
import ValuesSection from "../../components/ValuesSection";
import Hero from "../../components/Hero";
import Link from "next/link";

const BASE_URL = "https://www.domaformalis.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const title =
    dict?.seo?.home?.title || "Domaformalis | Multilingual learning platform";

  const description =
    dict?.seo?.home?.description ||
    "Courses and resources available in several languages.";

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${lang}`,
      languages: {
        fr: `${BASE_URL}/fr`,
        en: `${BASE_URL}/en`,
        es: `${BASE_URL}/es`,
        bg: `${BASE_URL}/bg`,
        "x-default": `${BASE_URL}/fr`,
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main>
      {/* HERO */}
      <Hero dict={dict} lang={lang} />

      {/* CATALOGUE DES FORMATIONS */}
      <FormationsTabs dict={dict} />

      {/* FONDATEURS */}
      <FoundersCarousel dict={dict} />

      {/* VALEURS */}
      <ValuesSection dict={dict} />

      {/* CTA FINAL */}
      <section className="cta-banner">
        <div className="container">
          <div
            className="cta-box"
            style={{ textAlign: "center", padding: "60px 20px" }}
          >
            <h2>{dict?.cta?.title || "Envie d'en savoir plus ?"}</h2>

            <p style={{ marginBottom: "30px", opacity: 0.8 }}>
              {dict?.cta?.desc ||
                "Découvrez nos formations ou contactez-nous directement."}
            </p>

            <div
              className="cta-btns"
              style={{
                display: "flex",
                gap: "15px",
                justifyContent: "center",
              }}
            >
              <Link href={`/${lang}/formations`} className="btn-primary">
                {dict?.cta?.btn1 || "📚 Voir les formations"}
              </Link>

              <Link href={`/${lang}/contact`} className="btn-outline-white">
                {dict?.cta?.btn2 || "Nous contacter"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}