import ENPage, { generateMetadata as enGenerateMetadata } from '../../../products/[category]/page'
import { products } from '@/data/products'

export default ENPage
export const generateMetadata = enGenerateMetadata

// IMPORTANT: define FR static params locally
export async function generateStaticParams() {
  const categories = Array.from(new Set(products.map(p => p.category)))
  return categories.map(category => ({ category }))
}
