import "../globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Poppins, Nunito } from "next/font/google";
import { getDictionary } from "../lib/get-dictionary";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const BASE_URL = "https://domaformalis.com";
const LOCALES = ["fr", "en", "es", "bg"];

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: "Domaformalis | Formations Langues, Informatique & IA — Accessibles à tous",
  description:
    "Formations en ligne accessibles à tous : Français, Espagnol, Bulgare, Anglais, Informatique, Intelligence Artificielle et Réseaux Sociaux. Cours clairs et adaptés à tous les niveaux.",

  verification: {
    google: "63kCAt3u-DNOKdM5PZusXpP3pNx-aT18ISRZ6LmCCr0",
  },

  keywords: [
    "formation en ligne",
    "cours de langues en ligne",
    "formation informatique",
    "formation IA",
    "apprendre le français",
    "apprendre l'espagnol",
    "apprendre le bulgare",
    "formation bureautique",
    "formation réseaux sociaux",
    "cours accessibles",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* NB : pas d'alternates ici. Un canonical défini dans le layout est hérité
     par toutes les pages qui n'en déclarent pas — elles se présenteraient
     alors toutes comme des copies de la racine. Chaque page définit le sien
     dans son generateMetadata. */

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: BASE_URL,
    siteName: "Domaformalis",
    title: "Domaformalis | Formations Langues, Informatique & IA",
    description:
      "Formations en ligne accessibles : langues, informatique, IA et réseaux sociaux. Cours clairs et adaptés à tous les niveaux.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Domaformalis — Formations accessibles à tous",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@domaformalis",
    title: "Domaformalis | Formations Langues, Informatique & IA",
    description:
      "Formations en ligne accessibles : langues, informatique, IA et réseaux sociaux.",
    images: ["/og-image.png"],
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Domaformalis",
  url: BASE_URL,
  logo: `${BASE_URL}/img/logo_domaformalis.png`,
  description:
    "Plateforme de formations en ligne accessibles à tous : langues, informatique, IA et réseaux sociaux.",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61577432794087",
    "https://x.com/domaformalis",
    "https://www.instagram.com/domaformalis",
  ],
};

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "fr";

  // Toute locale inconnue (ex. /og-image.png, /xyz) rend un vrai 404
  // au lieu de la page d'accueil en version cassée.
  if (!LOCALES.includes(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${poppins.variable} ${nunito.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header lang={lang} dict={dict.Navigation} />
        <main>{children}</main>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
