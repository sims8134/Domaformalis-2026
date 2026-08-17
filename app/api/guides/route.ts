import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabaseAdmin } from "../../lib/supabase-admin";
import { sendEmail } from "../../lib/email";
import { getConfirmationEmail } from "../../lib/newsletter-email";

const SITE = "domaformalis";
const BASE_URL = "https://domaformalis.com";

/** Guides disponibles. file = null -> guide pas encore publié. */
const GUIDES: Record<string, { file: string | null; name: Record<string, string> }> = {
  "securite-internet": {
    file: "/Ebook-Guides/domaformalis_ebook_internet_arnaques.pdf",
    name: {
      fr: "Sécurité Internet — Guide Pratique",
      en: "Internet Security — Practical Guide",
      es: "Seguridad en Internet — Guía Práctica",
      bg: "Сигурност в интернет — Практически наръчник",
    },
  },
  "reseaux-sociaux": {
    file: "/Ebook-Guides/domaformalis_ebook_jeunes_reseaux.pdf",
    name: {
      fr: "Réseaux Sociaux — Guide Pratique",
      en: "Social Media — Practical Guide",
      es: "Redes Sociales — Guía Práctica",
      bg: "Социални мрежи — Практически наръчник",
    },
  },
  "comprendre-ia": {
    file: null,
    name: {
      fr: "Comprendre l'IA — Guide Pratique",
      en: "Understanding AI — Practical Guide",
      es: "Entender la IA — Guía Práctica",
      bg: "Да разберем ИИ — Практически наръчник",
    },
  },
};

const MAIL: Record<
  string,
  { subject: (g: string) => string; ready: (g: string, url: string) => string; soon: (g: string) => string }
> = {
  fr: {
    subject: (g) => `Votre guide : ${g}`,
    ready: (g, url) => `
      <p>Bonjour,</p>
      <p>Merci pour votre intérêt. Voici votre guide :</p>
      <p style="margin:26px 0"><a href="${url}" style="background:#006B80;color:#fff;padding:13px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">📘 Télécharger « ${g} »</a></p>
      <p>Le lien reste valable — conservez-le ou imprimez le guide, il est fait pour ça.</p>
      <p>Tous les articles et les fiches pratiques correspondantes sont en accès libre sur <a href="${BASE_URL}/fr/articles" style="color:#006B80">domaformalis.com</a>.</p>
      <p>Bonne lecture,<br>L'équipe Domaformalis</p>`,
    soon: (g) => `
      <p>Bonjour,</p>
      <p>Merci pour votre intérêt pour le guide « ${g} ». Il est en cours de préparation : vous serez prévenu par e-mail dès sa publication.</p>
      <p>En attendant, tous les articles de ce parcours sont déjà disponibles gratuitement sur <a href="${BASE_URL}/fr/articles" style="color:#006B80">domaformalis.com</a>.</p>
      <p>À bientôt,<br>L'équipe Domaformalis</p>`,
  },
  en: {
    subject: (g) => `Your guide: ${g}`,
    ready: (g, url) => `
      <p>Hello,</p>
      <p>Thanks for your interest. Here is your guide:</p>
      <p style="margin:26px 0"><a href="${url}" style="background:#006B80;color:#fff;padding:13px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">📘 Download "${g}"</a></p>
      <p>The link stays valid — keep it or print the guide, it's made for that.</p>
      <p>All articles and their cheat sheets are freely available on <a href="${BASE_URL}/en/articles" style="color:#006B80">domaformalis.com</a>.</p>
      <p>Happy reading,<br>The Domaformalis team</p>`,
    soon: (g) => `
      <p>Hello,</p>
      <p>Thanks for your interest in "${g}". It's being prepared — you'll be notified by email as soon as it's out.</p>
      <p>Meanwhile, every article of this track is already free on <a href="${BASE_URL}/en/articles" style="color:#006B80">domaformalis.com</a>.</p>
      <p>See you soon,<br>The Domaformalis team</p>`,
  },
  es: {
    subject: (g) => `Tu guía: ${g}`,
    ready: (g, url) => `
      <p>Hola,</p>
      <p>Gracias por tu interés. Aquí tienes tu guía:</p>
      <p style="margin:26px 0"><a href="${url}" style="background:#006B80;color:#fff;padding:13px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">📘 Descargar «${g}»</a></p>
      <p>El enlace sigue siendo válido — guárdalo o imprime la guía.</p>
      <p>Todos los artículos y sus fichas prácticas están libremente disponibles en <a href="${BASE_URL}/es/articles" style="color:#006B80">domaformalis.com</a>.</p>
      <p>Buena lectura,<br>El equipo de Domaformalis</p>`,
    soon: (g) => `
      <p>Hola,</p>
      <p>Gracias por tu interés en «${g}». Está en preparación: te avisaremos por correo en cuanto salga.</p>
      <p>Mientras tanto, todos los artículos de este itinerario ya están disponibles gratis en <a href="${BASE_URL}/es/articles" style="color:#006B80">domaformalis.com</a>.</p>
      <p>Hasta pronto,<br>El equipo de Domaformalis</p>`,
  },
  bg: {
    subject: (g) => `Вашият наръчник: ${g}`,
    ready: (g, url) => `
      <p>Здравейте,</p>
      <p>Благодарим за интереса. Ето вашия наръчник:</p>
      <p style="margin:26px 0"><a href="${url}" style="background:#006B80;color:#fff;padding:13px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">📘 Изтегли „${g}"</a></p>
      <p>Връзката остава валидна — запазете я или разпечатайте наръчника.</p>
      <p>Всички статии и практическите карти са свободно достъпни на <a href="${BASE_URL}/bg/articles" style="color:#006B80">domaformalis.com</a>.</p>
      <p>Приятно четене,<br>Екипът на Domaformalis</p>`,
    soon: (g) => `
      <p>Здравейте,</p>
      <p>Благодарим за интереса към „${g}". Наръчникът се подготвя — ще получите известие веднага щом излезе.</p>
      <p>Междувременно всички статии от тази пътека вече са безплатни на <a href="${BASE_URL}/bg/articles" style="color:#006B80">domaformalis.com</a>.</p>
      <p>До скоро,<br>Екипът на Domaformalis</p>`,
  },
};

