"use client";

import Link, { LinkProps } from "next/link";
import React from "react";
import { useI18n } from "@/hooks/useI18n";

type Props = LinkProps & {
  className?: string;
  children: React.ReactNode;
};

export default function LocaleLink({ href, className, children, ...rest }: Props) {
  const { l } = useI18n(); // l() builds /fr/... or /...

  // href from props can be string | URL | object depending on LinkProps,
  // we only support string here for simplicity
  const finalHref =
    typeof href === "string"
      ? l(href)
      : typeof href === "object" && "pathname" in href && typeof href.pathname === "string"
      ? l(href.pathname)
      : href;

  return (
    <Link href={finalHref} className={className} {...rest}>
      {children}
    </Link>
  );
}
