import React from 'react';

export default function ValuesSection({ dict }: { dict?: any }) {
  // On pointe vers la section qui contient la liste "items"
  // Dans ton JSON bg.json, c'est dict.qsn.valeurs
  const data = dict?.qsn?.valeurs;

  if (!data) return null;

  return (
    <section className="values-section">
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">{data.tag}</span>
          <h2>{data.title}</h2>
        </div>

        <div className="values-grid">
          {/* On boucle sur le tableau items qui contient icône, titre et description */}
          {data.items?.map((v: { icon: string; title: string; desc: string }, i: number) => (
            <div key={i} className="value-card">
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}