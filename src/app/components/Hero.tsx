"use client";

import { motion } from "framer-motion";
import Link from "@/app/components/LocaleLink"; // ✅ locale-aware wrapper for next/link
import { useI18n } from "@/hooks/useI18n";
import CategoryStrip from "@/app/components/CategoryStrip"; // ⬅️ bring the pills into the hero

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-900 via-zinc-900 to-black" />

      {/* soft blobs */}
      <motion.div
        className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-[var(--brand-blue)]/20 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      />

      {/* main hero content */}
      <div className="container-px grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            {t.hero.title_1}
            <span className="text-[var(--brand-blue)]">{t.hero.title_highlight}</span>
            {t.hero.title_2}
          </h1>
          <p className="mt-4 text-white/70 max-w-xl">{t.hero.subtitle}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* ✅ locale-aware internal route; no typedRoutes error */}
            <Link href="/products" className="btn-primary">
              {t.common.browse_products}
            </Link>
            <a href="tel:+243848994045" className="btn-ghost">
              +243 84 899 4045
            </a>
          </div>
          <p className="mt-3 text-xs text-white/50">
            {t.common.address_line1}, {t.common.address_line2}, {t.common.address_city}
          </p>
        </div>

        <div className="relative aspect-[5/4] rounded-2xl border border-white/10 bg-gradient-to-br from-black to-zinc-900 p-6">
          <div className="h-full w-full rounded-xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--brand-blue)]/20 via-transparent to-transparent" />
          <div className="absolute inset-0 grid place-items-center text-center p-6">
            <div>
              <p className="text-white/70">High-quality brands</p>
              <h3 className="text-2xl md:text-3xl font-semibold">
                Exterior • Interior • Detailing • Accessories
              </h3>
              <p className="text-white/60 mt-2">{t.hero.french_hint}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Category pills pinned to the bottom of the hero ---- */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3">
        <div className="container-px">
          {/* remove default spacing from CategoryStrip without editing it */}
          <div className="pointer-events-auto [&>section]:py-0">
            <CategoryStrip />
          </div>
        </div>
      </div>

      {/* spacer so next section doesn't overlap the pinned strip */}
      <div aria-hidden className="h-[64px]" />
    </section>
  );
}
