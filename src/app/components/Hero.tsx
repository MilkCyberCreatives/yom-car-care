// src/app/components/Hero.tsx
"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import CategoryStrip from "./CategoryStrip";
import { useI18n } from "@/hooks/useI18n";

const SLIDES = [
  { src: "/hero/slide1.jpg", alt: "Hero slide 1" },
  { src: "/hero/slide2.jpg", alt: "Hero slide 2" },
];

const AUTOPLAY_MS = 5000;

export default function Hero() {
  const { locale } = useI18n();
  const isFR = locale === "fr";

  const reduceMotion = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = SLIDES.length;

  const current = useMemo(() => {
    const safe = total > 0 ? index % total : 0;
    return SLIDES[safe];
  }, [index, total]);

  // ✅ Prefetch next slide by rendering an invisible Image (valid in body; improves smoothness)
  const nextSlide = useMemo(() => {
    if (total <= 1) return null;
    const next = (index + 1) % total;
    return SLIDES[next] ?? null;
  }, [index, total]);

  // ✅ Smooth parallax on scroll (premium) — auto-disabled if reduced motion
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], reduceMotion ? [0, 0] : [0, 60]);

  // Autoplay (skips if reduced motion is on)
  useEffect(() => {
    if (reduceMotion) return;
    if (paused || total <= 1) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, paused, total, reduceMotion]);

  const go = useCallback(
    (step: number) => {
      if (total <= 0) return;
      setIndex((i) => (i + step + total) % total);
    },
    [total]
  );

  const scrollToNext = useCallback(() => {
    // Scroll to the next section below the hero (smooth)
    const h = window.innerHeight || 800;
    window.scrollTo({ top: h - 4, behavior: "smooth" });
  }, []);

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      aria-label="Hero slideshow"
    >
      {/* ✅ Invisible prefetch (helps speed; minimal impact) */}
      {nextSlide ? (
        <div className="sr-only" aria-hidden="true">
          <Image
            src={nextSlide.src}
            alt=""
            width={10}
            height={10}
            priority={false}
            fetchPriority="low"
          />
        </div>
      ) : null}

      {/* Slides container */}
      <div className="absolute inset-0">
        {/* Background image layer (parallax) */}
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          {/* Reduced motion: simple swap (fast + accessible) */}
          {reduceMotion ? (
            <Image
              src={current.src}
              alt={current.alt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
              quality={85}
            />
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.85, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  priority={index === 0}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  className="object-cover"
                  sizes="100vw"
                  quality={85}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Depth/vignette effects */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_60%_at_50%_40%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.45)_70%,rgba(0,0,0,0.75)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* ✅ Scroll indicator (premium + requested scroll effect) */}
      <button
        type="button"
        onClick={scrollToNext}
        className="group absolute bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-white/90 backdrop-blur hover:bg-black/50 transition"
        aria-label={isFR ? "Aller a la section suivante" : "Scroll to next section"}
      >
        <span className="inline-flex items-center gap-2 text-sm">
          <span className="hidden sm:inline">{isFR ? "Defiler" : "Scroll"}</span>
          <motion.span
            animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </span>
      </button>

      {/* Navigation arrows + dots */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            className="group absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white ring-1 ring-white/20 backdrop-blur hover:bg-black/55 transition-all"
            aria-label={isFR ? "Diapositive precedente" : "Previous slide"}
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:scale-110" />
          </button>

          <button
            type="button"
            onClick={() => go(1)}
            className="group absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white ring-1 ring-white/20 backdrop-blur hover:bg-black/55 transition-all"
            aria-label={isFR ? "Diapositive suivante" : "Next slide"}
          >
            <ChevronRight className="h-5 w-5 transition-transform group-hover:scale-110" />
          </button>

          <div className="absolute inset-x-0 z-20 flex items-center justify-center gap-2 bottom-[26vh] md:bottom-[28vh] lg:bottom-[30vh]">
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

      {/* CategoryStrip placement */}
      <div className="absolute inset-x-0 z-20 bottom-[12vh] sm:bottom-[14vh] md:bottom-[18vh] lg:bottom-[20vh]">
        <div className="container-px">
          <div className="pointer-events-auto">
            <CategoryStrip />
          </div>
        </div>
      </div>
    </section>
  );
}
