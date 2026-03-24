"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getDictionary } from "../../lib/get-dictionary";

export default function NewsletterConfirmedPage() {
  const params = useParams();
  const lang = (params?.lang as string) || "fr";
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const data = await getDictionary(lang);
      setDict(data);
    }
    load();
  }, [lang]);

  if (!dict) return null;

  const t = dict.newsletterConfirmed;

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner" style={{ textAlign: "center", padding: "80px 20px" }}>
          <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#64748b", marginBottom: "16px" }}>{t.thankYou}</p>
          <div style={{ fontSize: "48px", marginBottom: "16px", color: "#22c55e" }}>&#10003;</div>
          <h1>{t.title}</h1>
          <p style={{ color: "#64748b", marginTop: "12px" }}>{t.description}</p>
          <a href={`/${lang}`} className="btn-submit" style={{ display: "inline-block", marginTop: "24px" }}>{t.backHome}</a>
        </div>
      </section>
    </main>
  );
}
