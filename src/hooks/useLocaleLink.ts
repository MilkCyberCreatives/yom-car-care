// src/hooks/useLocaleLink.tsx
"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function useLocaleLink() {
  const pathname = usePathname() || "/";

  const locale = useMemo<"en" | "fr">(() => {
    return pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";
  }, [pathname]);

  return useMemo(() => {
    const l = (path: string) => {
      const p = path.startsWith("/") ? path : `/${path}`;
      const normalized = p.replace(/^\/(en|fr)(\/|$)/, "/");
      return locale === "fr"
        ? normalized === "/"
          ? "/fr"
          : `/fr${normalized}`
        : normalized === "/"
        ? "/en"
        : `/en${normalized}`;
    };

    return { locale, l };
  }, [locale]);
}
