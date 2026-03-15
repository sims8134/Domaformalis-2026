export default function RessourcesFiches({ dict }: { dict: any }) {
  const fiches = [
    { id: 'word', icon: '📝', class: 'fiche-word' },
    { id: 'excel', icon: '📊', class: 'fiche-excel' },
    { id: 'ppt', icon: '📽️', class: 'fiche-ppt' },
    { id: 'es', icon: '🇪🇸', class: 'fiche-es' },
    { id: 'fr', icon: '🇫🇷', class: 'fiche-fr' },
    { id: 'secu', icon: '🔒', class: 'fiche-secu' },
  ];

  return (
    <section className="ressources-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{dict?.res?.fiches?.tag || "📄 Fiches de rappel"}</span>
          <h2>{dict?.res?.fiches?.title || "Téléchargez nos fiches gratuites"}</h2>
          <p>{dict?.res?.fiches?.desc || "Des synthèses claires à garder sous la main pour réviser rapidement les points essentiels."}</p>
        </div>

        <div className="fiches-grid">
          {fiches.map((f) => (
            <div key={f.id} className={`fiche-card ${f.class} placeholder-overlay`}>
              <div className="fiche-top">
                <div className="fiche-icon">{f.icon}</div>
                <h3>{dict?.fiche?.[f.id]?.title || `Fiche ${f.id}`}</h3>
              </div>
              <p>{dict?.fiche?.[f.id]?.desc || "Description de la fiche à venir."}</p>
              <div className="fiche-meta">
                <span className="fiche-badge">{dict?.fiche?.pages || "1 page · PDF"}</span>
                <button className="fiche-btn" disabled>
                  {dict?.fiche?.dl || "⬇ Télécharger"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}