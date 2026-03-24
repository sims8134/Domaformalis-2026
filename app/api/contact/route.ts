import { NextResponse } from "next/server";
import { sendEmail } from "../../lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lastname, firstname, email, subject, message, rgpd, honeypot } = body;

    // Honeypot check
    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    // Validation
    if (!lastname || !firstname || !email || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: "missing_fields" },
        { status: 400 }
      );
    }

    if (!rgpd) {
      return NextResponse.json(
        { ok: false, error: "rgpd_required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: "email_invalid" },
        { status: 400 }
      );
    }

    // Build email HTML
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;">
        <h2 style="color:#1a56db;">Nouveau message — Domaformalis</h2>
        <p><strong>Nom :</strong> ${lastname}</p>
        <p><strong>Prénom :</strong> ${firstname}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <hr style="border:none;border-top:1px solid #ddd;margin:16px 0;" />
        <p><strong>Message :</strong></p>
        <p style="white-space:pre-wrap;">${message}</p>
      </div>
    `;

    await sendEmail({
      to: process.env.CONTACT_TO || "contact@domaformalis.com",
      subject: `[Domaformalis] ${subject} — ${firstname} ${lastname}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}