import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // On passe en non-www pour correspondre au reste de la config
  const baseUrl = "https://domaformalis.com";

  const routes = [
    "",
    "/fr",
    "/en",
    "/es",
    "/bg",
    "/fr/formations",
    "/en/formations",
    "/es/formations",
    "/bg/formations",
    "/fr/ressources",
    "/en/ressources",
    "/es/ressources",
    "/bg/ressources",
    "/fr/contact",
    "/en/contact",
    "/es/contact",
    "/bg/contact",
    "/fr/quisommesnous",
    "/en/quisommesnous",
    "/es/quisommesnous",
    "/bg/quisommesnous"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly', // Optionnel : indique à Google que le contenu change souvent
    priority: route === "" ? 1 : 0.8, // Optionnel : la page d'accueil est la plus importante
  }));
}