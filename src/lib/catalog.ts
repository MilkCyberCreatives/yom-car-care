export type SortKey = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc'

export function sortProducts<T extends { name: string; price?: number | null }>(
  items: T[],
  sort: SortKey
): T[] {
  const copy = [...items]
  switch (sort) {
    case 'name-asc':
      return copy.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return copy.sort((a, b) => b.name.localeCompare(a.name))
    case 'price-asc':
      return copy.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))
    case 'price-desc':
      return copy.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity))
    default:
      return copy
  }
}

export function unique<T>(arr: T[]) {
  return Array.from(new Set(arr)).filter(Boolean) as T[]
}
