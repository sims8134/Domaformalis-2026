import Link from 'next/link';
import { PARCOURS } from '@/app/lib/parcours';
import { getAllArticles } from '@/app/lib/articles';

const T: Record<string, Record<string, string>> = {
  available: { fr: "Disponible", en: "Available", es: "Disponible", bg: "Достъпно" },
  articles: { fr: "articles", en: "articles", es: "artículos", bg: "статии" },
  sheets: { fr: "fiches PDF", en: "PDF sheets", es: "fichas PDF", bg: "PDF карти" },
  free: { fr: "Gratuit", en: "Free", es: "Gratis", bg: "Безплатно" },
  btnFree: {
    fr: "Commencer gratuitement",
    en: "Start for free",
    es: "Empezar gratis",
    bg: "Започни безплатно",
  },
};
const t = (k: string, l: string) => T[k][l] ?? T[k].fr;

export default function Hero({ dict, lang }: { dict?: any, lang: string }) {
  const all = getAllArticles(lang);

  return (
    <section className="home-hero">
      <div className="home-hero-container">

        {/* --- COLONNE GAUCHE : Textes et Boutons --- */}
        <div className="home-hero-text">
          <span className="hero-surtitle">
            {dict?.hero?.surtitle || "BIENVENUE SUR DOMAFORMALIS.COM"}
          </span>
          <h1>
            {dict?.hero?.title || "La formation facile pour tous et partout !"}
          </h1>
          <p>
            {dict?.hero?.desc || "Des formations en langues, bureautique et numérique — accessibles, claires et adaptées à tous les niveaux."}
          </p>

          <div className="home-hero-btns">
            <Link href={`/${lang}/articles`} className="btn-primary">
              📖 {dict?.hero?.btn_free || t("btnFree", lang)}
            </Link>
            <Link href={`/${lang}/formations`} className="btn-outline-white">
              {dict?.hero?.btn_formations || "Voir les formations"}
            </Link>
          </div>
        </div>

        {/* --- COLONNE DROITE : les 3 parcours accessibles immédiatement --- */}
        <div className="home-hero-cards">
          {PARCOURS.map((parc) => {
            const i18n = parc.i18n[lang] ?? parc.i18n.fr;
            const count = all.filter((a) => a.category === parc.category).length;
            if (count === 0) return null;

            return (
              <Link
                key={parc.slug}
                href={`/${lang}/formations/${parc.slug}`}
                className="hero-lang-card hero-parcours-card"
              >
                <span className="hero-parcours-icon" style={{ background: parc.color }}>
                  {parc.icon}
                </span>
                <div className="hero-lang-info">
                  <strong>{i18n.name}</strong>
                  <span>{count} {t("articles", lang)} · {count} {t("sheets", lang)}</span>
                </div>
                <span className="teacher-badge hero-free-badge">{t("free", lang)}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
