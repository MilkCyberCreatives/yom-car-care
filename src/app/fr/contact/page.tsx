import type { Metadata } from "next";
import ContactFormClient from "../../contact/ContactFormClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez YOM Car Care a Lubumbashi.",
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
      <section className="relative overflow-hidden bg-[var(--brand-blue)] text-white">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="container-px py-14 md:py-18 relative">
          <div className="max-w-3xl">
            <p className="uppercase tracking-wide text-white/70 text-xs mb-2">Contact YOM Car Care</p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Nous sommes la pour vous aider</h1>
            <p className="mt-3 text-white/80 max-w-xl">
              Besoin d'une recommandation pour l'exterieur, l'interieur ou le detailing ? Ecrivez-nous.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={`tel:${PHONE_TEL}`} className="btn-ghost">{PHONE_DISPLAY}</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container-px py-10 md:py-14">
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-zinc-900 text-white p-6">
              <h2 className="text-xl font-semibold">Coordonnees</h2>
              <div className="mt-4 space-y-3 text-white/80">
                <p>
                  <span className="block text-white/60 text-xs">Telephone</span>
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
                  <span className="block text-white/60 text-xs">Adresse</span>
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

            <div className="rounded-3xl border border-white/10 bg-zinc-900 text-white p-6">
              <h3 className="text-lg font-semibold">Heures d'ouverture</h3>
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

          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6 md:p-8 text-white">
              <h2 className="text-xl md:text-2xl font-semibold">Envoyez-nous un message</h2>
              <p className="text-white/70 mt-1 text-sm">
                Dites-nous ce dont vous avez besoin.
              </p>
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
