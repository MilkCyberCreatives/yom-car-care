"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_CHANGE_EVENT, CONSENT_STORAGE_KEY } from "@/lib/gtag";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncFromStorage = () => {
      try {
        setEnabled(window.localStorage.getItem(CONSENT_STORAGE_KEY) === "accepted");
      } catch {
        setEnabled(false);
      }
    };

    syncFromStorage();

    const onConsentChanged = (evt: Event) => {
      const custom = evt as CustomEvent<{ status?: string }>;
      const status = custom.detail?.status;
      if (status === "accepted") {
        setEnabled(true);
        return;
      }
      if (status === "dismissed") {
        setEnabled(false);
        return;
      }
      syncFromStorage();
    };

    window.addEventListener(CONSENT_CHANGE_EVENT, onConsentChanged);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onConsentChanged);
  }, []);

  if (!GA_ID) return null;
  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted'
            });
            gtag('config', '${GA_ID}', {
              anonymize_ip: true,
              send_page_view: false
            });
          `,
        }}
      />
    </>
  );
}
