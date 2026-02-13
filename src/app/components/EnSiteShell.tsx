import type { ReactNode } from "react";

import SiteShell from "@/app/components/SiteShell";

type EnSiteShellProps = {
  children: ReactNode;
};

export default function EnSiteShell({ children }: EnSiteShellProps) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
