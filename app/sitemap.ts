import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://domaformalis.com";
  
  // 1. Tes langues
  const locales = ["fr", "en", "es", "bg"];
  
  // 2. Toutes tes routes (basé sur ton build de tout à l'heure)
  const pages = [
    "",
    "/formations",
    "/ressources",
    "/quisommesnous",
    "/contact",
    "/membres",
    "/legal",
    "/cgu",
    "/confidentialite"
  ];

  const entries: MetadataRoute.Sitemap = [];

  // 3. On génère automatiquement la grille complète (Langue x Page)
  locales.forEach((lang) => {
    pages.forEach((page) => {
      entries.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        // Priorité haute pour l'accueil, moyenne pour les pages, basse pour le légal
        priority: page === "" ? 1.0 : (page === "/legal" || page === "/cgu" ? 0.3 : 0.8),
      });
    });
  });

  return entries;
}