"use client";

import Link from "next/link";
import { useI18n } from "@/hooks/useI18n";

type Props = React.ComponentProps<typeof Link> & { href: string };

function normalize(p: string) {
  return p.replace(/\/{2,}/g, "/");
}

export default function LocaleLink({ href, ...rest }: Props) {
  const { locale } = useI18n();

  const isExternal = /^https?:\/\//i.test(href);
  if (isExternal) return <Link href={href} {...rest} />;

  const path = href.startsWith("/") ? href : `/${href}`;
  const basePath = normalize(path.replace(/^\/(en|fr)(\/|$)/, "/"));
  const final = normalize(`/${locale}${basePath === "/" ? "" : basePath}`);

  return <Link href={final} {...rest} />;
}
