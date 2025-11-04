import "../globals.css";
import { I18nProvider } from "@/hooks/useI18n";
import TopBar from "@/app/components/TopBar";
import MainHeader from "@/app/components/MainHeader";

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-black text-white antialiased">
        <I18nProvider>
          <TopBar />
          <MainHeader />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
