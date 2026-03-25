import type { Metadata } from "next";
import { getDictionary } from "@/app/lib/get-dictionary";
import RessourcesFiches from "@/components/RessourcesFiches";
import RessourcesLinks from "@/components/RessourcesLinks";
import RessourcesTips from "@/components/RessourcesTips";
import Link from "next/link";

// FIX : Cohérence avec le layout (pas de www)
const BASE_URL = "https://domaformalis.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const title = dict?.seo?.resources?.title || "Ressources Gratuites & Fiches Pratiques | Domaformalis";
  const description = dict?.seo?.resources?.description || "Accédez à nos ressources gratuites : fiches de rappel, liens utiles et conseils pratiques pour progresser en informatique, langues et IA.";

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/ressources`,
      languages: {
        fr: `${BASE_URL}/fr/ressources`,
        en: `${BASE_URL}/en/ressources`,
        es: `${BASE_URL}/es/ressources`,
        bg: `${BASE_URL}/bg/ressources`,
        "x-default": `${BASE_URL}/fr/ressources`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/ressources`,
      siteName: "Domaformalis",
      images: [{ url: "/og-image.png" }],
      locale: lang === "fr" ? "fr_FR" : lang === "en" ? "en_US" : lang,
      type: "website",
    },
  };
}

export default async function RessourcesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="hero-tag">
            {dict?.res?.hero?.tag || "📚 Ressources gratuites"}
          </span>

          <h1
            dangerouslySetInnerHTML={{
              __html:
                dict?.res?.hero?.title ||
                "Vos <span>ressources</span> en ligne",
            }}
          />

          <p>
            {dict?.res?.hero?.desc ||
              "Fiches de rappel, liens utiles et conseils pratiques — tout ce qu'il vous faut pour progresser entre les formations."}
          </p>
        </div>
      </section>

      <RessourcesFiches dict={dict} />
      <RessourcesLinks dict={dict} />
      <RessourcesTips dict={dict} />

      {/* CTA */}
      <section className="cta-banner">
        <h2>{dict?.cta?.title || "Prêt à aller plus loin ?"}</h2>

        <p>
          {dict?.cta?.desc ||
            "Découvrez toutes nos formations ou contactez-nous pour un accompagnement personnalisé."}
        </p>

        <div className="cta-btns">
          <Link href={`/${lang}/formations`} className="btn-primary">
            {dict?.cta?.btn1 || "📚 Voir les formations"}
          </Link>

          <Link href={`/${lang}/contact`} className="btn-outline-white">
            {dict?.cta?.btn2 || "Nous contacter"}
          </Link>
        </div>
      </section>
    </main>
  );
}