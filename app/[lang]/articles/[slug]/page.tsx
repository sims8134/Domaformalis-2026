import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { getArticle, getSiblings, getAllParams, CATEGORY_LABELS, resolveSlugInLang, getArticlePathsByLang, getReadingMinutes } from "@/app/lib/articles";
import CopyLinkButton from "@/components/CopyLinkButton";
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
  readtime: {
    fr: "{n} min de lecture",
    en: "{n} min read",
    es: "{n} min de lectura",
    bg: "{n} мин четене",
  },
  toc: { fr: "Sommaire", en: "Contents", es: "Sumario", bg: "Съдържание" },
  tocAria: {
    fr: "Sommaire de l'article",
    en: "Article contents",
    es: "Sumario del artículo",
    bg: "Съдържание на статията",
  },
  share: {
    fr: "Partager cet article",
    en: "Share this article",
    es: "Compartir este artículo",
    bg: "Споделете статията",
  },
  copy: { fr: "Copier le lien", en: "Copy link", es: "Copiar el enlace", bg: "Копирай връзката" },
  copied: { fr: "Copié !", en: "Copied!", es: "¡Copiado!", bg: "Копирано!" },
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

  const minutes = getReadingMinutes(article.contentHtml);
  const shareUrl = `${BASE_URL}/${lang}/articles/${slug}`;
  const shareTitle = article.title;
  const u = encodeURIComponent(shareUrl);
  const ti = encodeURIComponent(shareTitle);

  // Uniquement des liens https : aucun SDK, aucun script tiers, aucun cookie.
  const shareLinks = [
    {
      key: "facebook",
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      path: "M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6A19 19 0 0 0 14.8 2.5C12.4 2.5 10.8 4 10.8 6.5v2H8.3V12h2.5v9h3.2v-9h2.5l.4-3.5H14z",
    },
    {
      key: "x",
      label: "X",
      href: `https://x.com/intent/tweet?url=${u}&text=${ti}`,
      path: "M17.3 3h3.3l-7.2 8.3L22 21h-6.6l-5.2-6.8L4.2 21H.9l7.7-8.8L.6 3h6.8l4.7 6.2L17.3 3zm-1.2 16h1.8L6.9 4.8H5l11.1 14.2z",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${u}&title=${ti}`,
      path: "M6.9 21H3.6V8.9h3.3V21zM5.2 7.4A1.9 1.9 0 1 1 5.2 3.6a1.9 1.9 0 0 1 0 3.8zM21 21h-3.3v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H10V8.9h3.2v1.7h.1a3.5 3.5 0 0 1 3.1-1.7c3.4 0 4.6 2.2 4.6 5.1V21z",
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`,
      path: "M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.4-.7-1.7-.8s-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5s0-.4-.1-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c2.1.8 2.1.6 2.5.5a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.2-.3-.2-.5-.3z",
    },
  ];

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
          <p className="article-readtime">
            {t("readtime", lang).replace("{n}", String(minutes))}
          </p>
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

        {article.toc.length > 1 && (
          <nav className="article-toc" aria-label={t("tocAria", lang)}>
            <details open>
              <summary>{t("toc", lang)}</summary>
              <ol>
                {article.toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ol>
            </details>
          </nav>
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

        <div className="article-share">
          <span className="article-share-title">{t("share", lang)}</span>
          <div className="article-share-btns">
            {shareLinks.map((sl) => (
              <a
                key={sl.key}
                className={`article-share-btn article-share-${sl.key}`}
                href={sl.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("share", lang)} — ${sl.label}`}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
                  <path d={sl.path} fill="currentColor" />
                </svg>
                <span>{sl.label}</span>
              </a>
            ))}
            <CopyLinkButton
              url={shareUrl}
              label={t("copy", lang)}
              copiedLabel={t("copied", lang)}
            />
          </div>
        </div>

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