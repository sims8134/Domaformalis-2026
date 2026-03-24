import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/fr", request.url));
  }

  const { data: subscriber, error } = await supabaseAdmin
    .from("subscribers")
    .select("id, lang")
    .eq("unsub_token", token)
    .single();

  if (error || !subscriber) {
    return NextResponse.redirect(new URL("/fr", request.url));
  }

  await supabaseAdmin.from("subscribers").delete().eq("id", subscriber.id);

  const lang = subscriber.lang || "fr";
  return NextResponse.redirect(
    new URL(`/${lang}/newsletter-unsubscribed`, request.url)
  );
}