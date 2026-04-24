import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import type { ComponentType } from 'react'

import type { Locale } from '@/i18n/config'
import { locales } from '@/i18n/config'

export type BlogArticle = {
  title: string
  description: string
  category: string
  publishedAt: string
  readTime: string
}

export type BlogPost = BlogArticle & {
  slug: string
}

type BlogPostModule = {
  default: ComponentType
  article: BlogArticle
}

const blogContentDirectory = path.join(process.cwd(), 'content/blog')

function getLocaleBlogDirectory(locale: Locale) {
  return path.join(blogContentDirectory, locale)
}

function getLocaleArticleSlugs(locale: Locale) {
  const directory = getLocaleBlogDirectory(locale)

  if (!existsSync(directory)) {
    return []
  }

  return readdirSync(directory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
    .sort((firstSlug, secondSlug) => firstSlug.localeCompare(secondSlug))
}

export async function getBlogPost(locale: Locale, slug: string) {
  if (!getLocaleArticleSlugs(locale).includes(slug)) {
    return null
  }

  const post = (await import(`@/content/blog/${locale}/${slug}.mdx`)) as BlogPostModule

  return {
    ...post.article,
    slug,
    Content: post.default
  }
}

export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  const posts = await Promise.all(
    getLocaleArticleSlugs(locale).map(async (slug) => {
      const post = await getBlogPost(locale, slug)

      if (!post) {
        return null
      }

      return {
        slug: post.slug,
        title: post.title,
        description: post.description,
        category: post.category,
        publishedAt: post.publishedAt,
        readTime: post.readTime
      }
    })
  )

  return posts
    .filter((post): post is BlogPost => Boolean(post))
    .sort((firstPost, secondPost) => new Date(secondPost.publishedAt).getTime() - new Date(firstPost.publishedAt).getTime())
}

export function getAllBlogStaticParams() {
  return locales.flatMap((locale) => getLocaleArticleSlugs(locale).map((slug) => ({ lang: locale, slug })))
}
