import { MetadataRoute } from 'next'
import { getAllArticles } from '@/app/lib/articles'
import { PARCOURS } from '@/app/lib/parcours'
import { getAllLangueParams } from '@/app/lib/langues'
import { BASE_URL, LOCALES } from '@/app/lib/seo'

const baseUrl = BASE_URL;
const locales = [...LOCALES];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // ---------------------------------------------------------------
  // 1. Pages statiques
  //    NB : /articles n'y figure pas — la route redirige vers /formations
  //    (app/[lang]/articles/page.tsx). Une URL qui redirige dans un sitemap
  //    est signalée en erreur par la Search Console.
  // ---------------------------------------------------------------
  const pages = [
    "",
    "/formations",
    "/ressources",
    "/membres",
    "/quisommesnous",
    "/contact",
    "/legal",
    "/cgu",
    "/confidentialite",
  ];

  pages.forEach((page) => {
    locales.forEach((lang) => {
      entries.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? 'weekly' : 'monthly',
        priority:
          page === "" ? 1.0
          : page === "/formations" ? 0.9
          : page === "/legal" || page === "/cgu" || page === "/confidentialite" ? 0.3
          : 0.7,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}${page}`])),
        },
      });
    });
  });

  // ---------------------------------------------------------------
  // 2. Parcours (3 × 4 langues)
  // ---------------------------------------------------------------
  PARCOURS.forEach((p) => {
    locales.forEach((lang) => {
      entries.push({
        url: `${baseUrl}/${lang}/formations/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/formations/${p.slug}`])
          ),
        },
      });
    });
  });

  // ---------------------------------------------------------------
  // 3. Cours de langues (2 × 4 langues)
  //    Les paramètres viennent de getAllLangueParams(), la même source que
  //    le generateStaticParams de la page : un cours ajouté à
  //    LANGUE_COURSES entre ici automatiquement.
  // ---------------------------------------------------------------
  getAllLangueParams().forEach(({ lang, cours }) => {
    entries.push({
      url: `${baseUrl}/${lang}/langues/${cours}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/langues/${cours}`])
        ),
      },
    });
  });

  // ---------------------------------------------------------------
  // 4. Articles (13 × 4 langues)
  //    Les slugs diffèrent d'une langue à l'autre : on les relie par
  //    leur numéro d'ordre pour générer des alternates corrects.
  // ---------------------------------------------------------------
  const byLang = Object.fromEntries(locales.map((l) => [l, getAllArticles(l)]));

  locales.forEach((lang) => {
    byLang[lang].forEach((article) => {
      const num = article.order.match(/^(\d+)-/)?.[1];

      const languages = Object.fromEntries(
        locales
          .map((l) => {
            const twin = num
              ? byLang[l].find((a) => a.order.startsWith(`${num}-`))
              : byLang[l].find((a) => a.slug === article.slug);
            return twin ? [l, `${baseUrl}/${l}/articles/${twin.slug}`] : null;
          })
          .filter(Boolean) as [string, string][]
      );

      entries.push({
        url: `${baseUrl}/${lang}/articles/${article.slug}`,
        lastModified: article.date ? new Date(article.date) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: { languages },
      });
    });
  });

  return entries;
}
