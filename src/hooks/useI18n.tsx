"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { Locale } from "@/i18n/config";
import en from "@/i18n/messages/en";
import fr from "@/i18n/messages/fr";

type Dict = typeof en;
const dictionaries: Record<Locale, Dict> = { en, fr };

type Ctx = {
  locale: Locale;
  t: Dict;
  l: <T extends string>(path: T) => any; // optional deep lookup helper
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const value = useMemo<Ctx>(() => {
    const dict = dictionaries[locale] ?? en;

    // dot-path helper if you want it later
    const l = (path: string) => {
      return path.split(".").reduce<any>((acc, k) => (acc ? acc[k] : undefined), dict);
    };

    return { locale, t: dict, l };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider />");
  return ctx;
}
