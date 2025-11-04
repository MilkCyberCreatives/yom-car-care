// src/app/components/HeaderShell.tsx
"use client";

import TopBar from "./TopBar";
import MainHeader from "./MainHeader";

/**
 * Simple wrapper that stacks TopBar and MainHeader
 * and pins them to the top. Locale switching logic
 * now lives inside TopBar/MainHeader, so no helpers
 * are imported from useI18n here.
 */
export default function HeaderShell() {
  return (
    <div className="sticky top-0 z-[9999]">
      <TopBar />
      <MainHeader />
    </div>
  );
}
