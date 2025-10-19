import Image from "next/image";

const BRANDS = [
  { src: "/partners/logo-innovacar.webp", alt: "Innova Car" },
  { src: "/partners/shield-chemicals-logo-200px.png", alt: "Shield Chemicals" },
  { src: "/partners/logo_fra_ber_nopayoff.png", alt: "Fra Ber" },
];

export default function BrandsStrip() {
  return (
    <section className="container-px py-8">
      {/* White background card */}
      <div className="rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-center gap-10">
          {BRANDS.map((b) => (
            <div key={b.alt} className="relative h-10 w-28 md:h-12 md:w-32">
              <Image
                src={b.src}         // served from /public/partners/*
                alt={b.alt}
                fill
                sizes="128px"
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
