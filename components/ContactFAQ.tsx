"use client";
import { useState } from "react";

export default function ContactFAQ({ dict }: { dict: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = dict?.faq?.items || [];

  return (
    <section className="faq-section">
      <div className="faq-inner">
        <div className="section-header">
          <span className="section-tag">{dict?.faq?.tag || "❓ FAQ"}</span>
          <h2>{dict?.faq?.title || "Questions fréquentes"}</h2>
        </div>
        
        <div className="faq-list">
          {faqs.map((faq: any, index: number) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? "open" : ""}`}
            >
              <div 
                className="faq-question" 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h4>{faq.q}</h4>
                <span className="faq-arrow">▾</span>
              </div>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}