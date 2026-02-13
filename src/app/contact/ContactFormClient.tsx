"use client";

import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";

type ContactFormClientProps = {
  className?: string;
  borderStyle?: "full" | "top-bottom";
};

export default function ContactFormClient({
  className = "",
  borderStyle = "full",
}: ContactFormClientProps) {
  const { locale } = useI18n();
  const isFR = locale === "fr";
  const controlClass =
    borderStyle === "top-bottom"
      ? "w-full border-y border-x-0 rounded-none border-white/20 bg-transparent px-3 py-2 text-white placeholder-white/45 focus:outline-none focus:ring-0 focus:border-white/40"
      : "w-full rounded-xl border border-white/10 bg-zinc-800/60 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20";

  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [err, setErr] = useState<string>("");
  const [okMsg, setOkMsg] = useState<string>("");

  const copy = {
    name: isFR ? "Nom *" : "Name *",
    email: "Email *",
    phone: isFR ? "Telephone" : "Phone",
    subject: isFR ? "Sujet" : "Subject",
    message: isFR ? "Message *" : "Message *",
    namePlaceholder: isFR ? "Votre nom" : "Your name",
    emailPlaceholder: isFR ? "vous@exemple.com" : "you@example.com",
    phonePlaceholder: "+243 ...",
    subjectPlaceholder: isFR ? "Demande produit" : "Product enquiry",
    subjectDefault: isFR ? "Demande produit" : "Product enquiry",
    messagePlaceholder: isFR
      ? "Dites-nous ce dont vous avez besoin..."
      : "Tell us what you need help with...",
    sending: isFR ? "Envoi..." : "Sending...",
    send: isFR ? "Envoyer le message" : "Send message",
    ok: isFR ? "Merci ! Nous avons recu votre message." : "Thanks! We have received your message.",
    error: isFR ? "Erreur" : "Error",
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErr("");
    setOkMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed");

      setStatus("ok");
      setOkMsg(String(json.message || copy.ok));
      form.reset();
    } catch (e: any) {
      setStatus("error");
      setErr(e?.message || "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      <input type="text" name="hp" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-white/70 mb-1">{copy.name}</label>
          <input
            name="name"
            required
            className={controlClass}
            placeholder={copy.namePlaceholder}
          />
        </div>
        <div>
          <label className="block text-sm text-white/70 mb-1">{copy.email}</label>
          <input
            type="email"
            name="email"
            required
            className={controlClass}
            placeholder={copy.emailPlaceholder}
          />
        </div>
        <div>
          <label className="block text-sm text-white/70 mb-1">{copy.phone}</label>
          <input
            name="phone"
            className={controlClass}
            placeholder={copy.phonePlaceholder}
          />
        </div>
        <div>
          <label className="block text-sm text-white/70 mb-1">{copy.subject}</label>
          <input
            name="subject"
            className={controlClass}
            placeholder={copy.subjectPlaceholder}
            defaultValue={copy.subjectDefault}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-white/70 mb-1">{copy.message}</label>
          <textarea
            name="message"
            required
            rows={5}
            className={controlClass}
            placeholder={copy.messagePlaceholder}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-60">
          {status === "sending" ? copy.sending : copy.send}
        </button>
        {status === "ok" && <span className="text-emerald-400 text-sm">{okMsg || copy.ok}</span>}
        {status === "error" && (
          <span className="text-red-400 text-sm">
            {copy.error}: {err}
          </span>
        )}
      </div>
    </form>
  );
}
