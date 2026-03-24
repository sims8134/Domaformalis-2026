const BASE_URL = "https://domaformalis.com";

const translations: Record<string, {
  subject: string;
  heading: string;
  text: string;
  button: string;
  ignore: string;
}> = {
  fr: {
    subject: "Confirmez votre inscription — Domaformalis",
    heading: "Confirmez votre inscription",
    text: "Merci de vous être inscrit à la newsletter Domaformalis. Veuillez cliquer sur le bouton ci-dessous pour confirmer votre adresse e-mail.",
    button: "Confirmer mon inscription",
    ignore: "Si vous ne vous êtes pas inscrit, vous pouvez ignorer cet e-mail.",
  },
  en: {
    subject: "Confirm your subscription — Domaformalis",
    heading: "Confirm your subscription",
    text: "Thank you for subscribing to the Domaformalis newsletter. Please click the button below to confirm your email address.",
    button: "Confirm my subscription",
    ignore: "If you did not subscribe, you can safely ignore this email.",
  },
  es: {
    subject: "Confirma tu suscripción — Domaformalis",
    heading: "Confirma tu suscripción",
    text: "Gracias por suscribirte al boletín de Domaformalis. Haz clic en el botón de abajo para confirmar tu dirección de correo electrónico.",
    button: "Confirmar mi suscripción",
    ignore: "Si no te suscribiste, puedes ignorar este correo.",
  },
  bg: {
    subject: "Потвърдете абонамента си — Domaformalis",
    heading: "Потвърдете абонамента си",
    text: "Благодарим ви, че се абонирахте за бюлетина на Domaformalis. Моля, кликнете бутона по-долу, за да потвърдите имейл адреса си.",
    button: "Потвърждаване на абонамента",
    ignore: "Ако не сте се абонирали, можете спокойно да игнорирате този имейл.",
  },
};

export function getConfirmationEmail(lang: string, confirmToken: string) {
  const t = translations[lang] || translations.fr;
  const confirmUrl = `${BASE_URL}/api/newsletter/confirm?token=${confirmToken}`;

  const html = `
<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:40px;border:1px solid #e2e8f0;">
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <img src="https://domaformalis.com/img/logo_domaformalis.png" alt="Domaformalis" style="height:50px;" />
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:16px;">
              <h1 style="margin:0;font-size:22px;color:#1e293b;">${t.heading}</h1>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <p style="margin:0;font-size:15px;line-height:1.6;color:#64748b;">${t.text}</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <a href="${confirmUrl}" style="display:inline-block;padding:12px 32px;background:#0ea5e9;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:6px;">${t.button}</a>
            </td>
          </tr>
          <tr>
            <td align="center">
              <p style="margin:0;font-size:12px;color:#94a3b8;">${t.ignore}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();

  return { subject: t.subject, html };
}