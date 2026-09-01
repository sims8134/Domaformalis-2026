/**
 * Source unique des locales du site et construction des balises
 * `canonical` + `hreflang`.
 *
 * NB : le layout ne déclare volontairement aucun `alternates` (un canonical
 * défini là serait hérité par toutes les pages qui n'en redéfinissent pas).
 * Chaque page appelle `buildAlternates` dans son `generateMetadata`.
 */

export const BASE_URL = "https://domaformalis.com";

export const LOCALES = ["fr", "en", "es", "bg"] as const;
export type Locale = (typeof LOCALES)[number];

/** Langue servie par défaut (cf. proxy.ts) : cible du `x-default`. */
export const DEFAULT_LOCALE: Locale = "fr";

export type Alternates = { canonical: string; languages: Record<string, string> };

/** URL absolue d'un chemin dans une langue. `path` commence par "/" ou est "". */
export const localeUrl = (lang: string, path: string) => `${BASE_URL}/${lang}${path}`;

/**
 * Construit l'objet `alternates` de Next : canonical + hreflang des 4 langues.
 *
 * @param lang       langue de la page courante. Elle figure dans `languages`
 *                   (self-referencing hreflang, exigé par Google).
 * @param path       chemin après la locale, "/" initial — "" pour l'accueil,
 *                   "/formations", "/langues/espagnol"…
 * @param pathByLang routes dont le slug est traduit (articles) : chemin par
 *                   langue. Une langue absente de cette map n'obtient AUCUN
 *                   hreflang — on ne construit jamais une URL non vérifiée.
 *                   Omis => `path` est identique dans les 4 langues.
 */
export function buildAlternates(
  lang: string,
  path: string,
  pathByLang?: Record<string, string>,
): Alternates {
  const languages: Record<string, string> = {};

  for (const l of LOCALES) {
    const p = pathByLang ? pathByLang[l] : path;
    if (p === undefined) continue; // traduction inexistante : pas de hreflang
    languages[l] = localeUrl(l, p);
  }

  // x-default pointe sur le français, et seulement s'il existe réellement.
  if (languages[DEFAULT_LOCALE]) languages["x-default"] = languages[DEFAULT_LOCALE];

  const self = pathByLang ? pathByLang[lang] : path;
  return { canonical: localeUrl(lang, self ?? path), languages };
}
