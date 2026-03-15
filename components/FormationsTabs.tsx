'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function FormationsTabs({ dict }: { dict: any }) {
  const [activeTab, setActiveTab] = useState('langues');

  // On ajoute le Bulgare et l'Anglais à la suite
  const fallbacks = {
    tabs: {
      langues: "🌍 Langues",
      informatique: "💻 Informatique",
      multimedia: "🎬 Multimédia",
      ia: "🤖 IA",
      reseaux: "📱 Réseaux Sociaux"
    },
    langues: [
      {
        id: 'fr', flagSrc: '/img/128px-Flag_of_France.png', name: 'Français',
        levels: [
          { id: 'debutant', badge: 'Débutant', title: 'Français A1-A2', desc: "Bases de la langue, grammaire et vocabulaire de tous les jours." },
          { id: 'intermediaire', badge: 'Intermédiaire', title: 'Français B1-B2', desc: "Communication fluide, structures complexes et nuances." },
          { id: 'avance', badge: 'Avancé', title: 'Français C1-C2', desc: "Perfectionnement, culture littéraire et milieu professionnel." }
        ]
      },
      {
        id: 'es', flagSrc: '/img/128px-Flag_of_Spain.png', name: 'Espagnol',
        levels: [
          { id: 'debutant', badge: 'Débutant', title: 'Espagnol A1-A2', desc: "Alphabet, salutations et phrases de base pour voyager." },
          { id: 'intermediaire', badge: 'Intermédiaire', title: 'Espagnol B1-B2', desc: "Conjugaison, conversation y compréhension orale." },
          { id: 'avance', badge: 'Avancé', title: 'Espagnol C1-C2', desc: "Maîtrise totale, expressions idiomatiques et aisance." }
        ]
      },
      {
        id: 'bg', flagSrc: '/img/128px-Flag_of_Bulgaria.png', name: 'Bulgare',
        levels: [
          { id: 'debutant', badge: 'Débutant', title: 'Bulgare A1-A2', desc: "Alphabet cyrillique, salutations et expressions de base." },
          { id: 'intermediaire', badge: 'Intermédiaire', title: 'Bulgare B1-B2', desc: "Conjugaison, construction de phrases et vocabulaire étendu." },
          { id: 'avance', badge: 'Avancé', title: 'Bulgare C1-C2', desc: "Expression fluide, textes complexes et culture bulgare." }
        ]
      },
      {
        id: 'en', flagSrc: '/img/128px-Flag_of_the_United_Kingdom.png', name: 'Anglais',
        levels: [
          { id: 'debutant', badge: 'Débutant', title: 'Anglais A1-A2', desc: "Bases de la langue, vocabulaire du quotidien et grammaire essentielle." },
          { id: 'intermediaire', badge: 'Intermédiaire', title: 'Anglais B1-B2', desc: "Approfondissement grammatical, compréhension orale et expression écrite." },
          { id: 'avance', badge: 'Avancé', title: 'Anglais C1-C2', desc: "Maîtrise avancée, idiomes, nuances et communication professionnelle." }
        ]
      }
    ]
  };

  const ComingSoon = ({ title, desc, icon }: { title: string, desc: string, icon: string }) => (
    <div className="cat-panel active">
      <div className="coming-banner">
        <span className="coming-icon">{icon}</span>
        <h3>{title}</h3>
        <p>{desc}</p>
        <Link href={`/contact`} className="btn-primary">
          {dict?.ia?.btn || "Me prévenir à la sortie"}
        </Link>
      </div>
    </div>
  );

  return (
    <section className="catalogue-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{dict?.sec?.cat?.tag || "CATALOGUE"}</span>
          <h2>{dict?.sec?.cat?.title || "Nos formations"}</h2>
          <p>{dict?.sec?.cat?.desc || "Bureautique, langues, IA et réseaux sociaux — des supports clairs pour progresser à votre rythme."}</p>
        </div>

        {/* --- TABS NAVIGATION --- */}
        <div className="cat-tabs">
          {['langues', 'informatique', 'ia', 'reseaux', 'multimedia'].map((cat) => (
            <button 
              key={cat}
              className={`cat-tab ${activeTab === cat ? 'active' : ''}`} 
              onClick={() => setActiveTab(cat)}
            >
              {dict?.tab?.[cat] || fallbacks.tabs[cat as keyof typeof fallbacks.tabs]}
            </button>
          ))}
        </div>

        {/* ===== PANELS ===== */}
        
        {/* 1. LANGUES */}
        {activeTab === 'langues' && (
          <div className="cat-panel active">
            <div className="langue-grid">
              
              {fallbacks.langues.map((l) => (
                <div key={l.id} className="langue-bloc">
                  <div className="langue-header">
                    <span className="langue-flag" style={{ display: 'flex', alignItems: 'center' }}>
                      <img 
                        src={l.flagSrc} 
                        alt={`Drapeau ${l.name}`} 
                        style={{ width: '36px', height: 'auto', borderRadius: '4px', objectFit: 'cover' }} 
                      />
                    </span>
                    <h3>{dict?.lang?.[l.id]?.name || l.name}</h3>
                    <span className="langue-teacher">Yasmine</span>
                  </div>
                  
                  <div className="niveau-cards">
                    {l.levels.map((niv) => (
                      <div key={niv.id} className="niveau-card">
                        <span className={`niveau-badge ${niv.id}`}>
                          {dict?.niveau?.[niv.id] || niv.badge}
                        </span>
                        <div className="niveau-info">
                          <p style={{ margin: 0, fontSize: '1.4rem' }}>{dict?.lang?.[l.id]?.[niv.id]?.desc || niv.desc}</p>
                        </div>
                        <Link href={`/boutique`} className="niveau-btn">
                          {dict?.btn?.access || "Accéder →"}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            </div>
          </div>
        )}

        {/* 2. INFORMATIQUE */}
        {activeTab === 'informatique' && (
          <ComingSoon 
            title={dict?.form?.coming_title || "Formations Informatique — Bientôt disponibles"}
            desc={dict?.form?.coming_desc || "Word, Excel, PowerPoint et sécurité numérique... Arrivée imminente !"}
            icon="💻"
          />
        )}

        {/* 3. MULTIMÉDIA */}
        {activeTab === 'multimedia' && (
          <ComingSoon 
            title={dict?.multimedia?.coming_title || "Formations Multimédia — Bientôt disponibles"}
            desc={dict?.multimedia?.coming_desc || "Montage vidéo, MAO et retouche photo : apprenez à créer sans limites."}
            icon="🎬"
          />
        )}

        {/* 4. IA */}
        {activeTab === 'ia' && (
          <ComingSoon 
            title={dict?.ia?.title || "Formations IA — Bientôt disponibles"} 
            desc={dict?.ia?.desc || "Comprendre et utiliser l'intelligence artificielle au quotidien, ChatGPT, automatisation et bien plus encore."} 
            icon="🤖" 
          />
        )}

        {/* 5. RÉSEAUX SOCIAUX */}
        {activeTab === 'reseaux' && (
          <ComingSoon 
            title={dict?.reseaux?.title || "Formations Réseaux Sociaux — Bientôt disponibles"} 
            desc={dict?.reseaux?.desc || "Facebook, Instagram, LinkedIn... Apprenez à utiliser les réseaux sociaux sereinement et efficacement."} 
            icon="📱" 
          />
        )}

      </div>
    </section>
  );
}