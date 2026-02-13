import type { ReactNode } from "react";

import HeaderShell from "@/app/components/HeaderShell";
import Footer from "@/app/components/Footer";
import ScrollToTop from "@/app/components/ScrollToTop";
import { I18nProvider } from "@/hooks/useI18n";
import type { Locale } from "@/i18n/config";

type SiteShellProps = {
  locale: Locale;
  children: ReactNode;
};

export default function SiteShell({ locale, children }: SiteShellProps) {
  return (
    <I18nProvider locale={locale}>
      <HeaderShell />
      <div className="min-h-[60vh]">{children}</div>
      <Footer />
      <ScrollToTop />
    </I18nProvider>
  );
}
