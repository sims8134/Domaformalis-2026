import React from 'react';

export default function RessourcesTips({ dict }: { dict: any }) {
  const conseils = [
    {
      num: '01',
      title: dict?.conseil?.[1]?.title || "Pratiquez régulièrement",
      desc: dict?.conseil?.[1]?.desc || "15 minutes par jour valent mieux que 2 heures le week-end. La régularité est la clé de la mémorisation durable."
    },
    {
      num: '02',
      title: dict?.conseil?.[2]?.title || "Prenez des notes",
      desc: dict?.conseil?.[2]?.desc || "Notez les points importants à la main — cela renforce la mémorisation bien plus qu'une simple lecture."
    },
    {
      num: '03',
      title: dict?.conseil?.[3]?.title || "Révisez avec les fiches",
      desc: dict?.conseil?.[3]?.desc || "Gardez nos fiches de rappel à portée de main et relisez-les régulièrement pour ancrer les notions essentielles."
    }
  ];

  return (
    <section className="conseil-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{dict?.res?.conseils?.tag || "💡 Conseils pratiques"}</span>
          <h2>{dict?.res?.conseils?.title || "Apprenez mieux, apprenez plus"}</h2>
          <p>{dict?.res?.conseils?.desc || "Quelques habitudes simples pour tirer le meilleur de vos formations."}</p>
        </div>
        
        <div className="conseil-grid">
          {conseils.map((item, index) => (
            <div key={index} className="conseil-card">
              <div className="conseil-num">{item.num}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}