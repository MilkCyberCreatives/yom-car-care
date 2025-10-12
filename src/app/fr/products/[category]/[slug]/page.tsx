import ENPage, { generateMetadata as enGenerateMetadata } from '../../../../products/[category]/[slug]/page'
import { products } from '@/data/products'

export default ENPage
export const generateMetadata = enGenerateMetadata

// IMPORTANT: define FR static params locally so Next exports /fr/products/...
export async function generateStaticParams() {
  return products.map(p => ({
    category: p.category,
    slug: p.slug,
  }))
}
