import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["en", "fr"] as const;
type Locale = (typeof LOCALES)[number];

function isLocale(value: string | undefined): value is Locale {
  return !!value && LOCALES.includes(value as Locale);
}

function isPublicPath(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap") ||
    pathname.startsWith("/manifest") ||
    pathname.match(/\.[^/]+$/) !== null
  );
}

function localeFromAcceptLanguage(value: string | null): Locale | undefined {
  if (!value) return undefined;
  const normalized = value.toLowerCase();
  if (normalized.includes("fr")) return "fr";
  if (normalized.includes("en")) return "en";
  return undefined;
}

function detectLocale(req: NextRequest): Locale {
  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;
  if (isLocale(cookieLocale)) return cookieLocale;

  const country = req.headers.get("x-vercel-ip-country")?.toUpperCase();
  if (country === "CD") return "fr";

  return localeFromAcceptLanguage(req.headers.get("accept-language")) || "en";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublicPath(pathname)) return NextResponse.next();

  const firstSegment = pathname.split("/").filter(Boolean)[0];
  if (isLocale(firstSegment)) return NextResponse.next();

  const locale = detectLocale(req);
  const target = req.nextUrl.clone();
  target.pathname = `/${locale}${pathname}`;

  const response = NextResponse.redirect(target);
  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
