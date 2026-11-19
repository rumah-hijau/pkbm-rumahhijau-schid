import type { MetadataRoute } from 'next'
import { getPosts } from '@/lib/posts'
import { site } from '@/lib/site'

export const revalidate = 3600
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()
  return [
    { url: site.url, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/berita`, changeFrequency: 'daily', priority: 0.8 },
    ...posts.map(p => ({ url: `${site.url}/berita/${p.slug}`, lastModified: p.published_at ?? undefined })),
  ]
}
