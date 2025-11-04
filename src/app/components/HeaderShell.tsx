// src/app/components/HeaderShell.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, ChevronDown, PhoneCall, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";

import { useI18n, getLocaleSwitchLinks } from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";

export default function HeaderShell() {
  const pathname = usePathname();
  const { t, locale, l } = useI18n();
  const { count } = useCart();

  // build EN / FR URLs
  const { toEN, toFR, isFr } = getLocaleSwitchLinks(pathname);

  // nav links
  const navLinks = [
    { label: t("products"), href: l("/products") },
    { label: t("about"), href: l("/about") },
    { label: t("contact"), href: l("/contact") },
  ];

  // categories dropdown trigger label
  const categoriesLabel = t("categories");

  return (
    <header className="w-full text-white">
      {/* TOP BAR (black strip) */}
      <div className="w-full bg-black text-white text-[13px] border-b border-white/10">
        <div className="container-px flex flex-wrap items-center justify-between gap-3 py-2">
          {/* left side: address / phone / email */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/80">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{t("address")}</span>
            </span>

            <a
              href="tel:+243848994045"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>+243 84 899 4045</span>
            </a>

            <a
              href="mailto:info@yomcarcare.com"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>info@yomcarcare.com</span>
            </a>
          </div>

          {/* right side: language toggle */}
          <div className="flex items-center gap-2 font-medium">
            <Link
              href={toEN}
              className={
                "hover:text-white " +
                (locale === "en" ? "text-white" : "text-white/60")
              }
            >
              EN
            </Link>
            <span className="text-white/40">•</span>
            <Link
              href={toFR}
              className={
                "hover:text-white " +
                (locale === "fr" ? "text-white" : "text-white/60")
              }
            >
              FR
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN HEADER (blue bar) */}
      <motion.div
        className="w-full bg-[var(--brand-blue,#0076e6)] text-white"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="container-px flex flex-wrap items-center gap-4 py-4">
          {/* LOGO */}
          <Link
            href={l("/")}
            className="flex flex-col items-center text-center text-white group"
          >
            {/* IMPORTANT: use your actual logo file in /public/logo.svg or similar */}
            <Image
              src="/logo.svg"
              alt="YOM Car Care"
              width={140}
              height={60}
              className="h-auto w-auto"
              priority
            />
          </Link>

          {/* SEARCH BAR */}
          <div className="flex-1 min-w-[220px] max-w-md">
            <div className="flex items-center rounded-md bg-white text-black px-3 py-3 shadow">
              <input
                className="w-full bg-transparent text-sm placeholder-black/50 focus:outline-none"
                placeholder={t("searchPlaceholder")}
              />
            </div>
          </div>

          {/* NAV LINKS */}
          <nav className="flex flex-wrap items-center gap-5 text-[15px] font-medium">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-white/80 transition-colors"
              >
                {item.label}
              </Link>
            ))}

            {/* Categories dropdown trigger (static for now) */}
            <button
              type="button"
              className="flex items-center gap-1 hover:text-white/80 transition-colors"
            >
              <span>{categoriesLabel}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </nav>

          {/* CALL NOW BUTTON */}
          <a
            href="tel:+243848994045"
            className="flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-3 text-[15px] font-medium hover:bg-white/15 transition"
          >
            <PhoneCall className="h-4 w-4" />
            <span>{t("callNow")}</span>
          </a>

          {/* CART BUTTON */}
          <Link
            href={l("/cart")}
            className="relative flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-3 text-[15px] font-medium hover:bg-white/15 transition"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{t("cart")}</span>

            {/* little purple badge */}
            {count > 0 ? (
              <span className="grid place-items-center rounded bg-indigo-500 px-1.5 text-[12px] font-semibold leading-none text-white">
                {count}
              </span>
            ) : null}
          </Link>
        </div>
      </motion.div>
    </header>
  );
}