const wrap = (inner: string) =>
  `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#233238;max-width:560px">${inner}
   <hr style="border:0;border-top:1px solid #e2ecef;margin:30px 0">
   <p style="font-size:12px;color:#8a9a9f">Domaformalis — La formation facile pour tous et partout · <a href="${BASE_URL}" style="color:#006B80">domaformalis.com</a></p></div>`;

export async function POST(request: Request) {
  try {
    const { email, guide, lang, newsletter, honeypot } = await request.json();

    if (honeypot) return NextResponse.json({ ok: true });

    if (!email || typeof email !== "string") {
      return NextResponse.json({ ok: false, error: "email_required" }, { status: 400 });
    }
    const trimmedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return NextResponse.json({ ok: false, error: "email_invalid" }, { status: 400 });
    }

    const g = GUIDES[guide];
    if (!g) return NextResponse.json({ ok: false, error: "guide_invalid" }, { status: 400 });

    const validLang = ["fr", "en", "es", "bg"].includes(lang) ? lang : "fr";
    const guideName = g.name[validLang] ?? g.name.fr;
    const L = MAIL[validLang] ?? MAIL.fr;

    // 1) Trace de la demande (mesure la demande par parcours, notamment pour le guide IA)
    const { error: reqError } = await supabaseAdmin.from("guide_requests").insert({
      email: trimmedEmail,
      guide,
      lang: validLang,
      site: SITE,
      delivered: Boolean(g.file),
    });
    if (reqError) console.error("guide_requests:", reqError.message);

    // 2) Envoi du guide (ou du message « à venir »)
    await sendEmail({
      to: trimmedEmail,
      subject: L.subject(guideName),
      html: wrap(g.file ? L.ready(guideName, `${BASE_URL}${g.file}`) : L.soon(guideName)),
    });

    // 3) Newsletter — uniquement si la case est cochée, avec le double opt-in existant
    if (newsletter === true) {
      const { data: existing } = await supabaseAdmin
        .from("subscribers")
        .select("id, confirmed")
        .eq("email", trimmedEmail)
        .eq("site", SITE)
        .single();

      if (!existing?.confirmed) {
        const confirmToken = randomUUID();
        if (existing) {
          await supabaseAdmin
            .from("subscribers")
            .update({ confirm_token: confirmToken, lang: validLang })
            .eq("id", existing.id);
        } else {
          await supabaseAdmin.from("subscribers").insert({
            email: trimmedEmail,
            lang: validLang,
            site: SITE,
            confirmed: false,
            confirm_token: confirmToken,
            unsub_token: randomUUID(),
          });
        }
        const { subject, html } = getConfirmationEmail(validLang, confirmToken);
        await sendEmail({ to: trimmedEmail, subject, html });
      }
    }

    return NextResponse.json({ ok: true, delivered: Boolean(g.file) });
  } catch (error) {
    console.error("Guide request error:", error);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
