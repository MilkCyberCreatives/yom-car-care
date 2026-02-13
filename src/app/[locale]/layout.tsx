// src/app/[locale]/layout.tsx
import "../globals.css";
import SiteShell from "@/app/components/SiteShell";

import { isLocale, type Locale, defaultLocale } from "@/i18n/config";

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale?: string };
}) {
  const raw = params?.locale;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;

  return <SiteShell locale={locale}>{children}</SiteShell>;
}
