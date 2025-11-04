import "../globals.css";
import { isLocale, type Locale, defaultLocale } from "@/i18n/config";
import { I18nProvider } from "@/hooks/useI18n";

export const dynamic = "force-dynamic";

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale?: string };
}) {
  const raw = params?.locale;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;

  return (
    <html lang={locale}>
      <body>
        <I18nProvider locale={locale}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
