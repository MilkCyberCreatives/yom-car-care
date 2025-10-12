import type { MetadataRoute } from 'next'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://yomcarcare.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
      disallow: [
        // nothing blocked for now; add admin/private paths if you create them
      ],
    },
    sitemap: [`${SITE}/sitemap.xml`],
    host: SITE,
  }
}
