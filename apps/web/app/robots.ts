import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Club é members-only — fora do índice.
      disallow: '/club',
    },
    sitemap: 'https://bicofino.com/sitemap.xml',
  }
}
