import type { Metadata } from "next";

import ContactFormClient from "../../contact/ContactFormClient";
import { localeAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact YOM Car Care",
  description: "Contactez YOM Car Care a Lubumbashi par telephone, WhatsApp ou formulaire.",
  alternates: {
    canonical: "/fr/contact",
    languages: localeAlternates("/contact"),
  },
};

const PHONE_DISPLAY = "+243 84 899 4045";
const PHONE_TEL = "+243848994045";
const EMAIL = "info@yomcarcare.com";
const ADDRESS_TEXT = "538 Avenue Kipopo, Golf Malela, Lubumbashi";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=538+Avenue+Kipopo,+Golf+Malela,+Lubumbashi";
const WHATSAPP_URL = "https://wa.me/243848994045";

const HOURS: { day: string; time: string }[] = [
  { day: "Lundi - Vendredi", time: "09:00 - 18:00" },
  { day: "Samedi", time: "10:00 - 16:00" },
  { day: "Dimanche", time: "Ferme" },
];

export default function ContactPageFR() {
  return (
    <main className="flex flex-col">
      <section className="container-px py-10 md:py-14">
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6 text-white">
              <h2 className="text-xl font-semibold">Coordonnees</h2>
              <div className="mt-4 space-y-3 text-white/80">
                <p>
                  <span className="block text-xs text-white/60">Telephone</span>
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
                  <span className="block text-xs text-white/60">Adresse</span>
                  {ADDRESS_TEXT}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  Ouvrir Maps
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6 text-white">
              <h3 className="text-lg font-semibold">Heures d ouverture</h3>
              <ul className="mt-3 space-y-2">
                {HOURS.map((hour) => (
                  <li key={hour.day} className="flex items-center justify-between text-white/80">
                    <span>{hour.day}</span>
                    <span className="tabular-nums">{hour.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6 text-white md:p-8">
              <h2 className="text-xl font-semibold md:text-2xl">Envoyez-nous un message</h2>
              <p className="mt-1 text-sm text-white/70">Dites-nous ce dont vous avez besoin.</p>
              <div className="mt-6">
                <ContactFormClient />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
