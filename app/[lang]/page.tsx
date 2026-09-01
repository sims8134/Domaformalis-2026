import type { Metadata } from "next";
import { getDictionary } from "../lib/get-dictionary";
import FoundersCarousel from "../../components/FoundersCarousel";
import HomeCatalogue from "../../components/HomeCatalogue";
import ValuesSection from "../../components/ValuesSection";
import Hero from "../../components/Hero";
import Link from "next/link";
import { BASE_URL, buildAlternates } from "@/app/lib/seo";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const title = dict?.seo?.home?.title || "Domaformalis | Plateforme de Formation Multilingue";
  const description = dict?.seo?.home?.description || "Cours et ressources disponibles en plusieurs langues : Informatique, IA, Langues et plus.";

  return {
    title,
    description,
    alternates: buildAlternates(lang, ""),
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}`,
      siteName: "Domaformalis",
      images: [{ url: "/og-image.png" }],
      locale: lang === "fr" ? "fr_FR" : lang === "en" ? "en_US" : lang,
      type: "website",
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

      {/* CATALOGUE — cartes parcours (pile de vignettes) + cours de langues */}
      <HomeCatalogue lang={lang} />

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
