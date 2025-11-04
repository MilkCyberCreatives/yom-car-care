"use client";

import Link from "@/app/components/LocaleLink";
import useLocaleLink from "@/hooks/useLocaleLink";

export default function CTABanner() {
  const { l } = useLocaleLink();

  return (
    <section className="container-px my-8">
      <div 
        className="rounded-2xl border border-white/10 bg-gradient-to-r from-[var(--brand-blue)]/20 to-transparent p-6 md:p-8 relative overflow-hidden"
        style={{
          backgroundImage: "url('/ctabanner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-semibold">Ready to refresh your car?</h3>
          <p className="text-white/80 mt-2">
            Explore the catalog or message us for a tailored recommendation.
          </p>

          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            {/* ✅ typed, locale-aware route */}
            <Link href={l("/products")} className="btn-ghost bg-white/10 hover:bg-white/20">
              Browse Products
            </Link>

            <a href="tel:+243848994045" className="btn-ghost">
              Call +243 84 899 4045
            </a>

            <a
              href="https://wa.me/243848994045"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}