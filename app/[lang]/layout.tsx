import "../globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Poppins, Nunito } from "next/font/google";
import { getDictionary } from "../lib/get-dictionary";
import { Metadata } from "next"; // Import du type pour plus de clarté

export const metadata: Metadata = {
  // 1. URL de base pour éviter les erreurs Vercel
  metadataBase: new URL("https://domaformalis.com"),
  
  // 2. Titre et Description optimisés avec tes mots-clés
  title: "Domaformalis | Formations Professionnelles, Langues & Digital",
  description: "Boostez vos compétences avec nos formations accessibles : Français, Espagnol, Bulgare, Anglais, Informatique, IA et Réseaux Sociaux.",

  verification: {
    google: "63kCAt3u-DNOKdM5PZusXpP3pNx-aT18ISRZ6LmCCr0",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // 3. SEO International : On active toutes tes langues
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/fr",
      "en-US": "/en",
      "es-ES": "/es",
      "bg-BG": "/bg",
      "x-default": "/fr", // Redirige par défaut vers le français pour les autres pays
    },
  },

  // 4. Open Graph (Partage réseaux sociaux)
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://domaformalis.com",
    siteName: "Domaformalis",
    title: "Domaformalis | Formations Professionnelles & Digitales",
    description: "Apprenez les langues, l'informatique et l'IA avec des supports clairs.",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Domaformalis Formation",
      },
    ],
  },
  
  // 5. Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Domaformalis | Formations Digitales",
    description: "Formations accessibles partout, tout le temps.",
    images: ["/og-image.png"],
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