import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/app/lib/get-dictionary";
import { getArticlesByCategory } from "@/app/lib/articles";
import { PARCOURS } from "@/app/lib/parcours";
import { BASE_URL, buildAlternates } from "@/app/lib/seo";


const T: Record<string, Record<string, string>> = {
  tag: { fr: "🎓 Formations", en: "🎓 Courses", es: "🎓 Formaciones", bg: "🎓 Обучения" },
  title: {
    fr: "Nos <span>formations</span> pratiques",
    en: "Our practical <span>courses</span>",
    es: "Nuestras <span>formaciones</span> prácticas",
    bg: "Нашите практични <span>обучения</span>",
  },
  desc: {
    fr: "Trois parcours pour maîtriser votre vie numérique — sécurité, réseaux sociaux, intelligence artificielle — et des cours de langues. Chaque leçon s'accompagne d'une fiche pratique à imprimer, tout est gratuit et sans inscription.",
    en: "Three tracks to master your digital life — security, social media, artificial intelligence — plus language courses. Every lesson comes with a printable cheat sheet, everything is free with no sign-up.",
    es: "Tres itinerarios para dominar tu vida digital — seguridad, redes sociales, inteligencia artificial — y cursos de idiomas. Cada lección incluye una ficha práctica imprimible, todo gratis y sin registro.",
    bg: "Три пътеки за овладяване на дигиталния ви живот — сигурност, социални мрежи, изкуствен интелект — плюс езикови курсове. Всеки урок идва с практическа карта за печат, всичко е безплатно и без регистрация.",
  },
  read: { fr: "Lire la leçon", en: "Read the lesson", es: "Leer la lección", bg: "Прочети урока" },
  viewTrack: { fr: "Voir le parcours complet", en: "View the full track", es: "Ver el itinerario completo", bg: "Виж цялата пътека" },
  langTitle: { fr: "Cours de langues", en: "Language courses", es: "Cursos de idiomas", bg: "Езикови курсове" },
  langDesc: {
    fr: "Leçons complètes et fiches PDF, avec les explications dans la langue de votre choix.",
    en: "Complete lessons and PDF sheets, with explanations in the language of your choice.",
    es: "Lecciones completas y fichas PDF, con explicaciones en el idioma que elijas.",
    bg: "Пълни уроци и PDF карти, с обяснения на избран от вас език.",
  },
  esName: { fr: "Espagnol", en: "Spanish", es: "Español", bg: "Испански" },
  esPromise: {
    fr: "Lire et se présenter en espagnol — leçon complète avec exercices corrigés.",
    en: "Read and introduce yourself in Spanish — a full lesson with answer keys.",
    es: "Leer y presentarse en español — lección completa con ejercicios corregidos.",
    bg: "Четене и представяне на испански — пълен урок с упражнения и отговори.",
  },
  frName: { fr: "Français", en: "French", es: "Francés", bg: "Френски" },
  frPromise: {
    fr: "Du premier mot au conditionnel — prononciation, passé composé, imparfait et systèmes avec SI.",
    en: "From your first word to the conditional — pronunciation, passé composé, imparfait and SI clauses.",
    es: "De la primera palabra al condicional — pronunciación, passé composé, imperfecto y frases con SI.",
    bg: "От първата дума до условното наклонение — произношение, passé composé, imparfait и изречения със SI.",
  },
  lesson: { fr: "leçon", en: "lesson", es: "lección", bg: "урок" },
  lessons: { fr: "leçons", en: "lessons", es: "lecciones", bg: "урока" },
  sheets: { fr: "fiches PDF", en: "PDF sheets", es: "fichas PDF", bg: "PDF карти" },
  open: { fr: "Découvrir le parcours", en: "Explore the track", es: "Descubrir el itinerario", bg: "Разгледай пътеката" },
  free: { fr: "Gratuit · sans inscription", en: "Free · no sign-up", es: "Gratis · sin registro", bg: "Безплатно · без регистрация" },
  seoTitle: {
    fr: "Formations — Sécurité, Réseaux sociaux, IA et Langues | Domaformalis",
    en: "Courses — Security, Social Media, AI and Languages | Domaformalis",
    es: "Formaciones — Seguridad, Redes sociales, IA e Idiomas | Domaformalis",
    bg: "Обучения — Сигурност, социални мрежи, ИИ и езици | Domaformalis",
  },
};

