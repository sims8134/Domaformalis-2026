import Link from "next/link";
import Image from "next/image";
import { PARCOURS } from "@/app/lib/parcours";
import { getAllArticles } from "@/app/lib/articles";

/**
 * Section catalogue de l'Accueil — remplace l'ancien catalogue à onglets.
 * Composant serveur : compteurs et vignettes calculés depuis le vrai contenu.
 * Signature visuelle : chaque parcours est une « pile » des vignettes de ses
 * leçons (métaphore bibliothèque), qui s'étale légèrement au survol.
 */

const T: Record<string, Record<string, string>> = {
  tag: { fr: "🎓 Nos formations", en: "🎓 Our courses", es: "🎓 Nuestras formaciones", bg: "🎓 Нашите обучения" },
  title: {
    fr: "Trois parcours, deux langues — tout est gratuit",
    en: "Three tracks, two languages — all free",
    es: "Tres itinerarios, dos idiomas — todo gratis",
    bg: "Три пътеки, два езика — всичко е безплатно",
  },
  desc: {
    fr: "Des leçons courtes et concrètes, chacune avec sa fiche pratique à imprimer. Sans inscription.",
    en: "Short, practical lessons, each with a printable cheat sheet. No sign-up.",
    es: "Lecciones cortas y concretas, cada una con su ficha práctica imprimible. Sin registro.",
    bg: "Кратки и практични уроци, всеки с карта за печат. Без регистрация.",
  },
  lesson: { fr: "leçon", en: "lesson", es: "lección", bg: "урок" },
  lessons: { fr: "leçons", en: "lessons", es: "lecciones", bg: "урока" },
  sheets: { fr: "fiches PDF", en: "PDF sheets", es: "fichas PDF", bg: "PDF карти" },
  open: { fr: "Découvrir le parcours", en: "Explore the track", es: "Descubrir el itinerario", bg: "Разгледай пътеката" },
  free: { fr: "Gratuit", en: "Free", es: "Gratis", bg: "Безплатно" },
  langTitle: { fr: "Cours de langues", en: "Language courses", es: "Cursos de idiomas", bg: "Езикови курсове" },
  esName: { fr: "Espagnol", en: "Spanish", es: "Español", bg: "Испански" },
  frName: { fr: "Français", en: "French", es: "Francés", bg: "Френски" },
  esPromise: {
    fr: "Lire et se présenter — leçon complète avec exercices corrigés.",
    en: "Read and introduce yourself — full lesson with answer keys.",
    es: "Leer y presentarse — lección completa con ejercicios corregidos.",
    bg: "Четене и представяне — пълен урок с упражнения и отговори.",
  },
  frPromise: {
    fr: "Du premier mot au conditionnel, en quatre leçons.",
    en: "From your first word to the conditional, in four lessons.",
    es: "De la primera palabra al condicional, en cuatro lecciones.",
    bg: "От първата дума до условното наклонение, в четири урока.",
  },
  all: { fr: "Voir toutes les formations", en: "See all courses", es: "Ver todas las formaciones", bg: "Виж всички обучения" },
};
const t = (k: string, l: string) => T[k][l] ?? T[k].fr;

export default function HomeCatalogue({ lang }: { lang: string }) {
  const all = getAllArticles(lang);

  const parcours = PARCOURS.map((p) => {
    const i = p.i18n[lang] ?? p.i18n.fr;
    const articles = all.filter((a) => a.category === p.category);
    return {
      slug: p.slug,
      icon: p.icon,
      color: p.color,
      name: i.name,
      promise: i.promise,
      count: articles.length,
      sheets: articles.filter((a) => a.fiche).length,
      covers: articles.slice(0, 3).map((a) => ({ src: a.image || "/img/og-default.jpg", title: a.title })),
    };
  });

  const langues = [
    { id: "es", href: `/${lang}/langues/espagnol`, flag: "/img/128px-Flag_of_Spain.png", color: "#0097b2", lessons: 1, sheets: 3 },
    { id: "fr", href: `/${lang}/langues/francais`, flag: "/img/128px-Flag_of_France.png", color: "#006b80", lessons: 4, sheets: 14 },
  ];

  return (
    <section className="home-cat">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t("tag", lang)}</span>
          <h2>{t("title", lang)}</h2>
          <p>{t("desc", lang)}</p>
        </div>

        {/* --- Les 3 parcours : pile de vignettes des vraies leçons --- */}
        <div className="home-parcours-grid">
          {parcours.map((p) => (
            <Link key={p.slug} href={`/${lang}/formations/${p.slug}`} className="home-parcours-card">
              <div className="hp-stack" aria-hidden="true">
                {p.covers[2] && (
                  <Image className="hp-img hp-img-3" src={p.covers[2].src} alt="" width={600} height={338} sizes="380px" />
                )}
                {p.covers[1] && (
                  <Image className="hp-img hp-img-2" src={p.covers[1].src} alt="" width={600} height={338} sizes="380px" />
                )}
                {p.covers[0] && (
                  <Image className="hp-img hp-img-1" src={p.covers[0].src} alt="" width={600} height={338} sizes="380px" />
                )}
                <span className="hp-icon" style={{ background: p.color }}>{p.icon}</span>
              </div>

              <div className="hp-body">
                <h3>{p.name}</h3>
                <p>{p.promise}</p>
                <div className="hp-meta">
                  <span>{p.count} {p.count === 1 ? t("lesson", lang) : t("lessons", lang)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{p.sheets} {t("sheets", lang)}</span>
                  <span className="hp-free">✓ {t("free", lang)}</span>
                </div>
                <span className="hp-cta">{t("open", lang)} →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* --- Les 2 cours de langues --- */}
        <h3 className="home-lang-title">{t("langTitle", lang)}</h3>
        <div className="home-lang-grid">
          {langues.map((l) => (
            <Link key={l.id} href={l.href} className="home-lang-card">
              <span className="hl-flag" style={{ background: l.color }} aria-hidden="true">
                <img src={l.flag} alt="" />
              </span>
              <div className="hl-body">
                <strong>{t(`${l.id}Name`, lang)}</strong>
                <p>{t(`${l.id}Promise`, lang)}</p>
                <span className="hl-meta">
                  {l.lessons} {l.lessons === 1 ? t("lesson", lang) : t("lessons", lang)} · {l.sheets} {t("sheets", lang)} · ✓ {t("free", lang)}
                </span>
              </div>
              <span className="hl-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>

        <div className="home-cat-more">
          <Link href={`/${lang}/formations`} className="btn-primary">
            📚 {t("all", lang)}
          </Link>
        </div>
      </div>
    </section>
  );
}
