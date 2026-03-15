import type { Metadata } from "next";
import { getDictionary } from "@/app/lib/get-dictionary";
import Link from "next/link";

const BASE_URL = "https://www.domaformalis.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const title =
    dict?.seo?.about?.title || "Domaformalis | Qui sommes-nous ?";

  const description =
    dict?.seo?.about?.description ||
    "Découvrez l’équipe, la mission et les valeurs de Domaformalis.";

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/quisommesnous`,
      languages: {
        fr: `${BASE_URL}/fr/quisommesnous`,
        en: `${BASE_URL}/en/quisommesnous`,
        es: `${BASE_URL}/es/quisommesnous`,
        bg: `${BASE_URL}/bg/quisommesnous`,
        "x-default": `${BASE_URL}/fr/quisommesnous`,
      },
    },
  };
}

export default async function QuiSommesNousPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const q = dict.qsn;

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="hero-tag">{q.hero.tag}</span>
          <h1 dangerouslySetInnerHTML={{ __html: q.hero.title }} />
          <p>{q.hero.desc}</p>
        </div>
      </section>

      <section className="intro-section">
        <h2>{q.mission.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: q.mission.p1 }} />
        <p dangerouslySetInnerHTML={{ __html: q.mission.p2 }} />
      </section>

      <section className="equipe-section">
        <div className="equipe-inner">
          <div className="section-header">
            <span className="section-tag">{q.equipe.tag}</span>
            <h2>{q.equipe.title}</h2>
          </div>

          <div className="equipe-grid">
            <div className="membre-card">
              <div className="membre-top">
                <img
                  className="membre-photo"
                  src="/img/founder-simon.jpg"
                  alt="Simon"
                />
                <div className="membre-id">
                  <h3>Simon</h3>
                  <span className="membre-role role-simon">{q.simon.role}</span>
                </div>
              </div>
              <div className="membre-body">
                <p>{q.simon.p1}</p>
                <p>{q.simon.p2}</p>
                <div className="membre-tags">
                  {q.simon.tags.map((tag: string, i: number) => (
                    <span key={i} className="membre-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="membre-card">
              <div className="membre-top">
                <img
                  className="membre-photo"
                  src="/img/founder-yasmine.jpg"
                  alt="Yasmine"
                />
                <div className="membre-id">
                  <h3>Yasmine</h3>
                  <span className="membre-role role-yasmine">{q.yasmine.role}</span>
                </div>
              </div>
              <div className="membre-body">
                <p>{q.yasmine.p1}</p>
                <p>{q.yasmine.p2}</p>
                <div className="membre-tags">
                  {q.yasmine.tags.map(
                    (tag: { label: string; lang?: boolean }, i: number) => (
                      <span
                        key={i}
                        className={`membre-tag${tag.lang ? " lang" : ""}`}
                      >
                        {tag.label}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="valeurs-section">
        <div className="section-header">
          <span className="section-tag">{q.valeurs.tag}</span>
          <h2>{q.valeurs.title}</h2>
        </div>
        <div className="valeurs-grid">
          {q.valeurs.items.map(
            (v: { icon: string; title: string; desc: string }, i: number) => (
              <div key={i} className="valeur-card">
                <span className="valeur-icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            )
          )}
        </div>
      </section>

      <section className="cta-section">
        <h2>{q.cta.title}</h2>
        <p>{q.cta.desc}</p>
        <div className="cta-btns">
          <Link href={`/${lang}/formations`} className="btn-primary">
            {q.cta.btn1}
          </Link>
          <Link href={`/${lang}/contact`} className="btn-outline">
            {q.cta.btn2}
          </Link>
        </div>
      </section>
    </main>
  );
}