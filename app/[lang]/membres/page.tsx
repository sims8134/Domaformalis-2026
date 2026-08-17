import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/app/lib/get-dictionary";
import GuideForm from "@/components/GuideForm";
import { PARCOURS } from "@/app/lib/parcours";

const BASE_URL = "https://domaformalis.com";

type PageProps = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ guide?: string }>;
};

const T: Record<string, Record<string, string>> = {
  badge: { fr: "📘 Guides gratuits", en: "📘 Free guides", es: "📘 Guías gratuitas", bg: "📘 Безплатни наръчници" },
  title: {
    fr: "Recevez nos guides complets",
    en: "Get our full guides",
    es: "Recibe nuestras guías completas",
    bg: "Получете нашите пълни наръчници",
  },
  subtitle: {
    fr: "Chaque parcours réuni dans un guide PDF illustré, à lire hors ligne ou à imprimer.",
    en: "Each track gathered in an illustrated PDF guide, to read offline or print.",
    es: "Cada itinerario en una guía PDF ilustrada, para leer sin conexión o imprimir.",
    bg: "Всяка пътека в илюстриран PDF наръчник — офлайн или за печат.",
  },
  desc: {
    fr: "Gratuit, sans engagement — une adresse e-mail suffit. Le guide arrive immédiatement dans votre boîte mail.",
    en: "Free, no strings attached — an email address is enough. The guide lands in your inbox right away.",
    es: "Gratis, sin compromiso — basta un correo. La guía llega de inmediato a tu bandeja.",
    bg: "Безплатно, без ангажимент — стига един имейл. Наръчникът пристига веднага.",
  },
  why: { fr: "Ce que vous recevez", en: "What you get", es: "Lo que recibes", bg: "Какво получавате" },
  b1: {
    fr: "Le guide PDF complet du parcours choisi, envoyé immédiatement",
    en: "The complete PDF guide of your chosen track, sent immediately",
    es: "La guía PDF completa del itinerario elegido, enviada de inmediato",
    bg: "Пълният PDF наръчник на избраната пътека, изпратен веднага",
  },
  b2: {
    fr: "Tous les articles du parcours, réunis et mis en page pour la lecture hors ligne",
    en: "Every article of the track, gathered and laid out for offline reading",
    es: "Todos los artículos del itinerario, reunidos y maquetados para leer sin conexión",
    bg: "Всички статии от пътеката, събрани и оформени за офлайн четене",
  },
  b3: {
    fr: "Aucune publicité, aucun partage de vos données, désinscription en un clic",
    en: "No ads, no data sharing, one-click unsubscribe",
    es: "Sin publicidad, sin compartir tus datos, baja con un clic",
    bg: "Без реклами, без споделяне на данни, отписване с един клик",
  },
  browse: { fr: "Lire les articles en ligne", en: "Read the articles online", es: "Leer los artículos en línea", bg: "Четете статиите онлайн" },
};
const t = (k: string, l: string) => T[k][l] ?? T[k].fr;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const title = `${t("title", lang)} | Domaformalis`;
  const description = t("subtitle", lang) + " " + t("desc", lang);

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

export default async function MembresPage({ params, searchParams }: PageProps) {
  const { lang } = await params;
  const { guide } = await searchParams;
  await getDictionary(lang); // conserve le chargement du dictionnaire (header/footer)

  const options = PARCOURS.map((p) => ({
    slug: p.slug,
    icon: p.icon,
    name: (p.i18n[lang] ?? p.i18n.fr).name,
    available: Boolean(p.guide),
  }));

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="hero-tag">{t("badge", lang)}</span>
          <h1>{t("title", lang)}</h1>
          <p>{t("subtitle", lang)}</p>
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-inner">
          <div className="guide-benefits">
            <h2>{t("why", lang)}</h2>
            <ul>
              <li>{t("b1", lang)}</li>
              <li>{t("b2", lang)}</li>
              <li>{t("b3", lang)}</li>
            </ul>
            <p className="guide-note">{t("desc", lang)}</p>
            <Link href={`/${lang}/articles`} className="article-card-link">
              {t("browse", lang)} →
            </Link>
          </div>

          <GuideForm lang={lang} options={options} preselected={guide ?? ""} />
        </div>
      </section>
    </main>
  );
}
