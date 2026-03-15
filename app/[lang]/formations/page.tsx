import { getDictionary } from '@/app/lib/get-dictionary';
import FormationsCatalogue from '@/components/FormationsCatalogue';
import Link from 'next/link';

export default async function FormationsPage({ params }: { params: Promise<{ lang: string }> }) {
  
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main>
      {/* --- PAGE HERO --- */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <h2>{dict.page?.formations?.tag || "📖 Catalogue complet"}</h2>
          <h1 dangerouslySetInnerHTML={{ __html: dict.page?.formations?.title || "Toutes nos <span>formations</span>" }} />
          
          {/* Nouveau texte de description */}
          <p>{dict.page?.formations?.desc || "Langues, informatique, IA, multimédia, réseaux sociaux — des contenus clairs, progressifs et accessibles à tous les niveaux."}</p>
          
          {/* Les 3 statistiques */}
          <div className="hero-stats">
            <div className="hero-stat">
              <strong>{dict.stats?.formations?.value || "14+"}</strong>
              <span>{dict.stats?.formations?.label || "formations"}</span>
            </div>
            <div className="hero-stat">
              <strong>{dict.stats?.niveaux?.value || "3"}</strong>
              {/* Changement du label ici */}
              <span>{dict.stats?.niveaux?.label || "niveaux / formations"}</span>
            </div>
            <div className="hero-stat">
              <strong>{dict.stats?.online?.value || "100%"}</strong>
              <span>{dict.stats?.online?.label || "en ligne"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- COMPOSANT CLIENT : LE CATALOGUE --- */}
      <FormationsCatalogue dict={dict} lang={lang} />

      {/* --- CTA BANNER --- */}
      <section className="cta-banner">
        <h2>{dict.cta?.title || "Prêt à commencer ?"}</h2>
        <p>{dict.cta?.desc || "Toutes nos formations sont disponibles en PDF, accessibles immédiatement après achat. Apprenez à votre rythme, où que vous soyez."}</p>
        <div className="cta-btns">
          <Link href={`/${lang}/boutique`} className="btn-primary">
            {dict.cta?.btn1 || "🛒 Voir la boutique"}
          </Link>
          <Link href={`/${lang}/contact`} className="btn-outline-white">
            {dict.cta?.btn2 || "Nous contacter"}
          </Link>
        </div>
      </section>
    </main>
  );
}