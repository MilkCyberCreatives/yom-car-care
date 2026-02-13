"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const disabled = status === "submitting";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus("success");
        setSuccessMessage(String(data.message || "Thanks! We have received your message."));
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
        return;
      }

      setError(data?.error || "Could not send message.");
      setStatus("error");
    } catch {
      setError("Network error. Please try again or use WhatsApp.");
      setStatus("error");
    }
  };

  const waText = encodeURIComponent(
    `Hello YOM Car Care, my name is ${name || "(your name)"}. ${
      subject ? `Subject: ${subject}. ` : ""
    }Message: ${message || "(your message)"}`
  );

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none"
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone (optional)"
          className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none"
        />
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject (optional)"
          className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none"
        />
      </div>

      <textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your message"
        rows={6}
        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none"
      />

      <div className="flex flex-wrap gap-2">
        <button type="submit" disabled={disabled} className="btn-primary">
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
        <a
          href={`https://wa.me/243848994045?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          WhatsApp instead
        </a>
      </div>

      {status === "success" && <p className="text-sm text-green-400">{successMessage}</p>}
      {status === "error" && <p className="text-sm text-red-400">{error}</p>}

      <p className="text-xs text-white/50">
        By sending this form you agree to our Privacy & Cookie Policy.
      </p>
    </form>
  );
}
