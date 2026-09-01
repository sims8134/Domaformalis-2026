import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { LOCALES } from "./seo";

const CONTENT_DIR = path.join(process.cwd(), "content", "articles");
/** Alias historique : la liste des locales vit désormais dans seo.ts. */
export const LANGS = LOCALES;
export type Category = "securite-en-ligne" | "reseaux-sociaux" | "ia";

export type ArticleMeta = {
  slug: string; order: string; lang: string; title: string; description: string;
  date: string; category: Category; level: string; image: string;
  imageCredit?: string; fiche?: string; tags: string[]; draft: boolean;
};
export type Article = ArticleMeta & { contentHtml: string };

export const CATEGORY_LABELS: Record<Category, Record<string, string>> = {
  "securite-en-ligne": { fr: "Sécurité Internet", en: "Internet Security", es: "Seguridad en Internet", bg: "Сигурност в интернет" },
  "reseaux-sociaux":   { fr: "Réseaux sociaux", en: "Social Media", es: "Redes sociales", bg: "Социални мрежи" },
  ia:                  { fr: "Intelligence artificielle", en: "Artificial Intelligence", es: "Inteligencia artificial", bg: "Изкуствен интелект" },
};
export const CATEGORY_ORDER: Category[] = ["securite-en-ligne", "reseaux-sociaux", "ia"];

const strip = (s: string) => s.replace(/\.md$/, "").replace(/^\d+-/, "");

function parse(raw: string, file: string, lang: string): ArticleMeta {
  const { data } = matter(raw);
  const fileSlug = strip(file);
  return {
    slug: (data.slug && String(data.slug).trim()) || fileSlug,
    order: file.replace(/\.md$/, ""),
    lang,
    title: data.title ?? fileSlug,
    description: data.description ?? "",
    date: data.date ?? "",
    category: (data.category ?? "securite-en-ligne") as Category,
    level: data.level ?? "debutant",
    image: data.image ?? "/img/og-default.jpg",
    imageCredit: data.imageCredit ?? "",
    fiche: data.fiche ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    draft: data.draft === true,
  };
}

function readAll(lang: string) {
  const dir = path.join(CONTENT_DIR, lang);
  if (!fs.existsSync(dir)) return [] as { file: string; raw: string }[];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort()
    .map((f) => ({ file: f, raw: fs.readFileSync(path.join(dir, f), "utf8") }));
}

export function getAllArticles(lang: string): ArticleMeta[] {
  return readAll(lang).map(({ file, raw }) => parse(raw, file, lang)).filter((a) => !(process.env.NODE_ENV === "production" && a.draft)).sort((a, b) => a.order.localeCompare(b.order));
}

export async function getArticle(lang: string, slug: string): Promise<Article | null> {
  const want = strip(slug);
  const hit = readAll(lang).find(({ file, raw }) => {
    const { data } = matter(raw);
    return String(data.slug ?? "") === want || strip(file) === want;
  });
  if (!hit) return null;
  const meta = parse(hit.raw, hit.file, lang);
  let { content } = matter(hit.raw);
  // Retire la section finale "Pour aller plus loin" : le composant affiche déjà
  // le bouton fiche, le sommaire du parcours et la navigation précédent/suivant.
  content = content.split(/\n#{2,3}\s*(?:Pour aller plus loin|Para ir más lejos|To go further|За да продължите)\s*\n/i)[0].trimEnd();
  const processed = await remark().use(html, { sanitize: false }).process(content);
  return { ...meta, contentHtml: processed.toString() };
}

export function getSiblings(lang: string, slug: string) {
  const want = strip(slug);
  const all = getAllArticles(lang);
  const current = all.find((a) => a.slug === want || strip(a.order) === want);
  if (!current) return { prev: null, next: null, serie: [] as ArticleMeta[] };
  const serie = all.filter((a) => a.category === current.category);
  const i = serie.findIndex((a) => a.slug === current.slug);
  return { prev: i > 0 ? serie[i - 1] : null, next: i < serie.length - 1 ? serie[i + 1] : null, serie };
}

export function getArticlesByCategory(lang: string) {
  const all = getAllArticles(lang);
  return CATEGORY_ORDER.map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat][lang] ?? CATEGORY_LABELS[cat].fr,
    articles: all.filter((a) => a.category === cat),
  })).filter((g) => g.articles.length > 0);
}

export function getAllParams() {
  const out: { lang: string; slug: string }[] = [];
  for (const lang of LANGS) for (const a of getAllArticles(lang)) out.push({ lang, slug: a.slug });
  return out;
}
/**
 * Chemins `/articles/<slug>` de l'article dans chaque langue où il existe.
 * Les slugs étant traduits, la correspondance passe par le numéro d'ordre du
 * fichier (01-, 02-…). Une langue sans équivalent est simplement absente de
 * la map : aucune URL n'est construite sans avoir été vérifiée.
 */
export function getArticlePathsByLang(slug: string): Record<string, string> {
  const want = strip(slug);
  const byLang: Record<string, ArticleMeta[]> = {};
  for (const l of LANGS) byLang[l] = getAllArticles(l);

  // Numéro d'ordre de l'article, quelle que soit la langue du slug reçu.
  let num: string | undefined;
  for (const l of LANGS) {
    const found = byLang[l].find((a) => a.slug === want || strip(a.order) === want);
    if (found) {
      num = found.order.match(/^(\d+)-/)?.[1];
      break;
    }
  }
  if (!num) return {};

  const out: Record<string, string> = {};
  for (const l of LANGS) {
    const twin = byLang[l].find((a) => a.order.startsWith(`${num}-`));
    if (twin) out[l] = `/articles/${twin.slug}`;
  }
  return out;
}

/** Retrouve l'équivalent d'un slug dans une autre langue (via le numéro d'ordre du fichier). */
export function resolveSlugInLang(targetLang: string, slug: string): string | null {
  const want = slug.replace(/\.md$/, "").replace(/^\d+-/, "");
  for (const l of LANGS) {
    const found = getAllArticles(l).find((a) => a.slug === want);
    if (!found) continue;
    const num = found.order.match(/^(\d+)-/)?.[1];
    if (!num) return null;
    const local = getAllArticles(targetLang).find((a) => a.order.startsWith(num + "-"));
    return local ? local.slug : null;
  }
  return null;
}