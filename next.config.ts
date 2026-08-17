import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 1) www -> apex (existant, inchangé)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.domaformalis.com" }],
        destination: "https://domaformalis.com/:path*",
        permanent: true,
      },

      // 2) Anciennes URL du site HTML -> nouvelles routes Next
      { source: "/domaformalis_index.html", destination: "/fr", permanent: true },
      { source: "/domaformalis_formations.html", destination: "/fr/formations", permanent: true },
      { source: "/domaformalis_boutique.html", destination: "/fr/formations", permanent: true },
      { source: "/domaformalis_contact.html", destination: "/fr/contact", permanent: true },
      { source: "/domaformalis_quisommesnous.html", destination: "/fr/quisommesnous", permanent: true },
      { source: "/domaformalis_ressources.html", destination: "/fr/ressources", permanent: true },
      { source: "/domaformalis_cgu.html", destination: "/fr/cgu", permanent: true },
      { source: "/domaformalis_mentionslegales.html", destination: "/fr/legal", permanent: true },
      {
        source: "/domaformalis_politiquedeconfidentialite.html",
        destination: "/fr/confidentialite",
        permanent: true,
      },

      // 3) /boutique -> formations (la boutique n'existe plus)
      { source: "/boutique", destination: "/fr/formations", permanent: true },
      { source: "/:lang(fr|en|es|bg)/boutique", destination: "/:lang/formations", permanent: true },

      // 4) Racine sans langue -> français
      { source: "/articles", destination: "/fr/articles", permanent: false },
      { source: "/articles/:slug", destination: "/fr/articles/:slug", permanent: false },
    ];
  },
};

export default nextConfig;
