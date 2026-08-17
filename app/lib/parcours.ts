import type { Category } from "./articles";

export type Parcours = {
  slug: string;                         // URL : /[lang]/formations/[slug]
  category: Category;                   // clé de liaison avec les articles
  guide?: { file: string; pages: number } | null; // ebook associé (public/Ebook-Guides/)
  icon: string;
  color: string;
  i18n: Record<string, { name: string; promise: string; forWho: string; goals: string[] }>;
};

export const PARCOURS: Parcours[] = [
  {
    slug: "securite-internet",
    category: "securite-en-ligne",
    guide: { file: "/Ebook-Guides/domaformalis_ebook_internet_arnaques.pdf", pages: 17 },
    icon: "🔒",
    color: "#0097b2",
    i18n: {
      fr: {
        name: "Sécurité Internet",
        promise:
          "Prévenir les arnaques, détecter le phishing, réduire votre exposition et réagir si un compte est compromis.",
        forWho: "Toute personne qui utilise internet au quotidien — aucun prérequis technique.",
        goals: [
          "Repérer un site frauduleux et un message de phishing en quelques secondes",
          "Protéger vos comptes avec un gestionnaire de mots de passe et la double authentification",
          "Réduire les données que vous exposez sans le savoir",
          "Savoir quoi faire, et dans quel ordre, si un compte est piraté",
        ],
      },
      en: {
        name: "Internet Security",
        promise:
          "Prevent scams, detect phishing, reduce your exposure and react when an account is compromised.",
        forWho: "Anyone who uses the internet daily — no technical background needed.",
        goals: [
          "Spot a fraudulent site and a phishing message in seconds",
          "Protect your accounts with a password manager and two-factor authentication",
          "Reduce the data you expose without knowing it",
          "Know what to do, and in what order, when an account is hacked",
        ],
      },
      es: {
        name: "Seguridad en Internet",
        promise:
          "Prevenir estafas, detectar el phishing, reducir tu exposición y reaccionar si una cuenta es comprometida.",
        forWho: "Cualquier persona que use internet a diario — sin requisitos técnicos.",
        goals: [
          "Detectar un sitio fraudulento y un mensaje de phishing en segundos",
          "Proteger tus cuentas con un gestor de contraseñas y la doble autenticación",
          "Reducir los datos que expones sin saberlo",
          "Saber qué hacer, y en qué orden, si una cuenta es pirateada",
        ],
      },
      bg: {
        name: "Сигурност в интернет",
        promise:
          "Предотвратяване на измами, разпознаване на фишинг, намаляване на видимостта и реакция при компрометиран акаунт.",
        forWho: "Всеки, който използва интернет ежедневно — без технически предпоставки.",
        goals: [
          "Разпознаване на измамен сайт и фишинг съобщение за секунди",
          "Защита на акаунтите с мениджър на пароли и двуфакторна автентикация",
          "Намаляване на данните, които излагате, без да знаете",
          "Какво да правите и в какъв ред при хакнат акаунт",
        ],
      },
    },
  },
  {
    slug: "reseaux-sociaux",
    category: "reseaux-sociaux",
    guide: { file: "/Ebook-Guides/domaformalis_ebook_jeunes_reseaux.pdf", pages: 18 },
    icon: "💬",
    color: "#7ed957",
    i18n: {
      fr: {
        name: "Réseaux sociaux",
        promise:
          "Protéger son profil, régler TikTok et Snapchat, garder le contrôle de son temps d'écran et faire face au cyberharcèlement.",
        forWho:
          "Utilisateurs de tous âges, parents et éducateurs qui accompagnent un jeune en ligne.",
        goals: [
          "Verrouiller la confidentialité de vos comptes en quelques minutes",
          "Reconnaître les 4 signaux d'alerte d'un contact douteux",
          "Reprendre la main sur votre temps d'écran par l'environnement, pas par la volonté",
          "Détecter et faire cesser une situation de cyberharcèlement",
        ],
      },
      en: {
        name: "Social Media",
        promise:
          "Protect your profile, set up TikTok and Snapchat, control your screen time and handle cyberbullying.",
        forWho: "Users of all ages, parents and educators supporting a young person online.",
        goals: [
          "Lock down your accounts' privacy in minutes",
          "Recognize the 4 warning signs of a suspicious contact",
          "Take back control of your screen time through environment, not willpower",
          "Detect and stop a cyberbullying situation",
        ],
      },
      es: {
        name: "Redes sociales",
        promise:
          "Proteger tu perfil, configurar TikTok y Snapchat, controlar tu tiempo de pantalla y afrontar el ciberacoso.",
        forWho:
          "Usuarios de todas las edades, padres y educadores que acompañan a un joven en línea.",
        goals: [
          "Blindar la privacidad de tus cuentas en pocos minutos",
          "Reconocer las 4 señales de alerta de un contacto sospechoso",
          "Recuperar el control del tiempo de pantalla mediante el entorno, no la voluntad",
          "Detectar y hacer cesar una situación de ciberacoso",
        ],
      },
      bg: {
        name: "Социални мрежи",
        promise:
          "Защита на профила, настройки на TikTok и Snapchat, контрол над екранното време и реакция при кибертормоз.",
        forWho: "Потребители от всички възрасти, родители и учители, които подкрепят млад човек онлайн.",
        goals: [
          "Заключване на поверителността на акаунтите за минути",
          "Разпознаване на 4-те сигнала за съмнителен контакт",
          "Връщане на контрола над екранното време чрез средата, не чрез волята",
          "Разпознаване и прекратяване на кибертормоз",
        ],
      },
    },
  },
  {
    slug: "comprendre-ia",
    category: "ia",
    guide: null, // guide IA à venir — le formulaire mesure la demande
    icon: "🤖",
    color: "#006b80",
    i18n: {
      fr: {
        name: "Comprendre l'IA",
        promise:
          "Utiliser les assistants IA sans se faire piéger : vérifier, protéger ses données, repérer les deepfakes et connaître ses droits.",
        forWho: "Débutants complets comme utilisateurs réguliers qui veulent comprendre ce qu'ils utilisent.",
        goals: [
          "Comprendre ce qu'une IA fait vraiment — et ce qu'elle ne fait pas",
          "Formuler des demandes précises et vérifier les réponses",
          "Ne jamais exposer de données sensibles dans un outil public",
          "Reconnaître un deepfake par le contexte et connaître vos droits européens",
        ],
      },
      en: {
        name: "Understanding AI",
        promise:
          "Use AI assistants without getting caught: verify, protect your data, spot deepfakes and know your rights.",
        forWho: "Complete beginners and regular users who want to understand what they're using.",
        goals: [
          "Understand what an AI really does — and what it doesn't",
          "Write precise prompts and verify the answers",
          "Never expose sensitive data in a public tool",
          "Recognize a deepfake by context and know your European rights",
        ],
      },
      es: {
        name: "Entender la IA",
        promise:
          "Usar los asistentes de IA sin caer en trampas: verificar, proteger tus datos, detectar deepfakes y conocer tus derechos.",
        forWho: "Principiantes absolutos y usuarios habituales que quieren entender lo que usan.",
        goals: [
          "Entender lo que una IA hace de verdad — y lo que no",
          "Formular peticiones precisas y verificar las respuestas",
          "No exponer nunca datos sensibles en una herramienta pública",
          "Reconocer un deepfake por el contexto y conocer tus derechos europeos",
        ],
      },
      bg: {
        name: "Да разберем ИИ",
        promise:
          "Използване на ИИ асистенти без капани: проверка, защита на данните, разпознаване на дийпфейкове и вашите права.",
        forWho: "Пълни начинаещи и редовни потребители, които искат да разбират какво използват.",
        goals: [
          "Какво прави наистина един ИИ — и какво не",
          "Прецизни заявки и проверка на отговорите",
          "Никакви чувствителни данни в публичен инструмент",
          "Разпознаване на дийпфейк по контекста и европейските ви права",
        ],
      },
    },
  },
];

export function getParcours(slug: string) {
  return PARCOURS.find((p) => p.slug === slug) ?? null;
}

export function getParcoursByCategory(cat: Category) {
  return PARCOURS.find((p) => p.category === cat) ?? null;
}
