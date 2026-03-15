import React from 'react';

export default function RessourcesLinks({ dict }: { dict: any }) {
  // Liste des catégories de liens
  const categories = [
    { id: 'info', icon: '💻', title: dict?.liens?.info?.title || "Informatique & Bureautique" },
    { id: 'langues', icon: '🌍', title: dict?.liens?.langues?.title || "Langues" },
    { id: 'multimedia', icon: '🎬', title: dict?.liens?.multimedia?.title || "Multimédia" },
    { id: 'autres', icon: '💡', title: dict?.liens?.autres?.title || "Autres ressources" },
  ];

  return (
    <section className="liens-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{dict?.res?.liens?.tag || "🔗 Liens utiles"}</span>
          <h2>{dict?.res?.liens?.title || "Sites et outils recommandés"}</h2>
          <p>{dict?.res?.liens?.desc || "Une sélection de ressources en ligne pour compléter votre apprentissage."}</p>
        </div>

        <div className="liens-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="liens-bloc">
              <div className="liens-bloc-header">
                <span className="liens-bloc-icon">{cat.icon}</span>
                <h3>{cat.title}</h3>
              </div>
              
              {/* Items en attente (Placeholders comme dans ton HTML) */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="lien-item lien-item-placeholder">
                  <div className="lien-dot"></div>
                  <div className="lien-info">
                    <strong>{dict?.liens?.placeholder?.name || "Lien à venir"}</strong>
                    <span>{dict?.liens?.placeholder?.desc || "Description du site ou de la ressource"}</span>
                  </div>
                  <span className="lien-arrow">→</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}