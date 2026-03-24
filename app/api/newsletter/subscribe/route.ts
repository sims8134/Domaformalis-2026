import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabaseAdmin } from "../../../lib/supabase-admin";
import { sendEmail } from "../../../lib/email";
import { getConfirmationEmail } from "../../../lib/newsletter-email";

const SITE = "domaformalis";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, lang, honeypot } = body;

    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { ok: false, error: "email_required" },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { ok: false, error: "email_invalid" },
        { status: 400 }
      );
    }

    const validLangs = ["fr", "en", "es", "bg"];
    const validLang = validLangs.includes(lang) ? lang : "fr";

    const { data: existing } = await supabaseAdmin
      .from("subscribers")
      .select("id, confirmed")
      .eq("email", trimmedEmail)
      .eq("site", SITE)
      .single();

    if (existing?.confirmed) {
      return NextResponse.json(
        { ok: false, error: "already_subscribed" },
        { status: 409 }
      );
    }

    const confirmToken = randomUUID();
    const unsubToken = randomUUID();

    if (existing && !existing.confirmed) {
      await supabaseAdmin
        .from("subscribers")
        .update({ confirm_token: confirmToken, lang: validLang })
        .eq("id", existing.id);
    } else {
      const { error: insertError } = await supabaseAdmin
        .from("subscribers")
        .insert({
          email: trimmedEmail,
          lang: validLang,
          site: SITE,
          confirmed: false,
          confirm_token: confirmToken,
          unsub_token: unsubToken,
        });

      if (insertError) {
        console.error("Insert error:", insertError);
        return NextResponse.json(
          { ok: false, error: "server_error" },
          { status: 500 }
        );
      }
    }

    const { subject, html } = getConfirmationEmail(validLang, confirmToken);

    await sendEmail({ to: trimmedEmail, subject, html });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}