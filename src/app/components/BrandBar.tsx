import Image from "next/image";

/**
 * Swap/extend the list with real brand logos placed in /public/brands
 * (SVG/PNG/WebP). The placeholders below will render immediately.
 */
const BRANDS = [
  { src: "/logo.svg", alt: "YOM" },
  { src: "/logo1.svg", alt: "Brand 1" },
  { src: "/logo2.svg", alt: "Brand 2" },
];

export default function BrandBar() {
  return (
    <section className="container-px py-8">
      <div className="card px-6 py-4">
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-90">
          {BRANDS.map((b) => (
            <div key={b.alt} className="relative h-8 w-28">
              <Image src={b.src} alt={b.alt} fill sizes="112px" className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
