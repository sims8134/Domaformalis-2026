export default function sitemap() {
  const baseUrl = "https://www.domaformalis.com";

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
  }));
}