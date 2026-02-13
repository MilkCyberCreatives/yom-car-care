// src/app/components/Providers.tsx
"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { I18nProvider } from "@/hooks/useI18n";
import type { Locale } from "@/i18n/config";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";

  const locale: Locale = useMemo(() => {
    // French only when URL starts with /fr
    return pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";
  }, [pathname]);

  return <I18nProvider locale={locale}>{children}</I18nProvider>;
}
