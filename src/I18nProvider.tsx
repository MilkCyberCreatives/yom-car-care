"use client";

import { createContext, useContext } from "react";
import { en } from "@/i18n/en";
import { fr } from "@/i18n/fr";

type Messages = typeof en;

const I18nContext = createContext<Messages>(en);

export function I18nProvider({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const dict = locale === "fr" ? fr : en;
  return (
    <I18nContext.Provider value={dict}>{children}</I18nContext.Provider>
  );
}

export function useI18nFull() {
  return useContext(I18nContext);
}
