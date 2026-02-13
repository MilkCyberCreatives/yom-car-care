// src/app/components/HeaderShell.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import TopBar from "./TopBar";
import MainHeader from "./MainHeader";

/**
 * HeaderShell (Premium + Fast)
 * ✅ Sticky header stays on top
 * ✅ Adds blur/shadow only after scrolling
 * ✅ Hides TopBar on scroll down, shows on scroll up
 * ✅ Uses rAF + passive scroll (performance-friendly)
 * ✅ Respects reduced-motion users
 */

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export default function HeaderShell() {
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  const [reduced, setReduced] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const rm = prefersReducedMotion();
    setReduced(rm);

    lastYRef.current = window.scrollY || 0;

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const last = lastYRef.current;
        const delta = y - last;

        // Only update if the value actually changes (prevents extra re-renders)
        const nextScrolled = y > 8;
        setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));

        // Hide/show TopBar (skip if reduced motion to keep it stable)
        if (!rm) {
          const THRESH = 10;

          if (delta > THRESH && y > 40) {
            setShowTopBar((prev) => (prev ? false : prev));
          } else if (delta < -THRESH) {
            setShowTopBar((prev) => (!prev ? true : prev));
          }
        }

        lastYRef.current = y;
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={[
        "sticky top-0 z-[9999]",
        "transition-all duration-300",
        scrolled
          ? "backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 shadow-[0_12px_35px_rgba(0,0,0,0.6)]"
          : "bg-transparent shadow-none",
      ].join(" ")}
    >
      {/* TopBar collapses smoothly */}
      <div
        className={[
          "overflow-hidden",
          reduced ? "" : "transition-[max-height,opacity] duration-300",
          showTopBar ? "max-h-24 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <TopBar />
      </div>

      {/* MainHeader always visible */}
      <MainHeader />
    </div>
  );
}