const t = (k: string, lang: string) => T[k][lang] ?? T[k].fr;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const title = t("seoTitle", lang);
  const description = t("desc", lang).replace(/<[^>]+>/g, "");

  return {
    title,
    description,
    alternates: buildAlternates(lang, "/formations"),
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/formations`,
      siteName: "Domaformalis",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      locale: lang === "fr" ? "fr_FR" : lang === "en" ? "en_US" : lang,
      type: "website",
    },
  };
}

export default async function FormationsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const groups = getArticlesByCategory(lang);

  const langues = [
    { id: "es", href: `/${lang}/langues/espagnol`, icon: "/img/128px-Flag_of_Spain.png", color: "#0097b2", lessons: 1, sheets: 3 },
    { id: "fr", href: `/${lang}/langues/francais`, icon: "/img/128px-Flag_of_France.png", color: "#006b80", lessons: 4, sheets: 14 },
  ];

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="hero-tag">{t("tag", lang)}</span>
          <h1 dangerouslySetInnerHTML={{ __html: t("title", lang) }} />
          <p>{t("desc", lang)}</p>
        </div>
      </section>

      {groups.map((g) => {
        // Le parcours correspondant à cette catégorie (pour le lien « parcours complet »)
        const parc = PARCOURS.find((p) => p.category === g.category);

        return (
          <section key={g.category} className="articles-section">
            <div className="articles-inner">
              <div className="articles-cat-head">
                <h2 className="articles-cat-title">{g.label}</h2>
                {parc && (
                  <Link
                    href={`/${lang}/formations/${parc.slug}`}
                    className="articles-cat-track"
                    aria-label={`${t("viewTrack", lang)} — ${g.label}`}
                  >
                    {t("viewTrack", lang)} →
                  </Link>
                )}
              </div>

              <div className="articles-grid">
                {g.articles.map((a, i) => (
                  <article key={a.slug} className="article-card">
                    <Link href={`/${lang}/articles/${a.slug}`} className="article-card-img">
                      <Image
                        src={a.image || "/img/og-default.jpg"}
                        alt={a.title}
                        width={1200}
                        height={630}
                        sizes="(max-width: 900px) 100vw, 380px"
                        priority={i === 0}
                      />
                      <span className="article-card-num">{i + 1}</span>
                    </Link>

                    <div className="article-card-body">
                      <h3>
                        <Link href={`/${lang}/articles/${a.slug}`}>{a.title}</Link>
                      </h3>
                      <p>{a.description}</p>
                      <Link href={`/${lang}/articles/${a.slug}`} className="article-card-link">
                        {t("read", lang)} →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* --- COURS DE LANGUES --- */}
      <section className="articles-section">
        <div className="articles-inner">
          <div className="articles-cat-head">
            <h2 className="articles-cat-title">{t("langTitle", lang)}</h2>
          </div>
          <p className="articles-cat-desc">{t("langDesc", lang)}</p>

          <div className="parcours-teasers-grid">
            {langues.map((l) => (
              <Link key={l.id} href={l.href} className="parcours-teaser">
                <span className="parcours-teaser-icon" style={{ background: l.color }} aria-hidden="true">
                  <img src={l.icon} alt="" className="teaser-flag-img" />
                </span>
                <h3>{t(`${l.id}Name`, lang)}</h3>
                <p>{t(`${l.id}Promise`, lang)}</p>
                <div className="parcours-teaser-meta">
                  <span>
                    {l.lessons} {l.lessons === 1 ? t("lesson", lang) : t("lessons", lang)}
                  </span>
                  <span>
                    {l.sheets} {t("sheets", lang)}
                  </span>
                </div>
                <span className="parcours-teaser-cta">{t("open", lang)} →</span>
                <span className="parcours-teaser-free">✓ {t("free", lang)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <h2>{dict?.cta?.title || "Prêt à aller plus loin ?"}</h2>
        <p>
          {dict?.cta?.desc ||
            "Découvrez toutes nos formations ou contactez-nous pour un accompagnement personnalisé."}
        </p>
        <div className="cta-btns">
          <Link href={`/${lang}/ressources`} className="btn-primary">
            📄 {dict?.res?.fiches?.tag?.replace(/^[^ ]+ /, "") || "Fiches de rappel"}
          </Link>
          <Link href={`/${lang}/contact`} className="btn-outline-white">
            {dict?.cta?.btn2 || "Nous contacter"}
          </Link>
        </div>
      </section>
    </main>
  );
}
