"use client";

import { useState } from "react";

type Option = { slug: string; icon: string; name: string; available: boolean };

const T: Record<string, Record<string, string>> = {
  legend: { fr: "Quel guide souhaitez-vous ?", en: "Which guide do you want?", es: "¿Qué guía quieres?", bg: "Кой наръчник искате?" },
  soon: { fr: "bientôt", en: "soon", es: "pronto", bg: "скоро" },
  email: { fr: "Votre adresse e-mail", en: "Your email address", es: "Tu correo electrónico", bg: "Вашият имейл адрес" },
  news: {
    fr: "Je souhaite aussi recevoir les nouveaux articles et fiches pratiques (facultatif)",
    en: "I'd also like to receive new articles and cheat sheets (optional)",
    es: "También quiero recibir nuevos artículos y fichas prácticas (opcional)",
    bg: "Искам да получавам и нови статии и практически карти (по избор)",
  },
  submit: { fr: "Recevoir le guide", en: "Get the guide", es: "Recibir la guía", bg: "Получи наръчника" },
  sending: { fr: "Envoi en cours…", en: "Sending…", es: "Enviando…", bg: "Изпращане…" },
  okReady: {
    fr: "C'est envoyé ! Vérifiez votre boîte mail — et les indésirables, au cas où.",
    en: "Sent! Check your inbox — and the spam folder, just in case.",
    es: "¡Enviado! Revisa tu correo — y la carpeta de spam, por si acaso.",
    bg: "Изпратено! Проверете пощата си — и спам папката, за всеки случай.",
  },
  okSoon: {
    fr: "Merci ! Ce guide est en préparation : vous serez prévenu dès sa publication.",
    en: "Thanks! This guide is in progress: you'll be notified as soon as it's out.",
    es: "¡Gracias! Esta guía está en preparación: te avisaremos en cuanto salga.",
    bg: "Благодарим! Наръчникът се подготвя: ще получите известие при излизането му.",
  },
  err: {
    fr: "Une erreur est survenue. Réessayez dans un instant.",
    en: "Something went wrong. Please try again shortly.",
    es: "Se ha producido un error. Inténtalo de nuevo en un momento.",
    bg: "Възникна грешка. Опитайте отново след малко.",
  },
  privacy: {
    fr: "Vos données ne sont jamais vendues ni partagées. Désinscription en un clic.",
    en: "Your data is never sold or shared. One-click unsubscribe.",
    es: "Tus datos nunca se venden ni se comparten. Baja con un clic.",
    bg: "Данните ви никога не се продават или споделят. Отписване с един клик.",
  },
};
const t = (k: string, l: string) => T[k][l] ?? T[k].fr;

export default function GuideForm({
  lang,
  options,
  preselected,
}: {
  lang: string;
  options: Option[];
  preselected?: string;
}) {
  const first = options.find((o) => o.slug === preselected) ?? options[0];
  const [guide, setGuide] = useState(first?.slug ?? "");
  const [email, setEmail] = useState("");
  const [news, setNews] = useState(false);
  const [hp, setHp] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [delivered, setDelivered] = useState(true);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    try {
      const r = await fetch("/api/guides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, guide, lang, newsletter: news, honeypot: hp }),
      });
      const data = await r.json();
      if (r.ok && data.ok) {
        setDelivered(data.delivered !== false);
        setState("ok");
      } else setState("err");
    } catch {
      setState("err");
    }
  }

  if (state === "ok") {
    return (
      <div className="guide-form guide-form-ok">
        <span className="guide-ok-icon">✓</span>
        <p>{delivered ? t("okReady", lang) : t("okSoon", lang)}</p>
      </div>
    );
  }

  return (
    <form className="guide-form" onSubmit={submit}>
      <fieldset className="guide-choices">
        <legend>{t("legend", lang)}</legend>
        {options.map((o) => (
          <label key={o.slug} className={guide === o.slug ? "is-checked" : ""}>
            <input type="radio" name="guide" value={o.slug} checked={guide === o.slug} onChange={() => setGuide(o.slug)} />
            <span>
              {o.icon} {o.name}
              {!o.available && <em> — {t("soon", lang)}</em>}
            </span>
          </label>
        ))}
      </fieldset>

      <label className="guide-field">
        <span>{t("email", lang)} *</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder="vous@exemple.com"
        />
      </label>

      <input
        type="text"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", opacity: 0 }}
      />

      <label className="guide-news">
        <input type="checkbox" checked={news} onChange={(e) => setNews(e.target.checked)} />
        <span>{t("news", lang)}</span>
      </label>

      <button type="submit" className="btn-primary" disabled={state === "loading"}>
        {state === "loading" ? t("sending", lang) : `📘 ${t("submit", lang)}`}
      </button>

      {state === "err" && <p className="guide-error">{t("err", lang)}</p>}
      <p className="guide-privacy">🔒 {t("privacy", lang)}</p>
    </form>
  );
}
