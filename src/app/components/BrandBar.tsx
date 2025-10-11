export default function BrandBar() {
  const brands = ['Shield', 'Sheen', 'Fresh 24', 'MicroFibre', 'Miraplate']

  return (
    <section className="container-px py-8">
      <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-5">
        <p className="text-white/70 text-sm">Brands we supply</p>
        <div className="mt-3 flex flex-wrap items-center gap-3 md:gap-4">
          {brands.map((b) => (
            <span
              key={b}
              className="rounded-xl border border-white/15 bg-black/40 px-4 py-2 text-white/85"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
