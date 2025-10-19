import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ContactFormClient from "./ContactFormClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with YOM Car Care. Call, WhatsApp, or send us a message—fast local support in Lubumbashi.",
};

const PHONE_DISPLAY = "+243 84 899 4045";
const PHONE_TEL = "+243848994045";
const EMAIL = "info@yomcarcare.com";
const ADDRESS_TEXT = "538 Avenue Kipopo, Golf Malela, Lubumbashi";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=538+Avenue+Kipopo,+Golf+Malela,+Lubumbashi";
const WHATSAPP_URL = "https://wa.me/243848994045";

const HOURS: { day: string; time: string }[] = [
  { day: "Monday – Friday", time: "09:00 – 18:00" },
  { day: "Saturday", time: "10:00 – 16:00" },
  { day: "Sunday", time: "Closed" },
];

export default function ContactPage() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--brand-blue)] text-white">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="container-px py-14 md:py-18 relative">
          <div className="max-w-3xl">
            <p className="uppercase tracking-wide text-white/70 text-xs mb-2">
              Contact YOM Car Care
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              We’re here to help
            </h1>
            <p className="mt-3 text-white/80 max-w-xl">
              Need a recommendation for exterior, interior or detailing? Message us and we’ll point you to the right product.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={`tel:${PHONE_TEL}`} className="btn-ghost">{PHONE_DISPLAY}</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container-px py-10 md:py-14">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left: Contact details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-zinc-900 text-white p-6">
              <h2 className="text-xl font-semibold">Contact Details</h2>
              <div className="mt-4 space-y-3 text-white/80">
                <p>
                  <span className="block text-white/60 text-xs">Phone</span>
                  <a href={`tel:${PHONE_TEL}`} className="hover:underline">
                    {PHONE_DISPLAY}
                  </a>
                </p>
                <p>
                  <span className="block text-white/60 text-xs">Email</span>
                  <a href={`mailto:${EMAIL}`} className="hover:underline">
                    {EMAIL}
                  </a>
                </p>
                <p>
                  <span className="block text-white/60 text-xs">Address</span>
                  {ADDRESS_TEXT}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  Open in Maps
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900 text-white p-6">
              <h3 className="text-lg font-semibold">Business Hours</h3>
              <ul className="mt-3 space-y-2">
                {HOURS.map((h) => (
                  <li key={h.day} className="flex items-center justify-between text-white/80">
                    <span>{h.day}</span>
                    <span className="tabular-nums">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Client-side form */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6 md:p-8 text-white">
              <h2 className="text-xl md:text-2xl font-semibold">Send us a message</h2>
              <p className="text-white/70 mt-1 text-sm">
                Tell us what you need help with—exterior, interior, detailing or accessories.
              </p>
              <div className="mt-6">
                <ContactFormClient />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-px pb-12">
        <div className="rounded-3xl border border-white/10 bg-zinc-900 text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold">Prefer a quick chat?</h3>
            <p className="text-white/70 mt-1">Message us on WhatsApp and we’ll respond fast.</p>
          </div>
          <div className="flex gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              WhatsApp Us
            </a>
            <a href={`tel:${PHONE_TEL}`} className="btn-ghost">
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
