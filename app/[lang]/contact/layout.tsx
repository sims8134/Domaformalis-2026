import type { Metadata } from "next";
import { getDictionary } from "@/app/lib/get-dictionary";
import { BASE_URL, buildAlternates } from "@/app/lib/seo";

/**
 * La page /contact est un composant client (formulaire à état) : elle ne peut
 * donc pas exporter `generateMetadata`. Ce layout serveur porte ses métadonnées
 * — canonical et hreflang inclus — sans rien changer à la page elle-même.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const title = dict?.seo?.contact?.title || "Contact | Domaformalis";
  const description =
    dict?.seo?.contact?.description ||
    "Contactez l'équipe Domaformalis pour toute question sur les formations.";

  return {
    title,
    description,
    alternates: buildAlternates(lang, "/contact"),
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/contact`,
      siteName: "Domaformalis",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      type: "website",
    },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
