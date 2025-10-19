import Image from "next/image";
import clsx from "clsx";

/**
 * BrandBar
 * Displays partner logos inside a white card.
 * Make sure the images exist under /public/partners/*
 */
const BRANDS: { src: string; alt: string }[] = [
  { src: "/partners/logo-innovacar.webp", alt: "Innova Car" },
  { src: "/partners/shield-chemicals-logo-200px.png", alt: "Shield Chemicals" },
  { src: "/partners/logo_fra_ber_nopayoff.png", alt: "Fra-Ber" },
];

export default function BrandBar({ className }: { className?: string }) {
  return (
    <section className={clsx("container-px py-8", className)}>
      {/* White background card */}
      <div className="rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-sm">
        <div
          className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-6"
          aria-label="Partner brands"
        >
          {BRANDS.map((b) => (
            <div key={b.alt} className="relative h-10 w-28 sm:h-12 sm:w-32">
              <Image
                src={b.src}                // Must be in /public/partners/*
                alt={b.alt}
                fill
                sizes="(min-width: 640px) 128px, 112px"
                className="object-contain"
                priority={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
