"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryStrip from "./CategoryStrip";

const SLIDES = [
  { src: "/hero/slide1.jpg", alt: "Hero slide 1" },
  { src: "/hero/slide2.jpg", alt: "Hero slide 2" }
];
const AUTOPLAY_MS = 5000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = SLIDES.length;
  const current = useMemo(() => SLIDES[index % total], [index, total]);

  // Autoplay
  useEffect(() => {
    if (paused || total <= 1) return;
    timerRef.current = setTimeout(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => { 
      if (timerRef.current) clearTimeout(timerRef.current); 
    };
  }, [index, paused, total]);

  const go = (step: number) => setIndex((i) => (i + step + total) % total);

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      aria-label="Hero slideshow"
    >
      {/* Slides container */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
              quality={90}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Depth/vignette effects */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_60%_at_50%_40%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.45)_70%,rgba(0,0,0,0.7)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* Rest of the component remains the same */}
      {/* Navigation arrows, dots, and CategoryStrip */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            className="group absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white ring-1 ring-white/20 backdrop-blur hover:bg-black/55 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:scale-110" />
          </button>

          <button
            type="button"
            onClick={() => go(1)}
            className="group absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white ring-1 ring-white/20 backdrop-blur hover:bg-black/55 transition-all"
            aria-label="Next slide"
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
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={active ? "true" : "false"}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    active ? "w-8 bg-white" : "w-2.5 bg-white/60 hover:bg-white/80"
                  }`}
                />
              );
            })}
          </div>
        </>
      )}

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