// src/app/components/TopBar.tsx
"use client";

import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

export default function TopBar() {
  const pathname = usePathname() || "/";
  const { t } = useI18n();

  // language links
  const toEN = pathname.replace(/^\/fr/, "") || "/";
  const toFR = pathname.startsWith("/fr") ? pathname : `/fr${pathname}`;
  const isEN = !pathname.startsWith("/fr");

  return (
    <div className="w-full bg-black text-white/80 text-[13px] border-b border-white/10">
      <div className="container-px flex flex-col gap-2 py-2 md:flex-row md:items-center md:justify-between">
        {/* left side: address / phone / email */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="inline-flex items-center gap-1">
            <MapPin size={14} className="text-white/60" />
            {t.common.address_line1}, {t.common.address_line2},{" "}
            {t.common.address_city}
          </span>

          <a
            href="tel:+243848994045"
            className="inline-flex items-center gap-1 hover:text-white"
          >
            <Phone size={14} className="text-white/60" />
            +243 84 899 4045
          </a>

          <a
            href={`mailto:${t.common.email}`}
            className="inline-flex items-center gap-1 hover:text-white"
          >
            <Mail size={14} className="text-white/60" />
            {t.common.email}
          </a>
        </div>

        {/* right side: EN / FR */}
        <div className="flex items-center gap-2 text-white text-xs md:text-[13px]">
          <a
            href={toEN}
            className={`hover:underline ${
              isEN ? "font-semibold text-white" : "text-white/70"
            }`}
            aria-current={isEN ? "true" : undefined}
          >
            EN
          </a>
          <span className="text-white/40">•</span>
          <a
            href={toFR}
            className={`hover:underline ${
              !isEN ? "font-semibold text-white" : "text-white/70"
            }`}
            aria-current={!isEN ? "true" : undefined}
          >
            FR
          </a>
        </div>
      </div>
    </div>
  );
}
