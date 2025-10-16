// src/components/CategoryHero.tsx
"use client";

import Image from "next/image";

type Props = {
  title: string;
  imageSrc?: string; // hero background pulled from first product
  fallback?: string; // optional fallback image path under /public
  subtitle?: string;
};

export default function CategoryHero({ title, imageSrc, fallback, subtitle }: Props) {
  const bg = imageSrc || fallback || "/products/placeholder.jpg"; // make sure you have a placeholder if needed

  return (
    <section className="relative h-[42vh] min-h-[320px] w-full overflow-hidden rounded-2xl">
      <Image
        src={bg}
        alt={title}
        fill
        priority
        className="object-cover opacity-90"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 text-white/90 max-w-3xl">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
