// src/app/components/CTABanner.tsx
"use client";

import Link from "@/app/components/LocaleLink";
import useLocaleLink from "@/hooks/useLocaleLink";
import { useI18n } from "@/hooks/useI18n";

export default function CTABanner() {
  const { l } = useLocaleLink();
  const { locale } = useI18n();
  const isFR = locale === "fr";

  const title = isFR ? "Prêt à rafraîchir votre voiture ?" : "Ready to refresh your car?";
  const desc = isFR
    ? "Explorez le catalogue ou écrivez-nous pour une recommandation adaptée."
    : "Explore the catalog or message us for a tailored recommendation.";

  const browse = isFR ? "Voir les produits" : "Browse Products";
  const call = isFR ? "Appeler +243 84 899 4045" : "Call +243 84 899 4045";
  const wa = isFR ? "WhatsApp" : "WhatsApp Us";

  return (
    <section className="container-px my-8">
      <div
        className="rounded-2xl border border-white/10 bg-gradient-to-r from-[var(--brand-blue)]/20 to-transparent p-6 md:p-8 relative overflow-hidden"
        style={{
          backgroundImage: "url('/ctabanner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/30 z-0" />

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-semibold">{title}</h3>
          <p className="text-white/80 mt-2">{desc}</p>

          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            <Link href={l("/products")} className="btn-ghost bg-white/10 hover:bg-white/20">
              {browse}
            </Link>

            <a href="tel:+243848994045" className="btn-ghost">
              {call}
            </a>

            <a
              href="https://wa.me/243848994045"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {wa}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
