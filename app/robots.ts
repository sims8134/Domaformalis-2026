import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Bloc 2 : On interdit l'indexation des pages de confirmation/désinscription
      disallow: [
        "/newsletter-confirmed", 
        "/unsubscribed",
        "/en/newsletter-confirmed", // Si tu as des routes multilingues
        "/en/unsubscribed"
      ],
    },
    // On retire le "www" pour être cohérent avec ton choix d'URL principale
    sitemap: "https://domaformalis.com/sitemap.xml",
  };
}