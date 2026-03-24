"use client";

import { useState } from "react";

interface Props {
  lang: string;
  dict: any;
}

export default function NewsletterForm({ lang, dict }: Props) {
  const t = dict?.newsletter;
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState("idle" as "idle" | "loading" | "success" | "error" | "already");
  const [errorMsg, setErrorMsg] = useState("");

  if (!t) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmed || !emailRegex.test(trimmed)) {
      setStatus("error");
      setErrorMsg(t.emailInvalid);
      return;
    }

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, lang, honeypot }),
      });

      const data = await res.json();

      if (data.ok) {
        setStatus("success");
        setEmail("");
      } else if (data.error === "already_subscribed") {
        setStatus("already");
      } else if (data.error === "email_invalid") {
        setStatus("error");
        setErrorMsg(t.emailInvalid);
      } else {
        setStatus("error");
        setErrorMsg(t.error);
      }
    } catch {
      setStatus("error");
      setErrorMsg(t.error);
    }
  }

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <p style={{ color: "#22c55e", fontSize: "14px" }}>{t.success}</p>
      </div>
    );
  }

  if (status === "already") {
    return (
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <p style={{ color: "#eab308", fontSize: "14px" }}>{t.already}</p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", maxWidth: "480px", margin: "0 auto" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
          required
          style={{
            flex: 1,
            padding: "12px 16px",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            fontSize: "14px",
            outline: "none",
            background: "#fff",
            color: "#1e293b",
          }}
        />
        <input
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", opacity: 0 }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            padding: "12px 24px",
            background: "#0cc0df",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            opacity: status === "loading" ? 0.6 : 1,
            whiteSpace: "nowrap",
          }}
        >
          {status === "loading" ? t.sending : t.button}
        </button>
      </form>
      {status === "error" && errorMsg && (
        <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "8px", textAlign: "center" }}>{errorMsg}</p>
      )}
    </div>
  );
}