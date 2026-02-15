"use client";

import { useEffect, useState } from "react";
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_STORAGE_KEY,
  GA_ID,
  pageview,
  setConsent,
} from "@/lib/gtag";
import Link from "@/app/components/LocaleLink";
import { useI18n } from "@/hooks/useI18n";

function notifyConsent(status: "accepted" | "dismissed") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(CONSENT_CHANGE_EVENT, {
      detail: { status },
    })
  );
}

export default function CookieConsent() {
  const { locale } = useI18n();
  const isFR = locale === "fr";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (v === "accepted") {
        if (GA_ID) {
          setConsent(true);
          pageview(window.location.pathname + window.location.search);
        }
        notifyConsent("accepted");
        return;
      }
      if (v === "dismissed") {
        if (GA_ID) setConsent(false);
        notifyConsent("dismissed");
        return;
      }
      setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80]">
      <div className="mx-auto max-w-4xl rounded-t-2xl border border-white/10 bg-zinc-900/95 backdrop-blur p-4 md:p-5">
        <p className="text-sm text-white/80">
          {isFR
            ? "Nous utilisons des cookies de base pour ameliorer l'experience et les analyses. En utilisant ce site, vous acceptez notre "
            : "We use basic cookies to improve site experience and analytics. By using this site, you agree to our "}
          <Link className="underline" href="/privacy-policy">
            {isFR ? "Politique de confidentialite" : "Privacy Policy"}
          </Link>{" "}
          {isFR ? "et " : "and "}
          <Link className="underline" href="/cookie-policy">
            {isFR ? "Politique des cookies" : "Cookie Policy"}
          </Link>
          .
        </p>
        <div className="mt-3 flex gap-2">
          <button
            className="btn-primary"
            onClick={() => {
              try {
                localStorage.setItem(CONSENT_STORAGE_KEY, "accepted");
              } catch {}
              if (GA_ID) {
                setConsent(true);
                pageview(window.location.pathname + window.location.search);
              }
              notifyConsent("accepted");
              setOpen(false);
            }}
          >
            {isFR ? "Accepter" : "Accept"}
          </button>
          <button
            className="btn-ghost"
            onClick={() => {
              try {
                localStorage.setItem(CONSENT_STORAGE_KEY, "dismissed");
              } catch {}
              if (GA_ID) setConsent(false);
              notifyConsent("dismissed");
              setOpen(false);
            }}
          >
            {isFR ? "Fermer" : "Dismiss"}
          </button>
        </div>
      </div>
    </div>
  );
}
