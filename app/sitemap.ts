import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  const base = "https://www.domaformalis.com";

  const langs = ["fr","en","es","bg"];

  const pages = [
    "",
    "/formations",
    "/ressources",
    "/quisommesnous",
    "/contact",
    "/membres",
    "/legal",
    "/confidentialite",
    "/cgu"
  ];

  const urls = [];

  for (const lang of langs) {
    for (const page of pages) {
      urls.push({
        url: `${base}/${lang}${page}`,
        lastModified: new Date(),
      });
    }
  }

  return urls;
}