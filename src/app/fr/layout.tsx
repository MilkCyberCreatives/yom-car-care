// src/app/fr/layout.tsx
import { I18nProvider } from "@/hooks/useI18n";

export default function FRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider locale="fr">
      {children}
    </I18nProvider>
  );
}
