// src/app/fr/layout.tsx
import SiteShell from "@/app/components/SiteShell";

export default function FRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell locale="fr">{children}</SiteShell>;
}
