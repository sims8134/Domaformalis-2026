import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Pages transactionnelles de la newsletter : jamais indexées.
      // Le joker couvre les 4 préfixes de langue (/fr, /en, /es, /bg).
      disallow: ["/*/newsletter-confirmed", "/*/newsletter-unsubscribe"],
    },
    // On retire le "www" pour être cohérent avec ton choix d'URL principale
    sitemap: "https://domaformalis.com/sitemap.xml",
  };
}