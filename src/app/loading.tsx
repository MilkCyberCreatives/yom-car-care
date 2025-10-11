export default function Loading() {
  return (
    <main className="container-px py-10">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-1/3 rounded bg-white/10" />
        <div className="h-4 w-2/3 rounded bg-white/10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-56 rounded-xl bg-white/5" />
          ))}
        </div>
      </div>
    </main>
  )
}
