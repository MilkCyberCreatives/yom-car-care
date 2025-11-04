import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, isLocale } from "@/i18n/config";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignore static files / api
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // already /en or /fr
  const seg = pathname.split("/")[1];
  if (isLocale(seg)) return NextResponse.next();

  // otherwise redirect to default locale
  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // run on all routes
  matcher: ["/((?!_next|.*\\..*).*)"],
};
