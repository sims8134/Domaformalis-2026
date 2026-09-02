"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Seul élément interactif du bloc de partage : les quatre autres boutons sont
 * de simples liens rendus côté serveur. Aucun SDK, aucun script tiers.
 */
export default function CopyLinkButton({
  url,
  label,
  copiedLabel,
}: {
  url: string;
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Navigateur sans API presse-papiers, ou permission refusée :
      // on retombe sur une sélection manuelle plutôt que d'échouer en silence.
      window.prompt(label, url);
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`article-share-btn article-share-copy${copied ? " is-copied" : ""}`}
      aria-label={label}
    >
      {copied ? (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
          <path
            d="M20 6L9 17l-5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
          <path
            d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7L12 19"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
