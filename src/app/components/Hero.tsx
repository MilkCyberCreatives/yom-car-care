"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import CategoryStrip from "./CategoryStrip";
import { useI18n } from "@/hooks/useI18n";

const SLIDES = [
  { src: "/hero/slide1.jpg", alt: "YOM Car Care hero image 1" },
  { src: "/hero/slide2.jpg", alt: "YOM Car Care hero image 2" },
];

const AUTOPLAY_MS = 5500;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export default function Hero() {
  const { locale } = useI18n();
  const isFR = locale === "fr";
  const [reduceMotion, setReduceMotion] = useState(false);

  const heroCopy = isFR
    ? {
        kicker: "YOM Car Care Lubumbashi",
        heading: "Transformez votre voiture en vitrine roulante.",
        subheading:
          "Produits premium, conseils experts et paiement a la livraison pour garder chaque vehicule impeccable.",
        scroll: "Defiler",
      }
    : {
        kicker: "YOM Car Care Lubumbashi",
        heading: "Turn your car into a moving showroom.",
        subheading:
          "Premium products, expert guidance, and cash-on-delivery convenience to keep every vehicle spotless.",
        scroll: "Scroll",
      };

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = SLIDES.length;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(media.matches);
    apply();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", apply);
      return () => media.removeEventListener("change", apply);
    }

    media.addListener?.(apply);
    return () => media.removeListener?.(apply);
  }, []);

  useEffect(() => {
    if (paused || total <= 1) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setIndex((value) => (value + 1) % total);
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [paused, total, index]);

  const go = useCallback(
    (step: number) => {
      if (total <= 0) return;
      setIndex((value) => (value + step + total) % total);
    },
    [total]
  );

  const scrollToNext = useCallback(() => {
    const hero = document.querySelector<HTMLElement>('[aria-label="Hero slideshow"]');
    const heroHeight = hero?.offsetHeight || window.innerHeight || 800;
    window.scrollTo({ top: heroHeight - 4, behavior: "smooth" });
  }, []);

  return (
    <section
      className="relative min-h-[calc(100svh-var(--site-header-h,116px)-var(--site-breadcrumb-h,0px))] w-full overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      aria-label="Hero slideshow"
    >
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.src}
              className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ${
                active ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={active ? "false" : "true"}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                fetchPriority={i === 0 ? "high" : "auto"}
                loading={i === 0 || active ? "eager" : "lazy"}
                className={`object-cover transition-transform ease-out ${
                  active && !reduceMotion ? "scale-[1.03]" : "scale-[1.01]"
                }`}
                style={
                  reduceMotion
                    ? undefined
                    : {
                        transitionDuration: `${AUTOPLAY_MS + 900}ms`,
                      }
                }
                sizes="100vw"
                quality={82}
              />
            </div>
          );
        })}

        <div className="absolute inset-0 bg-black/38" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_60%_at_50%_40%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.45)_72%,rgba(0,0,0,0.75)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-black/25 to-zinc-950" />
      </div>

      <div className="absolute inset-0 z-20">
        <div className="container-px flex h-full items-center justify-center">
          <div className="mx-auto max-w-2xl -translate-y-10 text-center sm:-translate-y-12 md:-translate-y-16">
            <p className="text-xs uppercase tracking-[0.16em] text-white/80">{heroCopy.kicker}</p>
            <h1
              className="mt-3 text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl"
              style={{ textShadow: "0 8px 28px rgba(0,0,0,0.75)" }}
            >
              {heroCopy.heading}
            </h1>
            <p
              className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base md:text-lg"
              style={{ textShadow: "0 6px 22px rgba(0,0,0,0.68)" }}
            >
              {heroCopy.subheading}
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToNext}
        className="group absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-white/90 backdrop-blur transition hover:bg-black/50 sm:bottom-6"
        aria-label={isFR ? "Aller a la section suivante" : "Scroll to next section"}
      >
        <span className="inline-flex items-center gap-2 text-sm">
          <span className="hidden sm:inline">{heroCopy.scroll}</span>
          <span className={`inline-flex ${reduceMotion ? "" : "animate-bounce"}`}>
            <ChevronDown className="h-4 w-4" />
          </span>
        </span>
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            className="group absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white ring-1 ring-white/20 backdrop-blur transition-all hover:bg-black/55"
            aria-label={isFR ? "Diapositive precedente" : "Previous slide"}
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:scale-110" />
          </button>

          <button
            type="button"
            onClick={() => go(1)}
            className="group absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white ring-1 ring-white/20 backdrop-blur transition-all hover:bg-black/55"
            aria-label={isFR ? "Diapositive suivante" : "Next slide"}
          >
            <ChevronRight className="h-5 w-5 transition-transform group-hover:scale-110" />
          </button>

          <div className="absolute inset-x-0 z-20 bottom-36 flex items-center justify-center gap-2 sm:bottom-40 md:bottom-44 lg:bottom-48">
            {SLIDES.map((_, i) => {
              const active = i === index;
              return (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={isFR ? `Aller a la diapositive ${i + 1}` : `Go to slide ${i + 1}`}
                  aria-current={active ? "true" : "false"}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    active ? "w-8 bg-white" : "w-2.5 bg-white/60 hover:bg-white/80"
                  }`}
                  type="button"
                />
              );
            })}
          </div>
        </>
      )}

      <div className="absolute inset-x-0 z-20 bottom-14 sm:bottom-16 md:bottom-20 lg:bottom-24">
        <div className="container-px">
          <div className="pointer-events-auto">
            <CategoryStrip />
          </div>
        </div>
      </div>
    </section>
  );
}
