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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  // Form fields
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [rgpd, setRgpd] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getDictionary(lang);
      setDict(data);
    }
    load();
  }, [lang]);

  if (!dict) return null;

  const c = dict.contact;
  const f = dict.faq;

  async function handleSubmit() {
    setError("");

    if (!lastname || !firstname || !email || !subject || !message) {
      setError(c.form.error_missing || "Veuillez remplir tous les champs.");
      return;
    }

    if (!rgpd) {
      setError(c.form.error_rgpd || "Veuillez accepter la politique de confidentialité.");
      return;
    }

    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lastname,
          firstname,
          email,
          subject,
          message,
          rgpd,
          honeypot,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setFormSent(true);
      } else {
        setError(c.form.error_server || "Une erreur est survenue. Veuillez réessayer.");
      }
    } catch {
      setError(c.form.error_server || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main>
      {/* --- PAGE HERO --- */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="hero-tag">{c.hero.tag}</span>
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

              <div className="info-card">
                <div className="info-card-header">
                  <div className="info-icon">⚡</div>
                  <h3>{c.info.fast_title}</h3>
                </div>
                <p>{c.info.fast_desc}</p>
              </div>

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
                      <input
                        type="text"
                        placeholder="Dupont"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>{c.form.firstname}</label>
                      <input
                        type="text"
                        placeholder="Marie"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>{c.form.email}</label>
                    <input
                      type="email"
                      placeholder="marie@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>{c.form.subject}</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    >
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
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  {/* Honeypot — hidden from real users */}
                  <input
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-9999px", opacity: 0 }}
                  />

                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="rgpd"
                      checked={rgpd}
                      onChange={(e) => setRgpd(e.target.checked)}
                    />
                    <label htmlFor="rgpd">
                      {c.form.rgpd_text}{" "}
                      <a href={`/${lang}/confidentialite`} className="blue-link">
                        {c.form.privacy_link}
                      </a>
                      .
                    </label>
                  </div>

                  {error && (
                    <p style={{ color: "#e53e3e", fontSize: "14px", marginTop: "8px" }}>
                      {error}
                    </p>
                  )}

                  <button
                    type="button"
                    className="btn-submit"
                    onClick={handleSubmit}
                    disabled={sending}
                    style={{ opacity: sending ? 0.6 : 1 }}
                  >
                    {sending
                      ? (c.form.sending || "Envoi en cours...")
                      : `✉️ ${c.form.submit}`}
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