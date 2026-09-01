import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { getArticle, getSiblings, getAllParams, CATEGORY_LABELS, resolveSlugInLang, getArticlePathsByLang } from "@/app/lib/articles";
import { getDictionary } from "@/app/lib/get-dictionary";
import { BASE_URL, buildAlternates } from "@/app/lib/seo";



const T: Record<string, Record<string, string>> = {
  back: { fr: "Tous les articles", en: "All articles", es: "Todos los artículos", bg: "Всички статии" },
  fiche: {
    fr: "Télécharger la fiche pratique (PDF)",
    en: "Download the cheat sheet (PDF)",
    es: "Descargar la ficha práctica (PDF)",
    bg: "Изтегли практическата карта (PDF)",
  },
  prev: { fr: "Précédent", en: "Previous", es: "Anterior", bg: "Предишна" },
  next: { fr: "Suivant", en: "Next", es: "Siguiente", bg: "Следваща" },
  serie: { fr: "Dans ce parcours", en: "In this track", es: "En este itinerario", bg: "В тази пътека" },
};
const t = (k: string, lang: string) => T[k][lang] ?? T[k].fr;

export async function generateStaticParams() {
  return getAllParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const a = await getArticle(lang, slug);
  if (!a) return {};

  const url = `${BASE_URL}/${lang}/articles/${slug}`;

  // Version 1200x630 dédiée au partage (dossier /og/), avec repli sur
  // l'image générique du site si un article n'a pas de cover.
  const ogImage = a.image
    ? a.image.replace("/img/articles/", "/img/articles/og/")
    : "/og-image.png";

  return {
    title: `${a.title} | Domaformalis`,
    description: a.description,
    keywords: a.tags,
    alternates: buildAlternates(lang, `/articles/${slug}`, getArticlePathsByLang(slug)),
    openGraph: {
      type: "article",
      title: a.title,
      description: a.description,
      url,
      siteName: "Domaformalis",
      publishedTime: a.date,
      images: [{ url: ogImage, width: 1200, height: 630, alt: a.title }],
      locale: lang === "fr" ? "fr_FR" : lang === "en" ? "en_US" : lang,
    },
    twitter: {
      card: "summary_large_image",
      site: "@domaformalis",
      title: a.title,
      description: a.description,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const article = await getArticle(lang, slug);
 if (!article) {
    const alt = resolveSlugInLang(lang, slug);
    if (alt) redirect(`/${lang}/articles/${alt}`);
    notFound();
  }

  const dict = await getDictionary(lang);
  const { prev, next, serie } = getSiblings(lang, slug);
  const catLabel = CATEGORY_LABELS[article.category]?.[lang] ?? "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: `${BASE_URL}${article.image}`,
    datePublished: article.date,
    inLanguage: lang,
    author: { "@type": "Organization", name: "Domaformalis", url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: "Domaformalis",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/img/logo_domaformalis.png` },
    },
    mainEntityOfPage: `${BASE_URL}/${lang}/articles/${slug}`,
  };

  return (
    <main>
      <div className="reading-progress" aria-hidden="true" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="article-page">
        <div className="article-head">
          <Link href={`/${lang}/articles`} className="article-back">
            ← {t("back", lang)}
          </Link>
          <span className="article-cat">{catLabel}</span>
          <h1>{article.title}</h1>
          <p className="article-lead">{article.description}</p>
        </div>

        {article.image && (
          <div className="article-cover">
            <Image
              src={article.image}
              alt={article.title}
              width={1200}
              height={630}
              priority
              sizes="(max-width: 900px) 100vw, 900px"
            />
            {article.imageCredit && <span>{article.imageCredit}</span>}
          </div>
        )}

        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        {article.fiche && (
          <p className="article-fiche">
            <a href={article.fiche} download className="btn-primary">
              📄 {t("fiche", lang)}
            </a>
          </p>
        )}

        {serie.length > 1 && (
          <nav className="article-serie">
            <h2>{t("serie", lang)}</h2>
            <ol>
              {serie.map((s) => (
                <li key={s.slug} className={s.slug === slug ? "is-current" : ""}>
                  {s.slug === slug ? (
                    <span>{s.title}</span>
                  ) : (
                    <Link href={`/${lang}/articles/${s.slug}`}>{s.title}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <nav className="article-nav">
          {prev ? (
            <Link href={`/${lang}/articles/${prev.slug}`} className="article-nav-prev">
              ← {t("prev", lang)}
              <strong>{prev.title}</strong>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/${lang}/articles/${next.slug}`} className="article-nav-next">
              {t("next", lang)} →<strong>{next.title}</strong>
            </Link>
          )}
        </nav>
      </article>

      <section className="cta-banner">
        <h2>{dict?.cta?.title || "Prêt à aller plus loin ?"}</h2>
        <p>{dict?.cta?.desc || "Découvrez toutes nos formations."}</p>
        <div className="cta-btns">
          <Link href={`/${lang}/formations`} className="btn-primary">
            {dict?.cta?.btn1 || "📚 Voir les formations"}
          </Link>
          <Link href={`/${lang}/membres`} className="btn-outline-white">
            📘 Espace membres
          </Link>
        </div>
      </section>
    </main>
  );
}