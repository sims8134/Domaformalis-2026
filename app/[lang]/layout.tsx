import "../globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Poppins, Nunito } from "next/font/google";
import { getDictionary } from "../lib/get-dictionary";
import { Metadata } from "next"; // Import du type pour plus de clarté

// --- BLOC 1 & 3 : CONFIGURATION SEO ---
export const metadata: Metadata = {
  // On définit l'URL de base (sans www comme prévu dans ton plan)
  metadataBase: new URL("https://domaformalis.com"),
  
  title: "Domaformalis | Formation et Accompagnement", // Remplace par ton titre réel
  description: "Description de ton projet Domaformalis", // Remplace par ta description réelle

  verification: {
    google: "63kCAt3u-DNOKdM5PZusXpP3pNx-aT18ISRZ6LmCCr0",
  },

  // FIX : On dit explicitement aux robots d'indexer le site (Bloc 1)
  robots: {
    index: true,
    follow: true,
  },

  // SEO ON-PAGE : URL Canonique et langues (Bloc 3)
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/fr",
      // "en-US": "/en", // Décommente si tu as une version anglaise
    },
  },

  // Réseaux Sociaux (Open Graph)
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://domaformalis.com",
    siteName: "Domaformalis",
    images: [
      {
        url: "/og-image.png", // Image à mettre dans ton dossier /public
        width: 1200,
        height: 630,
        alt: "Domaformalis",
      },
    ],
  },
};

// --- CONFIGURATION DES POLICES ---
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

// --- LE LAYOUT PRINCIPAL ---
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  // On récupère la langue depuis les paramètres d'URL
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "fr";

  // On récupère les textes (dictionnaire) pour la langue
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${poppins.variable} ${nunito.variable}`}>
      <body>
        <Header lang={lang} dict={dict.Navigation} />

        <main>{children}</main>

        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}