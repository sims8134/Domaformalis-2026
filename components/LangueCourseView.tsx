"use client";

import { useState } from "react";
import Link from "next/link";

type Item = {
  kind: "lesson" | "sheet";
  key: string;
  level?: string;
  num?: number;
  pages?: number;
  title: string;
  desc?: string;
  files: Record<string, string>;   // teachLang -> url du PDF
};

const T: Record<string, Record<string, string>> = {
  pick: {
    fr: "Dans quelle langue voulez-vous les explications ?",
    es: "¿En qué idioma quieres las explicaciones?",
    bg: "На какъв език искате обясненията?",
    en: "Which language do you want the explanations in?",
  },
  hint: {
    fr: "Les documents existent en plusieurs langues. Choisissez la vôtre : tous les liens ci-dessous s'adaptent.",
    es: "Los documentos existen en varios idiomas. Elige el tuyo: todos los enlaces se adaptan.",
    bg: "Документите съществуват на няколко езика. Изберете вашия — всички връзки долу се адаптират.",
    en: "The documents exist in several languages. Pick yours — every link below adapts.",
  },
  lessons: { fr: "Les leçons", es: "Las lecciones", bg: "Уроците", en: "The lessons" },
  lessonsDesc: {
    fr: "Guides complets avec exercices corrigés, à lire hors ligne ou à imprimer.",
    es: "Guías completas con ejercicios corregidos, para leer sin conexión o imprimir.",
    bg: "Пълни наръчници с упражнения и отговори — офлайн или за печат.",
    en: "Complete guides with corrected exercises, to read offline or print.",
  },
  sheets: { fr: "Les fiches de rappel", es: "Las fichas de repaso", bg: "Картите за преговор", en: "The cheat sheets" },
  sheetsDesc: {
    fr: "Une page A4 par point de grammaire — à imprimer et garder à côté de soi.",
    es: "Una página A4 por punto de gramática — para imprimir y tener a mano.",
    bg: "Една страница A4 на граматична точка — за печат и под ръка.",
    en: "One A4 page per grammar point — print it and keep it beside you.",
  },
  download: { fr: "Télécharger", es: "Descargar", bg: "Изтегли", en: "Download" },
  pages: { fr: "pages", es: "páginas", bg: "страници", en: "pages" },
  free: {
    fr: "Tout est gratuit et sans inscription.",
    es: "Todo es gratis y sin registro.",
    bg: "Всичко е безплатно и без регистрация.",
    en: "Everything is free, no sign-up.",
  },
  teacher: {
    fr: "Envie de pratiquer à l'oral avec une enseignante ?",
    es: "¿Quieres practicar en directo con una profesora?",
    bg: "Искате ли практика на живо с преподавател?",
    en: "Want to practise out loud with a teacher?",
  },
  contact: { fr: "Nous contacter", es: "Contáctanos", bg: "Свържете се с нас", en: "Get in touch" },
};
const t = (k: string, l: string) => T[k]?.[l] ?? T[k]?.fr ?? k;

export default function LangueCourseView({
  lang,
  teachLangs,
  teachLabels,
  teachFlags,
  initialTeach,
  lessons,
  sheets,
}: {
  lang: string;
  teachLangs: string[];
  teachLabels: Record<string, string>;
  teachFlags: Record<string, string>;
  initialTeach: string;
  lessons: Item[];
  sheets: Item[];
}) {
  const [tl, setTl] = useState(initialTeach);

  return (
    <>
      {/* --- Sélecteur de langue d'enseignement --- */}
      <section className="lang-picker">
        <div className="lang-picker-inner">
          <h2>{t("pick", lang)}</h2>
          <p>{t("hint", lang)}</p>
          <div className="lang-picker-btns">
            {teachLangs.map((code) => (
              <button
                key={code}
                onClick={() => setTl(code)}
                className={`lang-btn ${tl === code ? "is-active" : ""}`}
                aria-pressed={tl === code}
              >
                <span className="lang-btn-flag">{teachFlags[code]}</span>
                {teachLabels[code]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- Les leçons --- */}
      <section className="lang-section">
        <div className="lang-inner">
          <h2 className="articles-cat-title">{t("lessons", lang)}</h2>
          <p className="lang-section-desc">{t("lessonsDesc", lang)}</p>

          <ol className="lang-lessons">
            {lessons.map((l) => (
              <li key={l.key}>
                <span className="lang-lesson-num">{l.num}</span>
                <div className="lang-lesson-body">
                  <h3>{l.title}</h3>
                  <p>{l.desc}</p>
                </div>
                <a href={l.files[tl]} download className="btn-primary lang-dl">
                  📘 {t("download", lang)}
                  <em>PDF · {l.pages} {t("pages", lang)}</em>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --- Les fiches --- */}
      <section className="lang-section lang-section-alt">
        <div className="lang-inner">
          <h2 className="articles-cat-title">{t("sheets", lang)}</h2>
          <p className="lang-section-desc">{t("sheetsDesc", lang)}</p>

          <div className="lang-sheets">
            {sheets.map((s) => (
              <a key={s.key} href={s.files[tl]} download className="lang-sheet">
                <span className="lang-sheet-level">{s.level}</span>
                <strong>{s.title}</strong>
                <span className="lang-sheet-dl">📄 {t("download", lang)}</span>
              </a>
            ))}
          </div>

          <p className="lang-free">✓ {t("free", lang)}</p>
        </div>
      </section>

      {/* --- CTA enseignante --- */}
      <section className="cta-banner">
        <h2>{t("teacher", lang)}</h2>
        <div className="cta-btns">
          <Link href={`/${lang}/contact`} className="btn-primary">
            {t("contact", lang)}
          </Link>
        </div>
      </section>
    </>
  );
}
