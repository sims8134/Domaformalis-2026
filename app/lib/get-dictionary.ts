const dictionaries = {
  fr: () => import('../../messages/fr.json').then((module) => module.default),
  en: () => import('../../messages/en.json').then((module) => module.default),
  es: () => import('../../messages/es.json').then((module) => module.default),
  bg: () => import('../../messages/bg.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  // On s'assure de tomber sur le français si la langue demandée n'existe pas
  return (dictionaries as any)[locale]?.() ?? dictionaries.fr();
};