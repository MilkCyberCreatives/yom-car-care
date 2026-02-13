"use client";

import ContactFormClient from "@/app/contact/ContactFormClient";
import { useI18n } from "@/hooks/useI18n";

export default function PreFooterContact() {
  const { locale } = useI18n();
  const isFR = locale === "fr";

  const copy = isFR
    ? {
        kicker: "Contact rapide",
        title: "Parlez-nous de votre besoin, on vous repond vite.",
        desc: "Demandez une recommandation produit personnalisee avant de passer commande.",
      }
    : {
        kicker: "Quick Contact",
        title: "Tell us what your vehicle needs and get a fast response.",
        desc: "Request a tailored product recommendation before placing your order.",
      };

  return (
    <section className="container-px my-10">
      <div className="bg-transparent px-4 py-6 text-white md:px-6 md:py-8">
        <p className="text-xs uppercase tracking-[0.16em] text-white/65">{copy.kicker}</p>
        <h2 className="mt-2 text-2xl font-semibold md:text-3xl">{copy.title}</h2>
        <p className="mt-2 max-w-3xl text-sm text-white/75 md:text-base">{copy.desc}</p>
        <div className="mt-6">
          <ContactFormClient borderStyle="top-bottom" />
        </div>
      </div>
    </section>
  );
}
