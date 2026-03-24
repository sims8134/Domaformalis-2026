import NewsletterForm from "./NewsletterForm";

interface FooterProps {
  lang: string;
  dict: any;
}

export default function Footer({ lang, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const footer = dict?.footer;
  const newsletter = dict?.newsletter;

  return (
    <>
      {/* Newsletter section */}
      <section style={{ borderTop: "1px solid rgba(0,0,0,0.08)", padding: "60px 20px", textAlign: "center", background: "#ffffff" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#0cc0df", marginBottom: "12px" }}>{newsletter?.title || "Newsletter"}</p>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#1e293b", marginBottom: "8px" }} dangerouslySetInnerHTML={{ __html: newsletter?.heading || "" }} />
          <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "24px" }}>{newsletter?.description || ""}</p>
          <NewsletterForm lang={lang} dict={dict} />
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <img src="/img/logo_domaformalis.png" alt="Logo" />
              <p>{footer?.tagline || "Easy training for everyone, everywhere."}</p>
              <div className="footer-social">
                <a href="#" className="social-link">📱</a>
                <a href="#" className="social-link">🐦</a>
                <a href="#" className="social-link">📸</a>
              </div>
            </div>

            <div className="footer-col">
              <h4>{footer?.navigation?.title || "Navigation"}</h4>
              <ul>
                <li><a href={`/${lang}`}>{footer?.navigation?.home || "Home"}</a></li>
                <li><a href={`/${lang}/formations`}>{footer?.navigation?.formations || "Courses"}</a></li>
                <li><a href={`/${lang}/ressources`}>{footer?.navigation?.resources || "Resources"}</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>{footer?.help?.title || "Help"}</h4>
              <ul>
                <li><a href={`/${lang}/contact`}>{footer?.help?.contact || "Contact"}</a></li>
                <li><a href={`/${lang}/quisommesnous`}>{footer?.help?.about || "Who are we?"}</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>{footer?.legal?.title || "Legal"}</h4>
              <ul>
                <li><a href={`/${lang}/legal`}>{footer?.legal?.legal || "Legal notice"}</a></li>
                <li><a href={`/${lang}/confidentialite`}>{footer?.legal?.privacy || "Privacy"}</a></li>
                <li><a href={`/${lang}/cgu`}>{footer?.legal?.cgu || "Terms of Use"}</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>{footer?.copyright || `© ${currentYear} Domaformalis.com — All rights reserved.`}</p>
            <a href="#top">{footer?.backTop || "Back to top ↑"}</a>
          </div>
        </div>
      </footer>
    </>
  );
}