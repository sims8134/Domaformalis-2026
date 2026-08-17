"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  lang: string;
  dict: any;
}

const LANGS = [
  { code: "fr", flag: "https://flagcdn.com/w40/fr.png", label: "Français" },
  { code: "es", flag: "https://flagcdn.com/w40/es.png", label: "Español" },
  { code: "bg", flag: "https://flagcdn.com/w40/bg.png", label: "Български" },
  { code: "en", flag: "https://flagcdn.com/w40/gb.png", label: "English" },
];

export default function Header({ lang, dict }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Fonction pour changer de langue proprement
  const switchLanguage = (newLang: string) => {
    // On remplace le code langue dans l'URL actuelle
    const segments = pathname.split("/");
    segments[1] = newLang;
    router.push(segments.join("/"));
  };

  return (
    <header>
      <nav aria-label="Navigation principale">
        <div className="nav-logo">
          <Link href={`/${lang}`} onClick={closeMenu}>
            <img src="/img/logo_domaformalis.svg" alt="Domaformalis — accueil" />
          </Link>
        </div>

        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <Link href={`/${lang}`} className={pathname === `/${lang}` ? "active" : ""} onClick={closeMenu}>
            {dict.home}
          </Link>
          <Link
            href={`/${lang}/formations`}
            className={pathname.includes("/formations") || pathname.includes("/articles") || pathname.includes("/langues") ? "active" : ""}
            onClick={closeMenu}
          >
            {dict.formations}
          </Link>
          <Link href={`/${lang}/ressources`} className={pathname.includes("/ressources") ? "active" : ""} onClick={closeMenu}>
            {dict.ressources}
          </Link>
          <Link href={`/${lang}/quisommesnous`} className={pathname.includes("/quisommesnous") ? "active" : ""} onClick={closeMenu}>
            {dict.about}
          </Link>
          <Link href={`/${lang}/contact`} className={pathname.includes("/contact") ? "active" : ""} onClick={closeMenu}>
            {dict.contact}
          </Link>
          <Link href={`/${lang}/membres`} className="nav-cta" onClick={closeMenu}>
            {dict.members}
          </Link>
        </div>

        <div className="lang-switcher" role="group" aria-label="Langue du site">
          {LANGS.map((l) => (
            <button
              key={l.code}
              className={`lang-btn ${lang === l.code ? "active" : ""}`}
              onClick={() => switchLanguage(l.code)}
              aria-label={l.label}
              aria-pressed={lang === l.code}
            >
              <img src={l.flag} alt="" aria-hidden="true" />
            </button>
          ))}
        </div>

        <button
          type="button"
          className="burger"
          onClick={toggleMenu}
          aria-label="Menu"
          aria-expanded={isMenuOpen}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
    </header>
  );
}
