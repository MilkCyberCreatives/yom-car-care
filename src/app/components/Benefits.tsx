import { ShieldCheck, Truck, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Quality & Authenticity",
    desc: "Only trusted, manufacturer-approved products for Congo conditions.",
  },
  {
    icon: Truck,
    title: "Cash on Delivery",
    desc: "Order online, pay at your door in Lubumbashi. Simple & safe.",
  },
  {
    icon: Sparkles,
    title: "Expert Guidance",
    desc: "Get the right exterior, interior and detailing solution every time.",
  },
];

export default function Benefits() {
  return (
    <section className="container-px py-10">
      <h2 className="text-2xl font-semibold">Why Choose YOM Car Care?</h2>
      <p className="mt-2 text-white/70">
        Reliable products, fast delivery, and real support — in English or French.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="card p-5">
            <f.icon className="text-[var(--brand-blue)]" />
            <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
            <p className="mt-1 text-white/70">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
