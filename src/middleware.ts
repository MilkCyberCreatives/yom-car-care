// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["en", "fr"] as const;
const DEFAULT_LOCALE = "en";

// Skip files and Next internals
function isPublicFile(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap") ||
    pathname.startsWith("/manifest") ||
    pathname.match(/\.(.*)$/) // .png, .jpg, .css, .js, etc
  );
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // ignore assets / api / files
  if (isPublicFile(pathname)) return NextResponse.next();

  // pathname parts
  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0];

  // already locale-prefixed
  if (first && LOCALES.includes(first as any)) return NextResponse.next();

  // redirect "/" -> "/en"
  const target = new URL(`/${DEFAULT_LOCALE}${pathname}${search}`, req.url);
  return NextResponse.redirect(target);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
