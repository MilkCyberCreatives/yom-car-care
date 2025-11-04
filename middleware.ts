import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "./src/i18n";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Already has /en or /fr → allow
  const pathLocale = pathname.split("/")[1];
  if (SUPPORTED_LOCALES.includes(pathLocale as any)) {
    return NextResponse.next();
  }

  // Otherwise rewrite to default locale
  const url = req.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // run middleware for ALL pages except _next, assets, api
    "/((?!_next|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)|api/).*)",
  ],
};
