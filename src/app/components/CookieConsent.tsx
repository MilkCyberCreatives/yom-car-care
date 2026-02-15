"use client";

import { useEffect, useState } from "react";
import { GA_ID, pageview, setConsent } from "@/lib/gtag";
import Link from "@/app/components/LocaleLink";
import { useI18n } from "@/hooks/useI18n";

const KEY = "yom-cookie-consent:v1";

export default function CookieConsent() {
  const { locale } = useI18n();
  const isFR = locale === "fr";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v === "accepted") {
        if (GA_ID) {
          setConsent(true);
          pageview(window.location.pathname + window.location.search);
        }
        return;
      }
      if (v === "dismissed") {
        if (GA_ID) setConsent(false);
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
                localStorage.setItem(KEY, "accepted");
              } catch {}
              if (GA_ID) {
                setConsent(true);
                pageview(window.location.pathname + window.location.search);
              }
              setOpen(false);
            }}
          >
            {isFR ? "Accepter" : "Accept"}
          </button>
          <button
            className="btn-ghost"
            onClick={() => {
              try {
                localStorage.setItem(KEY, "dismissed");
              } catch {}
              if (GA_ID) setConsent(false);
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
