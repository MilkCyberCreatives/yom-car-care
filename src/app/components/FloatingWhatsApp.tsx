// src/app/components/FloatingWhatsApp.tsx
"use client";

import { event } from "@/lib/gtag";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

function getReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export default function FloatingWhatsApp() {
  const pathname = usePathname() || "/";
  const isFR = pathname.startsWith("/fr");

  const reduceMotionRef = useRef(false);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  // Visible controls (fade in after delay + scroll logic)
  const [mountedVisible, setMountedVisible] = useState(false);
  const [scrollVisible, setScrollVisible] = useState(true);

  // ✅ Auto-language WhatsApp text based on locale
  const waText = useMemo(() => {
    const msgEN = "Hello YOM Car Care, I'd like to place an order or ask a question.";
    const msgFR = "Bonjour YOM Car Care, je voudrais passer une commande ou poser une question.";
    return encodeURIComponent(isFR ? msgFR : msgEN);
  }, [isFR]);

  const tooltipText = isFR ? "Discuter sur WhatsApp" : "Chat with us on WhatsApp";

  const onClick = () => {
    event("whatsapp_click", { location: "floating_button", locale: isFR ? "fr" : "en" });
  };

  // ✅ Delay appearance slightly (premium)
  useEffect(() => {
    reduceMotionRef.current = getReducedMotion();
    const t = setTimeout(() => setMountedVisible(true), 900);
    return () => clearTimeout(t);
  }, []);

  // ✅ Hide on scroll down, show on scroll up (smooth + lightweight)
  useEffect(() => {
    if (typeof window === "undefined") return;

    lastYRef.current = window.scrollY || 0;

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const last = lastYRef.current;

        const delta = y - last;

        // small threshold so it doesn't flicker
        const THRESH = 10;

        if (delta > THRESH) {
          // scrolling down -> hide
          setScrollVisible(false);
        } else if (delta < -THRESH) {
          // scrolling up -> show
          setScrollVisible(true);
        }

        lastYRef.current = y;
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visible = mountedVisible && scrollVisible;

  return (
    <div
      className={[
        "fixed z-[80]",
        // ✅ Mobile reposition: bottom-left on mobile, bottom-right on >=sm
        "bottom-5 left-5 sm:bottom-6 sm:right-6 sm:left-auto",
      ].join(" ")}
    >
      {/* ✅ Tooltip (hover/focus) */}
      <div className="relative group">
        <div
          className={[
            "pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2",
            "whitespace-nowrap rounded-full border border-white/10 bg-black/75 px-3 py-1.5",
            "text-xs text-white/90 shadow-lg backdrop-blur",
            "opacity-0 translate-y-1 transition-all duration-200",
            "group-hover:opacity-100 group-hover:translate-y-0",
            "group-focus-within:opacity-100 group-focus-within:translate-y-0",
          ].join(" ")}
          aria-hidden="true"
        >
          {tooltipText}
        </div>

        <a
          href={`https://wa.me/243848994045?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={tooltipText}
          onClick={onClick}
          className={[
            "relative inline-flex items-center justify-center",
            "h-14 w-14 rounded-full",
            "bg-green-500 text-white",
            "shadow-lg shadow-green-500/30",
            "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-black",
            // ✅ show/hide animation
            reduceMotionRef.current
              ? visible
                ? "opacity-100"
                : "opacity-0"
              : visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3",
            "transition-all duration-500",
            "hover:bg-green-600 hover:scale-105",
          ].join(" ")}
        >
          {/* ✅ Pulse ring (disabled for reduced motion) */}
          {!reduceMotionRef.current && (
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-green-400/35 animate-ping [animation-duration:2.6s]"
            />
          )}

          {/* Icon */}
          <span className="relative z-10 grid place-items-center">
            <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7 fill-current">
              <path d="M19.11 17.44c-.28-.14-1.65-.81-1.91-.9-.26-.1-.45-.14-.64.14-.19.28-.74.9-.9 1.08-.17.19-.33.21-.61.07-.28-.14-1.18-.44-2.24-1.41-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.33.42-.5.14-.17.19-.28.28-.47.09-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.13-.23-.56-.47-.48-.64-.49-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.28-1 1-1 2.43 0 1.43 1.03 2.81 1.17 3 .14.19 2.02 3.09 4.9 4.33.69.3 1.23.48 1.65.62.69.22 1.31.19 1.8.12.55-.08 1.65-.68 1.89-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33zM16 3C8.83 3 3 8.82 3 16c0 2.3.62 4.46 1.7 6.32L3 29l6.82-1.79C11.62 28.39 13.74 29 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.64c-2.17 0-4.18-.7-5.82-1.89l-.42-.3-4.06 1.07 1.09-3.96-.33-.41A10.61 10.61 0 0 1 5.39 16c0-5.85 4.76-10.61 10.61-10.61S26.61 10.15 26.61 16 21.85 26.64 16 26.64z" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  );
}
