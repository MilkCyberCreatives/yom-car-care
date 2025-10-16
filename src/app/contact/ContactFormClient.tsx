"use client";

import { useState } from "react";

const WHATSAPP_URL = "https://wa.me/243848994045";
const EMAIL = "info@yomcarcare.com";

export default function ContactFormClient() {
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setOk(null);

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const phone = String(form.get("phone") || "");
    const email = String(form.get("email") || "");
    const message = String(form.get("message") || "");

    // Open WhatsApp with prefilled text (no backend required)
    const text =
      `Hello YOM Car Care,%0A%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `Phone: ${encodeURIComponent(phone)}%0A` +
      `Email: ${encodeURIComponent(email)}%0A%0A` +
      `${encodeURIComponent(message)}`;

    try {
      window.open(`${WHATSAPP_URL}?text=${text}`, "_blank");
      setOk(true);
      (e.target as HTMLFormElement).reset();
    } catch {
      setOk(false);
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="col-span-1">
        <label className="block text-sm text-white/70 mb-1">Name</label>
        <input
          name="name"
          required
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
          placeholder="Your name"
        />
      </div>
      <div className="col-span-1">
        <label className="block text-sm text-white/70 mb-1">Phone</label>
        <input
          name="phone"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
          placeholder="+243…"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm text-white/70 mb-1">Email</label>
        <input
          type="email"
          name="email"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
          placeholder="you@example.com"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm text-white/70 mb-1">Message</label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
          placeholder="How can we help?"
        />
      </div>
      <div className="md:col-span-2 flex items-center gap-3">
        <button type="submit" className="btn-primary disabled:opacity-70" disabled={sending}>
          {sending ? "Opening WhatsApp…" : "Send via WhatsApp"}
        </button>
        <a href={`mailto:${EMAIL}`} className="btn-ghost">
          Or email us
        </a>
        {ok === true && (
          <span className="text-green-400 text-sm">Opened WhatsApp in a new tab.</span>
        )}
        {ok === false && (
          <span className="text-red-400 text-sm">Could not open WhatsApp.</span>
        )}
      </div>
    </form>
  );
}
