import type { MetadataRoute } from 'next'

import { locales } from '@/i18n/config'
import { getBlogPosts } from '@/lib/blog'
import { absoluteUrl, languageAlternates } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const portfolioRoutes = locales.map((locale) => ({
    url: absoluteUrl(`/${locale}`),
    changeFrequency: 'monthly' as const,
    priority: 1,
    alternates: {
      languages: languageAlternates((alternateLocale) => absoluteUrl(`/${alternateLocale}`))
    }
  }))

  const blogIndexRoutes = locales.map((locale) => ({
    url: absoluteUrl(`/${locale}/blog`),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    alternates: {
      languages: languageAlternates((alternateLocale) => absoluteUrl(`/${alternateLocale}/blog`))
    }
  }))

  const blogPostRoutes = (
    await Promise.all(
      locales.map(async (locale) => {
        const posts = await getBlogPosts(locale)

        return posts.map((post) => ({
          url: absoluteUrl(`/${locale}/blog/${post.slug}`),
          lastModified: post.publishedAt,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
          alternates: {
            languages: languageAlternates((alternateLocale) => absoluteUrl(`/${alternateLocale}/blog/${post.slug}`))
          }
        }))
      })
    )
  ).flat()

  return [...portfolioRoutes, ...blogIndexRoutes, ...blogPostRoutes]
}
