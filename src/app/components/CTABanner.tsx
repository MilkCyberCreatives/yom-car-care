"use client";

import Image from "next/image";

import Link from "@/app/components/LocaleLink";
import useLocaleLink from "@/hooks/useLocaleLink";
import { useI18n } from "@/hooks/useI18n";

export default function CTABanner() {
  const { l } = useLocaleLink();
  const { locale } = useI18n();
  const isFR = locale === "fr";

  const title = isFR ? "Pret a rafraichir votre voiture ?" : "Ready to refresh your car?";
  const desc = isFR
    ? "Explorez le catalogue ou ecrivez-nous pour une recommandation adaptee."
    : "Explore the catalog or message us for a tailored recommendation.";

  const browse = isFR ? "Voir les produits" : "Browse Products";
  const call = isFR ? "Appeler +243 84 899 4045" : "Call +243 84 899 4045";
  const wa = isFR ? "WhatsApp" : "WhatsApp Us";

  return (
    <section className="container-px my-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 p-6 md:p-8">
        <Image
          src="/ctabanner.jpg"
          alt={isFR ? "Banniere promotionnelle YOM Car Care" : "YOM Car Care promotional banner"}
          fill
          priority={false}
          quality={68}
          className="object-cover"
          sizes="(min-width: 1024px) 1280px, 100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-blue)]/25 to-transparent" />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h3 className="text-2xl md:text-3xl font-semibold">{title}</h3>
          <p className="mt-2 text-white/85">{desc}</p>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
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
