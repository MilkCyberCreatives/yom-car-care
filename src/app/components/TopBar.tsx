"use client";

import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

export default function TopBar() {
  const pathname = usePathname() || "/";
  const { t } = useI18n();

  // Determine current language and destination URLs
  const isFR = pathname.startsWith("/fr");
  const toEN = isFR ? pathname.replace(/^\/fr/, "") || "/" : pathname;
  const toFR = isFR ? pathname : `/fr${pathname}`.replace(/\/{2,}/g, "/");

  return (
    <div className="w-full bg-black text-white/80 text-[13px] border-b border-white/10">
      <div className="container-px flex flex-col gap-2 py-2 md:flex-row md:items-center md:justify-between">
        {/* --- LEFT SIDE: address, phone, email --- */}
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

        {/* --- RIGHT SIDE: language toggle --- */}
        <div className="flex items-center gap-2 text-white text-xs md:text-[13px]">
          <a
            href={toEN}
            className={`hover:underline transition ${
              !isFR ? "font-semibold text-white" : "text-white/70"
            }`}
            aria-current={!isFR ? "true" : undefined}
          >
            EN
          </a>
          <span className="text-white/40">•</span>
          <a
            href={toFR}
            className={`hover:underline transition ${
              isFR ? "font-semibold text-white" : "text-white/70"
            }`}
            aria-current={isFR ? "true" : undefined}
          >
            FR
          </a>
        </div>
      </div>
    </div>
  );
}
