"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";

type Props = React.ComponentProps<typeof Link> & { href: string };

export default function LocaleLink({ href, ...rest }: Props) {
  const { locale } = useI18n();
  // If href is already absolute (http) leave as-is
  const isExternal = /^https?:\/\//i.test(href);
  const final = isExternal ? href : `/${locale}${href.startsWith("/") ? "" : "/"}${href}`.replace(/\/+$/,"").replace(/\/{2,}/g,"/");
  return <Link href={final} {...rest} />;
}
