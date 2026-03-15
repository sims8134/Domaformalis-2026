"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  lang: string;
  dict: any;
}

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
      <nav>
        <div className="nav-logo">
          <Link href={`/${lang}`} onClick={closeMenu}>
            <img src="/img/logo_domaformalis.svg" alt="Logo" />
          </Link>
        </div>

        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <Link href={`/${lang}`} className={pathname === `/${lang}` ? "active" : ""} onClick={closeMenu}>
            {dict.home}
          </Link>
          <Link href={`/${lang}/formations`} className={pathname.includes("/formations") ? "active" : ""} onClick={closeMenu}>
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

        <div className="lang-switcher">
          <button className={`lang-btn ${lang === "fr" ? "active" : ""}`} onClick={() => switchLanguage("fr")}>
            <img src="https://flagcdn.com/w40/fr.png" alt="FR" />
          </button>
          <button className={`lang-btn ${lang === "es" ? "active" : ""}`} onClick={() => switchLanguage("es")}>
            <img src="https://flagcdn.com/w40/es.png" alt="ES" />
          </button>
          <button className={`lang-btn ${lang === "bg" ? "active" : ""}`} onClick={() => switchLanguage("bg")}>
            <img src="https://flagcdn.com/w40/bg.png" alt="BG" />
          </button>
          <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => switchLanguage("en")}>
            <img src="https://flagcdn.com/w40/gb.png" alt="EN" />
          </button>
        </div>

        <div className="burger" onClick={toggleMenu}>
          <span></span><span></span><span></span>
        </div>
      </nav>
    </header>
  );
}