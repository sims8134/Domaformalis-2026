import nodemailer from "nodemailer";

const REQUIRED = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"] as const;

/**
 * Le transporteur est cree a chaque envoi, pas au chargement du module : en
 * serverless une instance gelee puis reveillee reutiliserait une socket morte.
 * Les timeouts sont explicites — sans eux, un SMTP injoignable bloque jusqu'a
 * ce que la plateforme tue la fonction, et le catch de la route n'est jamais
 * atteint : l'erreur n'apparait alors dans aucun log.
 */
function getTransporter() {
  const missing = REQUIRED.filter((k) => !process.env[k]);
  if (missing.length) {
    throw new Error(`Configuration SMTP incomplete : ${missing.join(", ")}`);
  }
  const port = Number(process.env.SMTP_PORT);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465, // 465 = TLS implicite
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
}

/**
 * Envoie un e-mail et **verifie le resultat**. `sendMail` peut se resoudre
 * alors que le serveur a refuse le destinataire : on leve dans ce cas, pour
 * qu'aucune route ne puisse repondre 200 sans envoi effectif.
 */
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  let info;
  try {
    info = await getTransporter().sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error("[smtp] echec de l'envoi", {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      subject,
      error: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
    });
    throw err;
  }

  const accepted = info.accepted ?? [];
  const rejected = info.rejected ?? [];
  if (rejected.length > 0 || accepted.length === 0) {
    console.error("[smtp] destinataire refuse par le serveur", {
      accepted,
      rejected,
      response: info.response,
      subject,
    });
    throw new Error(
      `SMTP : destinataire refuse (${rejected.join(", ") || "aucun destinataire accepte"})`
    );
  }

  console.log("[smtp] envoye", {
    messageId: info.messageId,
    accepted: accepted.length,
    response: info.response,
  });
  return info;
}
