"use client";

import { usePathname } from "next/navigation";

/**
 * LanguageSwitcher
 * - Avoids typedRoutes issues by using <a> anchors.
 * - Preserves the current path while toggling `/fr` prefix.
 */
export default function LanguageSwitcher() {
  const pathname = usePathname() || "/";

  const isFR = pathname.startsWith("/fr");
  const toEN = pathname.replace(/^\/fr/, "") || "/";
  const toFR = isFR ? pathname : `/fr${pathname}`;

  return (
    <div className="flex items-center gap-2 text-xs md:text-sm">
      <a
        href={toEN}
        className={`hover:underline ${!isFR ? "font-semibold" : ""}`}
        aria-current={!isFR ? "true" : undefined}
      >
        EN
      </a>
      <span aria-hidden>•</span>
      <a
        href={toFR}
        className={`hover:underline ${isFR ? "font-semibold" : ""}`}
        aria-current={isFR ? "true" : undefined}
      >
        FR
      </a>
    </div>
  );
}
