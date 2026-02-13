// src/app/components/ScrollToTop.tsx
"use client";

import { useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        setShow(y > 700);
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = () => {
    const reduced = prefersReducedMotion();
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Scroll to top"
      className={[
        "fixed right-5 bottom-24 z-[80]",
        "grid h-12 w-12 place-items-center rounded-full",
        "border border-white/15 bg-black/40 text-white backdrop-blur",
        "shadow-[0_12px_30px_rgba(0,0,0,0.55)]",
        "transition-all duration-300",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none",
        "hover:bg-black/55 hover:scale-105 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
      ].join(" ")}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 15l6-6 6 6" />
      </svg>
    </button>
  );
}
