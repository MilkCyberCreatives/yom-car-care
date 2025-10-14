"use client";

import { useState } from "react";
import { useCompare } from "@/components/compare/CompareProvider";
import CompareTable from "@/components/compare/CompareTable";

export default function CompareBar() {
  const { items } = useCompare(); // assumes your provider exposes { items }
  const [open, setOpen] = useState(false);

  if (!items?.length) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto max-w-5xl mb-3 rounded-2xl border border-white/10 bg-zinc-900/90 backdrop-blur px-4 py-3 shadow-xl">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm text-white/80">
            {items.length} item{items.length > 1 ? "s" : ""} in compare
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="btn-primary"
            >
              {open ? "Hide compare" : "Open compare"}
            </button>
          </div>
        </div>

        {open ? <CompareTable onClose={() => setOpen(false)} /> : null}
      </div>
    </div>
  );
}
