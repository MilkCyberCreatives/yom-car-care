import { Truck, HandCoins, ShieldCheck, Globe2 } from 'lucide-react'

const items = [
  {
    Icon: Truck,
    title: 'Fast Local Delivery',
    text: 'Across Lubumbashi — same or next day for most orders.',
  },
  {
    Icon: HandCoins,
    title: 'Cash on Delivery',
    text: 'No online payments — simple & secure on delivery.',
  },
  {
    Icon: ShieldCheck,
    title: 'Quality Brands',
    text: 'Trusted products for exterior, interior & detailing.',
  },
  {
    Icon: Globe2,
    title: 'English & French',
    text: 'Website and support available in EN/FR.',
  },
]

export default function Benefits() {
  return (
    <section className="border-t border-white/10 bg-zinc-950">
      <div className="container-px py-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {items.map(({ Icon, title, text }) => (
          <div
            key={title}
            className="rounded-2xl border border-white/10 bg-zinc-900/40 p-5 hover:bg-zinc-900/60 transition"
          >
            <div className="flex items-center gap-3">
              <span className="grid place-items-center rounded-xl bg-[var(--brand-blue)]/20 p-2">
                <Icon />
              </span>
              <h3 className="font-semibold">{title}</h3>
            </div>
            <p className="text-white/70 mt-2 text-sm">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
