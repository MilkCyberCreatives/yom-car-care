import type { Metadata } from "next";
import ContactFormClient from "./ContactFormClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with YOM Car Care. Call, WhatsApp, or send us a message - fast local support in Lubumbashi.",
};

const PHONE_DISPLAY = "+243 84 899 4045";
const PHONE_TEL = "+243848994045";
const EMAIL = "info@yomcarcare.com";
const ADDRESS_TEXT = "538 Avenue Kipopo, Golf Malela, Lubumbashi";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=538+Avenue+Kipopo,+Golf+Malela,+Lubumbashi";
const WHATSAPP_URL = "https://wa.me/243848994045";

const HOURS: { day: string; time: string }[] = [
  { day: "Monday - Friday", time: "09:00 - 18:00" },
  { day: "Saturday", time: "10:00 - 16:00" },
  { day: "Sunday", time: "Closed" },
];

export default function ContactPage() {
  return (
    <main className="flex flex-col">
      {/* Content */}
      <section className="container-px py-10 md:py-14">
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left: Contact details */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6 text-white">
              <h2 className="text-xl font-semibold">Contact Details</h2>
              <div className="mt-4 space-y-3 text-white/80">
                <p>
                  <span className="block text-xs text-white/60">Phone</span>
                  <a href={`tel:${PHONE_TEL}`} className="hover:underline">
                    {PHONE_DISPLAY}
                  </a>
                </p>
                <p>
                  <span className="block text-xs text-white/60">Email</span>
                  <a href={`mailto:${EMAIL}`} className="hover:underline">
                    {EMAIL}
                  </a>
                </p>
                <p>
                  <span className="block text-xs text-white/60">Address</span>
                  {ADDRESS_TEXT}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  Open in Maps
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6 text-white">
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
            <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6 text-white md:p-8">
              <h2 className="text-xl font-semibold md:text-2xl">Send us a message</h2>
              <p className="mt-1 text-sm text-white/70">
                Tell us what you need help with - exterior, interior, detailing or accessories.
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
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-zinc-900 p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <h3 className="text-xl font-bold md:text-2xl">Prefer a quick chat?</h3>
            <p className="mt-1 text-white/70">Message us on WhatsApp and we will respond fast.</p>
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
