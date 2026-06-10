import type { MetadataRoute } from 'next'

const BASE = 'https://bicofino.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    { url: BASE, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/foundation`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/on-pitch`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/off-pitch`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
  ]
}
