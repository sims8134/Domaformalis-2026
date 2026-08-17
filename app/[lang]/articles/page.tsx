import { redirect } from "next/navigation";

/**
 * L'index /articles est remplacé par /formations (même contenu, gabarit
 * conservé). Les leçons restent accessibles sur /articles/[slug].
 */
export default async function ArticlesIndexRedirect({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  redirect(`/${lang}/formations`);
}
