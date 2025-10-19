"use client";

import { useState } from "react";

export default function ContactFormClient({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<"idle"|"sending"|"ok"|"error">("idle");
  const [err, setErr] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErr("");

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
      form.reset();
    } catch (e: any) {
      setStatus("error");
      setErr(e?.message || "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      {/* Honeypot */}
      <input type="text" name="hp" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-white/70 mb-1">Name *</label>
          <input
            name="name"
            required
            className="w-full rounded-xl border border-white/10 bg-zinc-800/60 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm text-white/70 mb-1">Email *</label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-xl border border-white/10 bg-zinc-800/60 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm text-white/70 mb-1">Phone</label>
          <input
            name="phone"
            className="w-full rounded-xl border border-white/10 bg-zinc-800/60 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder="+243 ..."
          />
        </div>
        <div>
          <label className="block text-sm text-white/70 mb-1">Subject</label>
          <input
            name="subject"
            className="w-full rounded-xl border border-white/10 bg-zinc-800/60 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder="Product enquiry"
            defaultValue="Product enquiry"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-white/70 mb-1">Message *</label>
          <textarea
            name="message"
            required
            rows={5}
            className="w-full rounded-xl border border-white/10 bg-zinc-800/60 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder="Tell us what you need help with..."
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send message"}
        </button>
        {status === "ok" && (
          <span className="text-emerald-400 text-sm">Thanks! We’ve received your message.</span>
        )}
        {status === "error" && (
          <span className="text-red-400 text-sm">Error: {err}</span>
        )}
      </div>
    </form>
  );
}
