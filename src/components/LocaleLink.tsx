"use client";

import NextLink from "next/link";
import useLocaleLink from "@/hooks/useLocaleLink";
import React from "react";

type AnchorExtras = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children"
>;

type Props = {
  href: string;              // e.g. "/products" or "https://external..."
  children: React.ReactNode;
} & AnchorExtras & {
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
};

function isExternal(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("sms:") ||
    href.startsWith("whatsapp:") ||
    href.startsWith("geo:") ||
    href.startsWith("//")
  );
}

/**
 * LocaleLink — safe wrapper for Next Link.
 * - Internal routes (starting with "/") get the active locale auto-prefixed.
 * - External/tel/mailto links render a normal <a>.
 * - TypeScript typedRoutes are satisfied by avoiding raw string to `next/link` directly.
 */
export default function LocaleLink({
  href,
  children,
  prefetch,
  replace,
  scroll,
  shallow,
  ...rest
}: Props) {
  const { l } = useLocaleLink();

  // External link — render <a>
  if (isExternal(href) || !href.startsWith("/")) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  // Internal link — locale-aware path (e.g., "/en/products")
  const localeHref = l(href) as unknown as any; // cast avoids typedRoutes errors

  return (
    <NextLink
      href={localeHref}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
