"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { useI18n } from "@/hooks/useI18n";
import { getFaq } from "@/data/faq";

export default function FAQ() {
  const { locale } = useI18n();
  const isFR = locale === "fr";
  const title = isFR ? "Questions frequentes" : "Frequently Asked Questions";
  const faqs = getFaq(locale);

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container-px py-12">
      <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>

      <div className="mt-6 space-y-3">
        {faqs.map((item, idx) => {
          const isOpen = open === idx;

          return (
            <div
              key={item.question}
              className="rounded-2xl border border-white/10 bg-zinc-900/40 overflow-hidden"
            >
              <button
                type="button"
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpen(isOpen ? null : idx)}
                aria-expanded={isOpen}
              >
                <span className="font-medium">{item.question}</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-0 text-white/80 text-sm">{item.answer}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
