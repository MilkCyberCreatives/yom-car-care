// src/lib/gtag.ts
"use client";

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const CONSENT_STORAGE_KEY = "yom-cookie-consent:v1";
export const CONSENT_CHANGE_EVENT = "yom-consent-change";

/** Safe wrapper around gtag that won't throw during SSR or when GA is missing */
export function gtag(...args: any[]) {
  if (typeof window === "undefined" || !GA_ID) return;
  window.dataLayer = window.dataLayer || [];
  // Initialize gtag once – pushes args into dataLayer
  if (!window.gtag) {
    window.gtag = (...a: any[]) => {
      window.dataLayer.push(a);
    };
  }
  window.gtag(...args);
}

export function setConsent(granted: boolean) {
  if (!GA_ID) return;
  gtag("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  });
}

export function pageview(url: string) {
  if (!GA_ID) return;
  gtag("config", GA_ID, { page_path: url, anonymize_ip: true });
}

export function event(name: string, params: Record<string, any> = {}) {
  if (!GA_ID) return;
  gtag("event", name, params);
}
