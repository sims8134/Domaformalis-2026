import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LangueCourseView from "@/components/LangueCourseView";
import {
  getAllLangueParams,
  getLangueCourse,
  defaultTeachLang,
  TEACH_LABEL,
  TEACH_FLAG,
} from "@/app/lib/langues";
import { BASE_URL, buildAlternates } from "@/app/lib/seo";


const T: Record<string, Record<string, string>> = {
  tag: { fr: "🎓 Cours de langue", en: "🎓 Language course", es: "🎓 Curso de idiomas", bg: "🎓 Езиков курс" },
  forWho: { fr: "Pour qui ?", en: "Who is it for?", es: "¿Para quién?", bg: "За кого?" },
  goals: {
    fr: "À la fin de ce parcours, vous saurez",
    en: "By the end of this course, you will be able to",
    es: "Al final de este curso, sabrás",
    bg: "В края на този курс ще можете",
  },
};
const t = (k: string, l: string) => T[k][l] ?? T[k].fr;

export async function generateStaticParams() {
  return getAllLangueParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; cours: string }>;
}): Promise<Metadata> {
  const { lang, cours } = await params;
  const c = getLangueCourse(cours);
  if (!c) return {};
  const i = c.i18n[lang] ?? c.i18n.fr;
  const url = `${BASE_URL}/${lang}/langues/${cours}`;

  return {
    title: `${i.name} — Cours gratuit avec fiches et leçons PDF | Domaformalis`,
    description: i.promise,
    alternates: buildAlternates(lang, `/langues/${cours}`),
    openGraph: {
      title: `${i.name} | Domaformalis`,
      description: i.promise,
      url,
      siteName: "Domaformalis",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      type: "website",
    },
  };
}

export default async function LanguePage({
  params,
}: {
  params: Promise<{ lang: string; cours: string }>;
}) {
  const { lang, cours } = await params;
  const c = getLangueCourse(cours);
  if (!c) notFound();

  const i = c.i18n[lang] ?? c.i18n.fr;
  const initialTeach = defaultTeachLang(c, lang);

  // Toutes les URL sont calculées côté serveur : le client ne fait que choisir.
  const lessons = c.lessons.map((l) => ({
    kind: "lesson" as const,
    key: `l${l.num}`,
    num: l.num,
    pages: l.pages,
    title: l.title[lang] ?? l.title.fr,
    desc: l.desc[lang] ?? l.desc.fr,
    files: Object.fromEntries(c.teach.map((tl) => [tl, c.lessonFile(l.num, tl)])),
  }));

  const sheets = c.sheets.map((s) => ({
    kind: "sheet" as const,
    key: s.id,
    level: s.level,
    title: s.title[lang] ?? s.title.fr,
    files: Object.fromEntries(c.teach.map((tl) => [tl, c.sheetFile(s.id, tl)])),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: i.name,
    description: i.promise,
    inLanguage: lang,
    isAccessibleForFree: true,
    teaches: i.name,
    provider: { "@type": "Organization", name: "Domaformalis", url: BASE_URL },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${c.lessons.length * 90}M`,
    },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="hero-tag">{t("tag", lang)}</span>
          <h1>
            {c.flag} <span>{i.name}</span>
          </h1>
          <p>{i.promise}</p>
        </div>
      </section>

      <section className="parcours-intro">
        <div className="parcours-inner">
          <div className="parcours-box">
            <h2>{t("forWho", lang)}</h2>
            <p>{i.forWho}</p>
          </div>
          <div className="parcours-box">
            <h2>{t("goals", lang)}</h2>
            <ul>
              {i.goals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <LangueCourseView
        lang={lang}
        teachLangs={c.teach}
        teachLabels={TEACH_LABEL}
        teachFlags={TEACH_FLAG}
        initialTeach={initialTeach}
        lessons={lessons}
        sheets={sheets}
      />
    </main>
  );
}
