import JsonLd from "@/app/components/JsonLd";
import { getFaq } from "@/data/faq";
import { faqJsonLd, webPageJsonLd, type AppLocale } from "@/lib/seo";

type FaqPageContentProps = {
  locale: AppLocale;
  canonicalPath: string;
};

export default function FaqPageContent({
  locale,
  canonicalPath,
}: FaqPageContentProps) {
  const isFR = locale === "fr";
  const faqItems = getFaq(locale);

  const title = isFR
    ? "FAQ YOM Car Care - Lubumbashi"
    : "YOM Car Care FAQ - Lubumbashi";
  const description = isFR
    ? "Questions frequentes sur la commande, la livraison et le paiement a la livraison a Lubumbashi."
    : "Frequently asked questions about ordering, delivery, and cash-on-delivery in Lubumbashi.";

  return (
    <main className="container-px py-10">
      <JsonLd id={`faq-jsonld-${locale}`} data={faqJsonLd(locale, faqItems)} />
      <JsonLd
        id={`faq-webpage-jsonld-${locale}`}
        data={webPageJsonLd({ locale, path: canonicalPath, title, description })}
      />

      <section className="max-w-4xl">
        <h1 className="text-3xl font-semibold">{isFR ? "FAQ" : "FAQ"}</h1>
        <p className="mt-3 text-white/70">{description}</p>
      </section>

      <section className="mt-8 space-y-3">
        {faqItems.map((item) => (
          <details
            key={item.question}
            className="rounded-2xl border border-white/10 bg-zinc-900/40 px-5 py-4"
          >
            <summary className="cursor-pointer list-none font-medium">
              {item.question}
            </summary>
            <p className="mt-3 text-sm text-white/80">{item.answer}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
