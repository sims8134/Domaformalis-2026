/**
 * Catalogue des cours de langues.
 *
 * Différence essentielle avec les parcours numériques :
 * ici il y a DEUX axes de langue.
 *   - la langue du SITE (lang)      : dans quelle langue l'interface est affichée
 *   - la langue d'ENSEIGNEMENT (tl) : dans quelle langue le PDF explique la matière
 *
 * Un Bulgare qui apprend le français lit un PDF en bulgare ;
 * un anglophone lit le même contenu en anglais. La langue du site ne
 * détermine pas la langue du document — d'où le sélecteur.
 */

export type TeachLang = "fr" | "bg" | "es" | "en";

export type Sheet = {
  id: string;                 // segment du nom de fichier, ex. "a2-01"
  level: string;              // A1, A2, B1, B2
  title: Record<string, string>;   // titre par langue de SITE
};

export type Lesson = {
  num: number;
  pages: number;
  title: Record<string, string>;
  desc: Record<string, string>;
};

export type LangueCourse = {
  slug: string;               // /[lang]/formations/<slug>
  flag: string;
  color: string;
  teach: TeachLang[];         // langues d'enseignement disponibles
  lessonFile: (n: number, tl: TeachLang) => string;
  sheetFile: (id: string, tl: TeachLang) => string;
  i18n: Record<string, { name: string; promise: string; forWho: string; goals: string[] }>;
  lessons: Lesson[];
  sheets: Sheet[];
};

/** Libellé d'une langue d'enseignement, affiché dans le sélecteur. */
export const TEACH_LABEL: Record<TeachLang, string> = {
  fr: "Français",
  bg: "Български",
  es: "Español",
  en: "English",
};

export const TEACH_FLAG: Record<TeachLang, string> = {
  fr: "🇫🇷", bg: "🇧🇬", es: "🇪🇸", en: "🇬🇧",
};

// ---------------------------------------------------------------------------

