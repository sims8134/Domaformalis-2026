import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllArticles } from "@/app/lib/articles";
import { PARCOURS, getParcours } from "@/app/lib/parcours";
import { BASE_URL, LOCALES, buildAlternates } from "@/app/lib/seo";


const T: Record<string, Record<string, string>> = {
  tag: { fr: "🎓 Parcours", en: "🎓 Track", es: "🎓 Itinerario", bg: "🎓 Пътека" },
  forWho: { fr: "Pour qui ?", en: "Who is it for?", es: "¿Para quién?", bg: "За кого?" },
  goals: {
    fr: "À la fin de ce parcours, vous saurez",
    en: "By the end of this track, you will be able to",
    es: "Al final de este itinerario, sabrás",
    bg: "В края на тази пътека ще можете",
  },
  program: { fr: "Le programme", en: "The programme", es: "El programa", bg: "Програмата" },
  read: { fr: "Lire", en: "Read", es: "Leer", bg: "Четете" },
  sheet: { fr: "Fiche PDF", en: "PDF sheet", es: "Ficha PDF", bg: "PDF карта" },
  free: { fr: "Gratuit et sans inscription", en: "Free, no sign-up", es: "Gratis y sin registro", bg: "Безплатно, без регистрация" },
  guideTitle: { fr: "Le guide complet", en: "The full guide", es: "La guía completa", bg: "Пълният наръчник" },
  guideDesc: {
    fr: "Tous les articles de ce parcours réunis dans un guide PDF illustré, à lire hors ligne ou à imprimer. Gratuit, envoyé par e-mail.",
    en: "Every article of this track gathered in one illustrated PDF guide, to read offline or print. Free, sent by email.",
    es: "Todos los artículos de este itinerario en una guía PDF ilustrada, para leer sin conexión o imprimir. Gratis, enviada por correo.",
    bg: "Всички статии от пътеката в един илюстриран PDF наръчник — офлайн или за печат. Безплатно, изпратен по имейл.",
  },
  guideCta: { fr: "Recevoir le guide", en: "Get the guide", es: "Recibir la guía", bg: "Получи наръчника" },
  guideSoon: {
    fr: "Guide en préparation — inscrivez-vous pour être prévenu à sa sortie.",
    en: "Guide in progress — sign up to be notified when it's out.",
    es: "Guía en preparación — inscríbete para avisarte cuando salga.",
    bg: "Наръчникът се подготвя — запишете се за известие.",
  },
  pages: { fr: "pages", en: "pages", es: "páginas", bg: "страници" },
  other: { fr: "Les autres parcours", en: "Other tracks", es: "Otros itinerarios", bg: "Другите пътеки" },
};
const t = (k: string, l: string) => T[k][l] ?? T[k].fr;

export async function generateStaticParams() {
  return LOCALES.flatMap((lang) => PARCOURS.map((p) => ({ lang, parcours: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; parcours: string }>;
}): Promise<Metadata> {
  const { lang, parcours } = await params;
  const p = getParcours(parcours);
  if (!p) return {};
  const i = p.i18n[lang] ?? p.i18n.fr;
  const url = `${BASE_URL}/${lang}/formations/${parcours}`;

  return {
    title: `${i.name} — Parcours de formation gratuit | Domaformalis`,
    description: i.promise,
    alternates: buildAlternates(lang, `/formations/${parcours}`),
    openGraph: {
      title: `${i.name} | Domaformalis`,
      description: i.promise,
      url,
      siteName: "Domaformalis",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      type: "website",
    },
  };
}

export default async function ParcoursPage({
  params,
}: {
  params: Promise<{ lang: string; parcours: string }>;
}) {
  const { lang, parcours } = await params;
  const p = getParcours(parcours);
  if (!p) notFound();

  const i = p.i18n[lang] ?? p.i18n.fr;
  const articles = getAllArticles(lang).filter((a) => a.category === p.category);
  const others = PARCOURS.filter((x) => x.slug !== p.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: i.name,
    description: i.promise,
    inLanguage: lang,
    isAccessibleForFree: true,
    provider: { "@type": "Organization", name: "Domaformalis", url: BASE_URL },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${articles.length * 15}M`,
    },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="hero-tag">{t("tag", lang)}</span>
          <h1>
            {p.icon} <span>{i.name}</span>
          </h1>
          <p>{i.promise}</p>
          <span className="parcours-free">✓ {t("free", lang)}</span>
        </div>
      </section>

      <section className="parcours-intro">
        <div className="parcours-inner">
          <div className="parcours-box">
            <h2>{t("forWho", lang)}</h2>
            <p>{i.forWho}</p>
          </div>
          <div className="parcours-box">
            <h2>{t("goals", lang)}</h2>
            <ul>
              {i.goals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="parcours-program">
        <div className="parcours-inner">
          <h2 className="articles-cat-title">{t("program", lang)}</h2>

          <ol className="parcours-steps">
            {articles.map((a, n) => (
              <li key={a.slug}>
                <span className="parcours-step-num">{n + 1}</span>

                <div className="parcours-step-img">
                  <Link href={`/${lang}/articles/${a.slug}`}>
                    <Image
                      src={a.image || "/img/og-default.jpg"}
                      alt={a.title}
                      width={1200}
                      height={630}
                      sizes="220px"
                    />
                  </Link>
                </div>

                <div className="parcours-step-body">
                  <h3>
                    <Link href={`/${lang}/articles/${a.slug}`}>{a.title}</Link>
                  </h3>
                  <p>{a.description}</p>
                  <div className="parcours-step-links">
                    <Link href={`/${lang}/articles/${a.slug}`} className="article-card-link">
                      {t("read", lang)} →
                    </Link>
                    {a.fiche && (
                      <a href={a.fiche} download className="article-card-link">
                        📄 {t("sheet", lang)}
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="parcours-guide">
        <div className="parcours-inner parcours-guide-inner">
          <div>
            <h2>📘 {t("guideTitle", lang)}</h2>
            <p>{p.guide ? t("guideDesc", lang) : t("guideSoon", lang)}</p>
            {p.guide && (
              <span className="parcours-guide-meta">
                PDF · {p.guide.pages} {t("pages", lang)}
              </span>
            )}
          </div>
          <Link href={`/${lang}/membres?guide=${p.slug}`} className="btn-primary">
            {t("guideCta", lang)}
          </Link>
        </div>
      </section>

      <section className="parcours-others">
        <div className="parcours-inner">
          <h2 className="articles-cat-title">{t("other", lang)}</h2>
          <div className="parcours-others-grid">
            {others.map((o) => {
              const oi = o.i18n[lang] ?? o.i18n.fr;
              return (
                <Link key={o.slug} href={`/${lang}/formations/${o.slug}`} className="parcours-other-card">
                  <span className="parcours-other-icon">{o.icon}</span>
                  <strong>{oi.name}</strong>
                  <p>{oi.promise}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
