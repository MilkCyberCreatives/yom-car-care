import { products, type ProductData, type Category } from "@/app/data/products";

/** Normalize: lowercase, strip diacritics, collapse spaces */
export function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Quick tokenization */
function tokens(s: string) {
  return norm(s)
    .split(/[^a-z0-9+]+/)
    .filter(Boolean);
}

/** English + French synonyms map (normalized keys) */
const SYN: Record<string, string[]> = {
  exterior: ["outside", "bodywork", "paint", "exterieur", "extérieur"],
  interior: ["inside", "cabin", "habitacle", "interieur", "intérieur"],
  "air freshener": [
    "air-freshener",
    "airfreshener",
    "parfum",
    "desodorisant",
    "désodorisant",
    "sent-bon",
  ],
  detailing: ["finish", "polish", "detailing"],
  accessories: ["accessoires", "tools", "kit"],
  wax: ["polish", "cirer", "cire", "lustrant"],
  shampoo: ["soap", "wash", "shampoing", "savon"],
  foam: ["mousse", "snow foam", "prewash", "pre-wash"],
  tyre: ["tire", "pneu"],
  glass: ["vitre", "pare-brise", "windshield"],
  leather: ["cuir"],
  wipes: ["lingettes", "essuie"],
  microfibre: ["microfiber", "micro fibre", "micro-fiber"],
  silicone: ["silicon", "silicone"],
  fresh: ["frais", "fraicheur", "fraîcheur"],
};

function expandQuery(q: string): string[] {
  const toks = tokens(q);
  const bag = new Set<string>(toks);
  for (const t of toks) {
    const syns = SYN[t] || [];
    for (const s of syns) bag.add(norm(s));
    if (t === "air" || t === "freshener" || t === "airfreshener") {
      bag.add("air freshener");
      bag.add("air-freshener");
      bag.add("airfreshener");
    }
    if (t === "pneu" || t === "tire") bag.add("tyre");
  }
  return Array.from(bag);
}

export type SearchResult = {
  item: ProductData;
  score: number;
  reasons: string[];
};

export type SearchOptions = {
  categoryBoost?: Partial<Record<Category, number>>;
};

function scoreProduct(
  p: ProductData,
  expanded: string[],
  opts?: SearchOptions
): SearchResult {
  const name = norm(p.name);
  const cat = norm(p.category);
  const all = `${name} ${cat} ${norm(p.slug)}`;
  let score = 0;
  const reasons: string[] = [];

  for (const t of expanded) {
    if (!t) continue;
    if (t.length > 2 && all.includes(t)) {
      score += 3;
      reasons.push(t);
      continue;
    }
    const tt = tokens(t);
    for (const u of tt) {
      if (u.length <= 1) continue;
      if (name.includes(u)) {
        score += 3;
        reasons.push(u);
      } else if (cat.includes(u)) {
        score += 2;
        reasons.push(u);
      }
    }
  }

  const boost = opts?.categoryBoost?.[p.category] ?? 0;
  score += boost;

  return { item: p, score, reasons: Array.from(new Set(reasons)).slice(0, 6) };
}

export function searchProducts(query: string, opts?: SearchOptions) {
  const q = norm(query || "");
  if (!q) return { results: [] as SearchResult[], expanded: [] as string[] };

  const expanded = expandQuery(q);
  const scored = products
    .map((p) => scoreProduct(p, expanded, opts))
    .filter((r) => r.score > 0);

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.item.name.localeCompare(b.item.name);
  });

  return { results: scored, expanded };
}
