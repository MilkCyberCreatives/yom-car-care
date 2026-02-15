import type { ReactNode } from "react";

import HeaderShell from "@/app/components/HeaderShell";
import Footer from "@/app/components/Footer";
import ScrollToTop from "@/app/components/ScrollToTop";
import BreadcrumbBar from "@/app/components/BreadcrumbBar";
import PageMasthead from "@/app/components/PageMasthead";
import PreFooterContact from "@/app/components/PreFooterContact";
import CookieConsent from "@/app/components/CookieConsent";
import Analytics from "@/app/components/Analytics";
import SeoBreadcrumbJsonLd from "@/app/components/SeoBreadcrumbJsonLd";
import GoogleAnalytics from "@/app/components/GoogleAnalytics";
import { I18nProvider } from "@/hooks/useI18n";
import type { Locale } from "@/i18n/config";

type SiteShellProps = {
  locale: Locale;
  children: ReactNode;
};

export default function SiteShell({ locale, children }: SiteShellProps) {
  return (
    <I18nProvider locale={locale}>
      <GoogleAnalytics />
      <Analytics />
      <SeoBreadcrumbJsonLd />
      <HeaderShell />
      <BreadcrumbBar />
      <PageMasthead />
      <div className="min-h-[60vh]">{children}</div>
      <PreFooterContact />
      <Footer />
      <CookieConsent />
      <ScrollToTop />
    </I18nProvider>
  );
}
