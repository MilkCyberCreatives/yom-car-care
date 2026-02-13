import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";
import type { Route } from "next";

type PageProps = { params: { locale: string } };

type SectionCopy = {
  metaTitle: string;
  metaDescription: string;
  bannerKicker: string;
  bannerTitle: string;
  bannerDesc: string;
  callCta: string;
  browseCta: string;
  stats: Array<{ label: string; value: string }>;
  storyTitle: string;
  storyParagraphs: [string, string];
  offerTitle: string;
  offerItems: string[];
  offerLinks: Array<{ href: string; label: string }>;
  values: Array<{ title: string; text: string }>;
  contactTitle: string;
  contactLines: Array<{ label: string; value: string }>;
  ctaTitle: string;
  ctaDesc: string;
  ctaBrowse: string;
  ctaWhatsapp: string;
  waMessage: string;
};

const EN_COPY: SectionCopy = {
  metaTitle: "About Us - YOM Car Care",
  metaDescription:
    "YOM Car Care supplies premium exterior, interior, detailing, accessories and air fresheners in Lubumbashi with cash on delivery.",
  bannerKicker: "About us",
  bannerTitle: "Premium car care products in Lubumbashi",
  bannerDesc:
    "We help drivers, detailers, and fleets keep vehicles looking new with trusted brands and expert guidance. Order by phone or WhatsApp with Cash on Delivery.",
  callCta: "Call +243 84 899 4045",
  browseCta: "Browse Products",
  stats: [
    { label: "Products in catalog", value: "50+" },
    { label: "Core categories", value: "5" },
    { label: "Delivery area", value: "Lubumbashi" },
    { label: "Payment", value: "Cash on Delivery" },
  ],
  storyTitle: "Our story",
  storyParagraphs: [
    "YOM Car Care was created to make quality car care more accessible in the DRC. We curate proven products for each step from pre-wash and shampoo to leather care, interior detailing, air fresheners and microfiber accessories.",
    "Whether you maintain a daily driver or prepare vehicles for sale, we help you choose the right combination for a deep clean and lasting shine.",
  ],
  offerTitle: "What we offer",
  offerItems: [
    "Exterior: foams, shampoos, waxes, tyre care",
    "Interior: leather care, wipes, dressings",
    "Air Fresheners: long-lasting popular scents",
    "Detailing: silicone, dressings, finishing products",
    "Accessories: sponges, mitts, towels, kits and more",
  ],
  offerLinks: [
    { href: "/products/exterior", label: "Exterior" },
    { href: "/products/interior", label: "Interior" },
    { href: "/products/air-fresheners", label: "Air Fresheners" },
    { href: "/products/detailing", label: "Detailing" },
    { href: "/products/accessories", label: "Accessories" },
  ],
  values: [
    {
      title: "Quality first",
      text: "We stock reputable brands and prioritize consistency over trends.",
    },
    {
      title: "Simple and local",
      text: "Order by phone or WhatsApp and pay on delivery with no online payment required.",
    },
    {
      title: "Practical advice",
      text: "Tell us your goal and vehicle condition and we suggest the right combination.",
    },
  ],
  contactTitle: "Visit or contact us",
  contactLines: [
    { label: "Address", value: "538 Avenue Kipopo, Golf Malela, Lubumbashi" },
    { label: "Tel", value: "+243 84 899 4045" },
    { label: "Email", value: "info@yomcarcare.com" },
    { label: "Languages", value: "English and French" },
    { label: "Delivery", value: "Lubumbashi (same or next day on most orders)" },
  ],
  ctaTitle: "Ready to refresh your car?",
  ctaDesc: "Explore the catalog or message us for a tailored recommendation.",
  ctaBrowse: "Explore Products",
  ctaWhatsapp: "WhatsApp Us",
  waMessage: "Hello YOM Car Care, I would like a recommendation for my vehicle.",
};

