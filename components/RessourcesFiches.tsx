import Link from 'next/link';
import { PARCOURS } from '@/app/lib/parcours';
import { getAllArticles } from '@/app/lib/articles';

/**
 * Composant serveur : liste les VRAIES fiches PDF (public/fiches/) en
 * réutilisant la même source de données que le catalogue — chaque article
 * porte sa fiche, groupée par parcours. Plus aucun placeholder.
 */
export default function RessourcesFiches({ dict, lang }: { dict: any; lang: string }) {
  const P = (k: string) => {
    const T: Record<string, Record<string, string>> = {
      dl: { fr: "Télécharger", en: "Download", es: "Descargar", bg: "Изтегли" },
      badge: { fr: "1 page · PDF", en: "1 page · PDF", es: "1 página · PDF", bg: "1 стр. · PDF" },
      langTitle: { fr: "Fiches de langues", en: "Language sheets", es: "Fichas de idiomas", bg: "Езикови карти" },
      langDesc: {
        fr: "Les fiches d'espagnol et de français sont sur leurs pages de parcours, avec le choix de la langue des explications.",
        en: "Spanish and French sheets live on their track pages, with a choice of explanation language.",
        es: "Las fichas de español y francés están en sus páginas de itinerario, con elección del idioma de las explicaciones.",
        bg: "Картите по испански и френски са на страниците на пътеките, с избор на език на обясненията.",
      },
      open: { fr: "Voir les fiches", en: "See the sheets", es: "Ver las fichas", bg: "Виж картите" },
      sheets: { fr: "fiches", en: "sheets", es: "fichas", bg: "карти" },
      es: { fr: "Espagnol", en: "Spanish", es: "Español", bg: "Испански" },
      fr: { fr: "Français", en: "French", es: "Francés", bg: "Френски" },
    };
    return T[k]?.[lang] ?? T[k]?.fr ?? k;
  };

  const all = getAllArticles(lang);

  // Un groupe par parcours : uniquement les articles qui ont une fiche PDF.
  const groupes = PARCOURS.map((parc) => {
    const i18n = parc.i18n[lang] ?? parc.i18n.fr;
    return {
      slug: parc.slug,
      icon: parc.icon,
      color: parc.color,
      name: i18n.name,
      fiches: all
        .filter((a) => a.category === parc.category && a.fiche)
        .map((a) => ({ slug: a.slug, title: a.title, fiche: a.fiche as string })),
    };
  }).filter((g) => g.fiches.length > 0);

  const langues = [
    { id: 'es', href: `/${lang}/langues/espagnol`, flag: '/img/128px-Flag_of_Spain.png', count: 3, color: '#0097b2' },
    { id: 'fr', href: `/${lang}/langues/francais`, flag: '/img/128px-Flag_of_France.png', count: 14, color: '#006b80' },
  ];

  return (
    <section className="ressources-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{dict?.res?.fiches?.tag || "📄 Fiches de rappel"}</span>
          <h2>{dict?.res?.fiches?.title || "Téléchargez nos fiches gratuites"}</h2>
          <p>{dict?.res?.fiches?.desc || "Des synthèses claires à garder sous la main pour réviser rapidement les points essentiels."}</p>
        </div>

        {groupes.map((g) => (
          <div key={g.slug} className="fiches-group">
            <h3 className="fiches-group-title">
              <span className="fiches-group-icon" style={{ background: g.color }} aria-hidden="true">{g.icon}</span>
              {g.name}
            </h3>

            <div className="fiches-grid">
              {g.fiches.map((f) => (
                <div key={f.slug} className="fiche-card">
                  <div className="fiche-top">
                    <h4>{f.title}</h4>
                  </div>
                  <div className="fiche-meta">
                    <span className="fiche-badge">{P('badge')}</span>
                    <a
                      href={f.fiche}
                      download
                      className="fiche-btn"
                      aria-label={`${P('dl')} — ${f.title} (PDF)`}
                    >
                      ⬇ {P('dl')}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Fiches de langues : on renvoie vers les pages de parcours,
            qui gèrent la langue d'enseignement (BG/ES/EN ≠ langue du site). */}
        <div className="fiches-group">
          <h3 className="fiches-group-title">
            <span className="fiches-group-icon" style={{ background: '#7ed957' }} aria-hidden="true">🌍</span>
            {P('langTitle')}
          </h3>
          <p className="fiches-group-desc">{P('langDesc')}</p>

          <div className="fiches-grid fiches-grid-langues">
            {langues.map((l) => (
              <Link key={l.id} href={l.href} className="fiche-card fiche-card-link">
                <div className="fiche-top">
                  <div className="fiche-icon" style={{ background: l.color }} aria-hidden="true">
                    <img src={l.flag} alt="" className="fiche-flag-img" />
                  </div>
                  <h4>{P(l.id)}</h4>
                </div>
                <div className="fiche-meta">
                  <span className="fiche-badge">{l.count} {P('sheets')} · PDF</span>
                  <span className="fiche-btn">{P('open')} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
