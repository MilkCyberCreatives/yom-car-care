"use client";

import { useEffect, useState } from "react";
import { GA_ID, setConsent } from "@/lib/gtag";
import Link from "@/components/LocaleLink"; // ✅ locale-aware internal links

const KEY = "yom-cookie-consent:v1";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (!v) setOpen(true);
    } catch {
      // ignore
    }
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80]">
      <div className="mx-auto max-w-4xl rounded-t-2xl border border-white/10 bg-zinc-900/95 backdrop-blur p-4 md:p-5">
        <p className="text-sm text-white/80">
          We use basic cookies to improve site experience and analytics. By using this site, you
          agree to our{" "}
          <Link className="underline" href="/privacy-policy">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link className="underline" href="/cookie-policy">
            Cookie Policy
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
              if (GA_ID) setConsent(true);
              setOpen(false);
            }}
          >
            Accept
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
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