const FR_COPY: SectionCopy = {
  metaTitle: "A propos - YOM Car Care",
  metaDescription:
    "YOM Car Care propose des produits premium pour exterieur, interieur, detailing, accessoires et desodorisants a Lubumbashi avec paiement a la livraison.",
  bannerKicker: "A propos",
  bannerTitle: "Produits premium d entretien auto a Lubumbashi",
  bannerDesc:
    "Nous aidons conducteurs, detailers et flottes a garder leurs vehicules impeccables avec des marques fiables et des conseils experts. Commandez par telephone ou WhatsApp avec paiement a la livraison.",
  callCta: "Appeler +243 84 899 4045",
  browseCta: "Voir les produits",
  stats: [
    { label: "Produits au catalogue", value: "50+" },
    { label: "Categories principales", value: "5" },
    { label: "Zone de livraison", value: "Lubumbashi" },
    { label: "Paiement", value: "Paiement a la livraison" },
  ],
  storyTitle: "Notre histoire",
  storyParagraphs: [
    "YOM Car Care a ete cree pour rendre l entretien auto de qualite plus accessible en RDC. Nous selectionnons des produits efficaces pour chaque etape, du pre-lavage au shampoing, en passant par l entretien du cuir, le detailing interieur, les desodorisants et les accessoires microfibres.",
    "Que vous entreteniez un vehicule personnel ou prepariez des vehicules pour la vente, nous vous aidons a choisir la bonne combinaison pour un nettoyage profond et une brillance durable.",
  ],
  offerTitle: "Ce que nous proposons",
  offerItems: [
    "Exterieur: mousses, shampoings, cires, entretien pneus",
    "Interieur: soin cuir, lingettes, dressings",
    "Desodorisants: parfums populaires longue duree",
    "Detailing: silicone, dressings, produits de finition",
    "Accessoires: eponges, gants, serviettes, kits et plus",
  ],
  offerLinks: [
    { href: "/products/exterior", label: "Exterieur" },
    { href: "/products/interior", label: "Interieur" },
    { href: "/products/air-fresheners", label: "Desodorisants" },
    { href: "/products/detailing", label: "Detailing" },
    { href: "/products/accessories", label: "Accessoires" },
  ],
  values: [
    {
      title: "Qualite avant tout",
      text: "Nous proposons des marques reconnues avec une qualite constante.",
    },
    {
      title: "Simple et local",
      text: "Commandez par telephone ou WhatsApp et payez a la livraison.",
    },
    {
      title: "Conseils utiles",
      text: "Expliquez votre besoin et l etat du vehicule, nous recommandons la bonne combinaison.",
    },
  ],
  contactTitle: "Visitez-nous ou contactez-nous",
  contactLines: [
    { label: "Adresse", value: "538 Avenue Kipopo, Golf Malela, Lubumbashi" },
    { label: "Telephone", value: "+243 84 899 4045" },
    { label: "Email", value: "info@yomcarcare.com" },
    { label: "Langues", value: "Francais et anglais" },
    { label: "Livraison", value: "Lubumbashi (meme jour ou lendemain selon la commande)" },
  ],
  ctaTitle: "Pret a redonner de l eclat a votre voiture ?",
  ctaDesc: "Explorez le catalogue ou ecrivez-nous pour une recommandation adaptee.",
  ctaBrowse: "Explorer les produits",
  ctaWhatsapp: "WhatsApp",
  waMessage: "Bonjour YOM Car Care, je souhaite une recommandation pour mon vehicule.",
};

function getCopy(locale: string): SectionCopy {
  return locale === "fr" ? FR_COPY : EN_COPY;
}

export async function generateMetadata(
  { params }: PageProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const copy = getCopy(params.locale);

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: `/${params.locale}/about`,
      languages: {
        en: "/en/about",
        fr: "/fr/about",
      },
    },
  };
}

export default function AboutPage({ params }: PageProps) {
  const { locale } = params;
  const copy = getCopy(locale);
  const l = (path: string) =>
    (`/${locale}${path.startsWith("/") ? path : `/${path}`}`) as Route;

  return (
    <main>
      <section className="container-px py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.stats.map((item) => (
            <Stat key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      </section>

      <section className="container-px py-6 md:py-10">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
            <h2 className="text-xl font-semibold md:text-2xl">{copy.storyTitle}</h2>
            <p className="mt-3 text-white/80">{copy.storyParagraphs[0]}</p>
            <p className="mt-3 text-white/80">{copy.storyParagraphs[1]}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
            <h2 className="text-xl font-semibold md:text-2xl">{copy.offerTitle}</h2>
            <ul className="mt-3 grid gap-2 text-white/80">
              {copy.offerItems.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              {copy.offerLinks.map((item) => (
                <Link key={item.href} href={l(item.href)} className="btn-ghost">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-zinc-950">
        <div className="container-px grid gap-5 py-10 md:grid-cols-3">
          {copy.values.map((item) => (
            <Value key={item.title} title={item.title} text={item.text} />
          ))}
        </div>
      </section>

      <section className="container-px py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
            <h2 className="text-xl font-semibold md:text-2xl">{copy.contactTitle}</h2>
            <ul className="mt-4 space-y-1 text-white/80">
              {copy.contactLines.map((line) => (
                <li key={line.label}>
                  <strong>{line.label}:</strong> {line.value}
                </li>
              ))}
            </ul>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <a href="tel:+243848994045" className="btn-primary">
                {copy.callCta}
              </a>
              <Link href={l("/products")} className="btn-ghost">
                {copy.browseCta}
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="YOM Car Care Location"
              src="https://www.google.com/maps?q=538%20Avenue%20Kipopo,%20Lubumbashi&output=embed"
              width="100%"
              height="360"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="container-px pb-14">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[var(--brand-blue)]/20 to-transparent p-6 md:p-8">
          <h3 className="text-2xl font-semibold md:text-3xl">{copy.ctaTitle}</h3>
          <p className="mt-2 text-white/80">{copy.ctaDesc}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={l("/products")} className="btn-ghost">
              {copy.ctaBrowse}
            </Link>
            <a
              className="btn-primary"
              href={`https://wa.me/243848994045?text=${encodeURIComponent(copy.waMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.ctaWhatsapp}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-5">
      <div className="text-3xl font-semibold">{value}</div>
      <div className="mt-1 text-white/70">{label}</div>
    </div>
  );
}

function Value({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-white/80">{text}</p>
    </div>
  );
}
