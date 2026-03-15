"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getDictionary } from "../../lib/get-dictionary";

export default function ContactPage() {
  const params = useParams();
  const lang = (params?.lang as string) || "fr";
  const [dict, setDict] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getDictionary(lang);
      setDict(data);
    }
    load();
  }, [lang]);

  if (!dict) return null;

  // ─── Raccourcis ────────────────────────────────────────────
  // Désormais dict.contact et dict.faq sont au TOP-LEVEL du JSON
  // Plus de chaînage optionnel nécessaire : on sait qu'ils existent.
  const c = dict.contact;
  const f = dict.faq;

  function handleSubmit() {
    // TODO: intégrer EmailJS / API
    setFormSent(true);
  }

  return (
    <main>
      {/* --- PAGE HERO --- */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="hero-tag">
            {c.hero.tag}
          </span>
          <h1 dangerouslySetInnerHTML={{ __html: c.hero.title }} />
          <p>{c.hero.desc}</p>
        </div>
      </section>

      {/* --- SECTION CONTACT --- */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">

            {/* COLONNE INFO (GAUCHE) */}
            <div className="contact-info">

              {/* Email */}
              <div className="info-card">
                <div className="info-card-header">
                  <div className="info-icon">📧</div>
                  <h3>{c.info.email_title}</h3>
                </div>
                <p>
                  <a href="mailto:contact@domaformalis.com">
                    contact@domaformalis.com
                  </a>
                </p>
              </div>

              {/* Réponse rapide */}
              <div className="info-card">
                <div className="info-card-header">
                  <div className="info-icon">⚡</div>
                  <h3>{c.info.fast_title}</h3>
                </div>
                <p>{c.info.fast_desc}</p>
              </div>

              {/* Équipe */}
              <div className="info-card">
                <div className="info-card-header">
                  <div className="info-icon">👥</div>
                  <h3>{c.info.team_title}</h3>
                </div>
                <div className="team-contact">
                  <div className="team-member-row">
                    <img
                      className="team-avatar"
                      src="/img/founder-simon.jpg"
                      alt="Simon"
                    />
                    <div className="team-member-info">
                      <strong>Simon</strong>
                      <span>{c.info.simon_role}</span>
                    </div>
                  </div>
                  <div className="team-member-row">
                    <img
                      className="team-avatar"
                      src="/img/founder-yasmine.jpg"
                      alt="Yasmine"
                    />
                    <div className="team-member-info">
                      <strong>Yasmine</strong>
                      <span>{c.info.yasmine_role}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="info-card">
                <div className="info-card-header">
                  <div className="info-icon">📲</div>
                  <h3>{c.info.social_title}</h3>
                </div>
                <div className="social-row">
                  <a href="#" className="social-btn">📘 Facebook</a>
                  <a href="#" className="social-btn">📸 Instagram</a>
                  <a href="#" className="social-btn">🐦 Twitter</a>
                </div>
              </div>
            </div>

            {/* FORMULAIRE (DROITE) */}
            <div className="contact-form-wrap">
              {!formSent ? (
                <div id="formContent">
                  <h2 className="form-title">{c.form.title}</h2>
                  <p className="form-subtitle">{c.form.desc}</p>

                  <div className="form-row">
                    <div className="form-group">
                      <label>{c.form.lastname}</label>
                      <input type="text" placeholder="Dupont" />
                    </div>
                    <div className="form-group">
                      <label>{c.form.firstname}</label>
                      <input type="text" placeholder="Marie" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>{c.form.email}</label>
                    <input type="email" placeholder="marie@example.com" />
                  </div>

                  <div className="form-group">
                    <label>{c.form.subject}</label>
                    <select>
                      <option value="">{c.form.subject_placeholder}</option>
                      {Object.entries(c.form.subject_options).map(
                        ([key, label]) => (
                          <option key={key} value={key}>
                            {label as string}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>{c.form.message}</label>
                    <textarea
                      rows={5}
                      placeholder={c.form.message_placeholder}
                    />
                  </div>

                  <div className="form-check">
                    <input type="checkbox" id="rgpd" />
                    <label htmlFor="rgpd">
                      {c.form.rgpd_text}{" "}
                      <a href="#" className="blue-link">
                        {c.form.privacy_link}
                      </a>
                      .
                    </label>
                  </div>

                  <button
                    type="button"
                    className="btn-submit"
                    onClick={handleSubmit}
                  >
                    ✉️ {c.form.submit}
                  </button>
                </div>
              ) : (
                <div className="form-success">
                  <span className="success-icon">✅</span>
                  <h3>{c.success.title}</h3>
                  <p>{c.success.desc}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="faq-section">
        <div className="faq-inner">
          <div className="section-header">
            <span className="section-tag">{f.tag}</span>
            <h2>{f.title}</h2>
          </div>
          <div className="faq-list">
            {f.items.map((item: { q: string; a: string }, index: number) => (
              <div
                key={index}
                className={`faq-item ${openFaq === index ? "open" : ""}`}
              >
                <div
                  className="faq-question"
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                >
                  <h4>{item.q}</h4>
                  <span className="faq-arrow">▾</span>
                </div>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