export const LANGUE_COURSES: LangueCourse[] = [
  {
    slug: "espagnol",
    flag: "🇪🇸",
    color: "#0097b2",
    teach: ["fr", "bg", "en"],
    lessonFile: (n, tl) =>
      `/Ebook-Guides/langues/domaformalis_lecon_espagnol_${String(n).padStart(2, "0")}_${tl.toUpperCase()}.pdf`,
    sheetFile: (id, tl) =>
      `/fiches/langues/domaformalis-fiche-es-${id}-${tl.toUpperCase()}.pdf`,
    i18n: {
      fr: {
        name: "Espagnol",
        promise:
          "Lire l'espagnol dès la première leçon, se présenter, et maîtriser la distinction SER / ESTAR qui pose problème à tous les débutants.",
        forWho: "Débutants complets, et faux débutants qui veulent des bases propres.",
        goals: [
          "Lire n'importe quel texte espagnol à voix haute sans hésiter",
          "Vous présenter, dire d'où vous venez et où vous vivez",
          "Choisir entre SER et ESTAR selon le sens",
          "Construire des phrases au présent avec les trois groupes de verbes",
        ],
      },
      es: {
        name: "Español",
        promise:
          "Leer español desde la primera lección, presentarse y dominar la distinción SER / ESTAR.",
        forWho: "Principiantes absolutos y falsos principiantes.",
        goals: [
          "Leer cualquier texto español en voz alta sin dudar",
          "Presentarte, decir de dónde eres y dónde vives",
          "Elegir entre SER y ESTAR según el sentido",
          "Construir frases en presente con los tres grupos de verbos",
        ],
      },
      bg: {
        name: "Испански",
        promise:
          "Да четете испански от първия урок, да се представяте и да усвоите разликата SER / ESTAR.",
        forWho: "Пълни начинаещи и такива, които искат чиста основа.",
        goals: [
          "Да четете на глас всеки испански текст без колебание",
          "Да се представяте, да казвате откъде сте и къде живеете",
          "Да избирате между SER и ESTAR според смисъла",
          "Да съставяте изречения в сегашно време с трите групи глаголи",
        ],
      },
      en: {
        name: "Spanish",
        promise:
          "Read Spanish from the very first lesson, introduce yourself, and master the SER / ESTAR distinction.",
        forWho: "Complete beginners and anyone wanting clean foundations.",
        goals: [
          "Read any Spanish text aloud without hesitating",
          "Introduce yourself, say where you're from and where you live",
          "Choose between SER and ESTAR by meaning",
          "Build present-tense sentences across all three verb groups",
        ],
      },
    },
    lessons: [
      {
        num: 1,
        pages: 17,
        title: {
          fr: "Leçon 1 — Lire et se présenter",
          es: "Lección 1 — Leer y presentarse",
          bg: "Урок 1 — Да четем и да се представим",
          en: "Lesson 1 — Reading and introducing yourself",
        },
        desc: {
          fr: "Prononciation, pronoms, verbes pronominaux, SER et ESTAR, les trois groupes — avec exercices corrigés.",
          es: "Pronunciación, pronombres, verbos pronominales, SER y ESTAR, los tres grupos — con ejercicios corregidos.",
          bg: "Произношение, местоимения, възвратни глаголи, SER и ESTAR, трите групи — с упражнения и отговори.",
          en: "Pronunciation, pronouns, reflexive verbs, SER and ESTAR, the three groups — with corrected exercises.",
        },
      },
    ],
    sheets: [
      {
        id: "a1-01", level: "A1",
        title: {
          fr: "Lire et se présenter", es: "Leer y presentarse",
          bg: "Да четем и да се представим", en: "Reading and introducing yourself",
        },
      },
      {
        id: "a1-02", level: "A1",
        title: {
          fr: "SER, ESTAR et les trois groupes", es: "SER, ESTAR y los tres grupos",
          bg: "SER, ESTAR и трите групи", en: "SER, ESTAR and the three groups",
        },
      },
      {
        id: "b2-01", level: "B2",
        title: {
          fr: "Les phrases conditionnelles avec SI", es: "Las oraciones condicionales con SI",
          bg: "Условните изречения със SI", en: "Conditional sentences with SI",
        },
      },
    ],
  },

  // -------------------------------------------------------------------------

  {
    slug: "francais",
    flag: "🇫🇷",
    color: "#006b80",
    teach: ["bg", "es", "en"],
    lessonFile: (n, tl) =>
      `/Ebook-Guides/langues/domaformalis_lecon_francais_${String(n).padStart(2, "0")}_${tl.toUpperCase()}.pdf`,
    sheetFile: (id, tl) =>
      `/fiches/langues/domaformalis-fiche-fr-${id}-${tl.toUpperCase()}.pdf`,
    i18n: {
      fr: {
        name: "Français",
        promise:
          "Quatre leçons complètes, du premier mot au conditionnel — prononciation, passé composé, imparfait et systèmes avec SI.",
        forWho: "Débutants et niveaux intermédiaires jusqu'au B1.",
        goals: [
          "Lire le français à voix haute : nasales, lettres muettes, liaisons",
          "Raconter au passé en choisissant entre passé composé et imparfait",
          "Demander poliment : je voudrais, pourriez-vous, vous devriez",
          "Maîtriser les trois systèmes conditionnels avec SI",
        ],
      },
      es: {
        name: "Francés",
        promise:
          "Cuatro lecciones completas, de la primera palabra al condicional — pronunciación, passé composé, imperfecto y sistemas con SI.",
        forWho: "Principiantes y niveles intermedios hasta B1.",
        goals: [
          "Leer francés en voz alta: nasales, letras mudas, enlaces",
          "Contar en pasado eligiendo entre passé composé e imperfecto",
          "Pedir con cortesía: je voudrais, pourriez-vous, vous devriez",
          "Dominar los tres sistemas condicionales con SI",
        ],
      },
      bg: {
        name: "Френски",
        promise:
          "Четири пълни урока, от първата дума до условното наклонение — произношение, минали времена и системите със SI.",
        forWho: "Начинаещи и средно ниво до B1.",
        goals: [
          "Да четете френски на глас: назални звуци, неми букви",
          "Да разказвате в минало време, избирайки между двете минали",
          "Да молите учтиво: je voudrais, pourriez-vous, vous devriez",
          "Да владеете трите условни системи със SI",
        ],
      },
      en: {
        name: "French",
        promise:
          "Four complete lessons, from the first word to the conditional — pronunciation, past tenses and the SI systems.",
        forWho: "Beginners and intermediate learners up to B1.",
        goals: [
          "Read French aloud: nasal vowels, silent letters, liaison",
          "Tell a story in the past, choosing between the two past tenses",
          "Ask politely: je voudrais, pourriez-vous, vous devriez",
          "Master the three conditional systems with SI",
        ],
      },
    },
    lessons: [
      {
        num: 1, pages: 14,
        title: {
          fr: "Leçon 1 — Lire et se présenter", es: "Lección 1 — Leer y presentarse",
          bg: "Урок 1 — Да четем френски", en: "Lesson 1 — Reading French",
        },
        desc: {
          fr: "Prononciation, pronoms, être et avoir, articles et genre — avec exercices corrigés.",
          es: "Pronunciación, pronombres, être y avoir, artículos y género — con ejercicios corregidos.",
          bg: "Произношение, местоимения, être и avoir, членове и род — с упражнения и отговори.",
          en: "Pronunciation, pronouns, être and avoir, articles and gender — with corrected exercises.",
        },
      },
      {
        num: 2, pages: 18,
        title: {
          fr: "Leçon 2 — Le passé composé", es: "Lección 2 — El passé composé",
          bg: "Урок 2 — Минало свършено време", en: "Lesson 2 — The passé composé",
        },
        desc: {
          fr: "Auxiliaires avoir et être, participes, accord, et les verbes à double auxiliaire.",
          es: "Auxiliares avoir y être, participios, concordancia y los verbos de doble auxiliar.",
          bg: "Спомагателните avoir и être, причастия, съгласуване и двойните глаголи.",
          en: "The avoir and être auxiliaries, participles, agreement, and double-auxiliary verbs.",
        },
      },
      {
        num: 3, pages: 14,
        title: {
          fr: "Leçon 3 — L'imparfait", es: "Lección 3 — El imperfecto",
          bg: "Урок 3 — Имперфект", en: "Lesson 3 — The imparfait",
        },
        desc: {
          fr: "Formation, emplois, et le contraste décisif avec le passé composé.",
          es: "Formación, usos y el contraste decisivo con el passé composé.",
          bg: "Образуване, употреба и контрастът с passé composé.",
          en: "Formation, uses, and the decisive contrast with the passé composé.",
        },
      },
      {
        num: 4, pages: 15,
        title: {
          fr: "Leçon 4 — Le conditionnel", es: "Lección 4 — El condicional",
          bg: "Урок 4 — Условно наклонение", en: "Lesson 4 — The conditional",
        },
        desc: {
          fr: "Politesse, hypothèse, regret — et les trois systèmes avec SI.",
          es: "Cortesía, hipótesis, arrepentimiento — y los tres sistemas con SI.",
          bg: "Учтивост, хипотеза, съжаление — и трите системи със SI.",
          en: "Politeness, hypothesis, regret — and the three SI systems.",
        },
      },
    ],
    sheets: [
      { id: "a2-01", level: "A2", title: { fr: "Le genre des noms", es: "El género de los sustantivos", bg: "Родът на съществителните", en: "The gender of nouns" } },
      { id: "a2-02", level: "A2", title: { fr: "Les prépositions DANS et À", es: "Las preposiciones DANS y À", bg: "Предлозите DANS и À", en: "The prepositions DANS and À" } },
      { id: "a1-03", level: "A1", title: { fr: "Le partitif : du, de la, des", es: "El partitivo: du, de la, des", bg: "Частичният член", en: "The partitive: du, de la, des" } },
      { id: "a1-04", level: "A1", title: { fr: "Jours, mois et dates", es: "Días, meses y fechas", bg: "Дни, месеци и дати", en: "Days, months and dates" } },
      { id: "a2-05", level: "A2", title: { fr: "CE, CETTE, CET et QUEL", es: "CE, CETTE, CET y QUEL", bg: "CE, CETTE, CET и QUEL", en: "CE, CETTE, CET and QUEL" } },
      { id: "a2-06", level: "A2", title: { fr: "Le temps qu'il fait", es: "El tiempo que hace", bg: "Времето навън", en: "Talking about the weather" } },
      { id: "b1-07", level: "B1", title: { fr: "Les pronoms EN et Y", es: "Los pronombres EN e Y", bg: "Местоименията EN и Y", en: "The pronouns EN and Y" } },
      { id: "b1-08", level: "B1", title: { fr: "Le subjonctif présent", es: "El subjuntivo presente", bg: "Подчинителното наклонение", en: "The present subjunctive" } },
      { id: "09", level: "—", title: { fr: "Tableau des verbes (1) — réguliers", es: "Tabla de verbos (1) — regulares", bg: "Таблица на глаголите (1)", en: "Verb table (1) — regular" } },
      { id: "10", level: "—", title: { fr: "Tableau des verbes (2) — irréguliers", es: "Tabla de verbos (2) — irregulares", bg: "Таблица на глаголите (2)", en: "Verb table (2) — irregular" } },
      { id: "a2-11", level: "A2", title: { fr: "Le futur simple", es: "El futuro simple", bg: "Бъдеще време", en: "The simple future" } },
      { id: "a2-12", level: "A2", title: { fr: "Exprimer la durée", es: "Expresar la duración", bg: "Изразяване на времетраене", en: "Expressing duration" } },
      { id: "b1-13", level: "B1", title: { fr: "TOUT et ressembler à", es: "TOUT y parecerse a", bg: "TOUT и приличам на", en: "TOUT and looking like" } },
      { id: "a1-14", level: "A1", title: { fr: "Couleurs et famille", es: "Colores y familia", bg: "Цветовете и семейството", en: "Colours and family" } },
    ],
  },
];

export function getLangueCourse(slug: string) {
  return LANGUE_COURSES.find((c) => c.slug === slug) ?? null;
}

/** Langue d'enseignement par défaut : celle du site si disponible, sinon la première. */
export function defaultTeachLang(course: LangueCourse, siteLang: string): TeachLang {
  return (course.teach as string[]).includes(siteLang)
    ? (siteLang as TeachLang)
    : course.teach[0];
}
