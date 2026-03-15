import Link from 'next/link';

export default function Hero({ dict, lang }: { dict?: any, lang: string }) {
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
            <Link href={`/${lang}/formations`} className="btn-primary">
              📚 {dict?.hero?.btn_formations || "Voir les formations"}
            </Link>
            <Link href={`/${lang}/contact`} className="btn-outline-white">
              {dict?.hero?.btn_contact || "Nous contacter"}
            </Link>
          </div>
        </div>

        {/* --- COLONNE DROITE : Les 3 cartes de langues --- */}
        <div className="home-hero-cards">
          
          {/* Carte Espagnol */}
          <div className="hero-lang-card">
            <img 
              src="/img/128px-Flag_of_Spain.png" 
              alt="Drapeau Espagnol" 
              className="hero-flag" 
            />
            <div className="hero-lang-info">
              <strong>{dict?.lang?.es?.name || "Espagnol"}</strong>
              <span>{dict?.hero?.levels_desc || "3 niveaux · Débutant → Avancé"}</span>
            </div>
            <span className="teacher-badge">Yasmine</span>
          </div>

          {/* Carte Français */}
          <div className="hero-lang-card">
            <img 
              src="/img/128px-Flag_of_France.png" 
              alt="Drapeau Français" 
              className="hero-flag" 
            />
            <div className="hero-lang-info">
              <strong>{dict?.lang?.fr?.name || "Français"}</strong>
              <span>{dict?.hero?.levels_desc || "3 niveaux · Débutant → Avancé"}</span>
            </div>
            <span className="teacher-badge">Yasmine</span>
          </div>

          {/* Carte Bulgare */}
          <div className="hero-lang-card">
            <img 
              src="/img/128px-Flag_of_Bulgaria.png" 
              alt="Drapeau Bulgare" 
              className="hero-flag" 
            />
            <div className="hero-lang-info">
              <strong>{dict?.lang?.bg?.name || "Bulgare"}</strong>
              <span>{dict?.hero?.levels_desc || "3 niveaux · Débutant → Avancé"}</span>
            </div>
            <span className="teacher-badge">Yasmine</span>
          </div>

        </div>
      </div>
    </section>
  );
}