"use client";

import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes } from "react";

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/**
 * LocaleLink
 * - If you're on /fr, prefixes internal hrefs with /fr.
 * - Accepts only string hrefs; renders a plain <a>.
 * - Avoids typedRoutes issues (no next/link).
 */
export default function LocaleLink({ href, ...props }: AnchorProps) {
  const pathname = usePathname() || "/";
  const isFR = pathname.startsWith("/fr");
  const isInternal = href.startsWith("/");

  const computed = isFR
    ? isInternal
      ? href.startsWith("/fr")
        ? href
        : `/fr${href === "/" ? "" : href}`
      : href
    : isInternal
      ? href.replace(/^\/fr/, "") || "/"
      : href;

  return <a href={computed} {...props} />;
}
