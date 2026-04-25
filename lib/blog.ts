import type { ComponentType } from 'react'

import EnMultiTimeframeAnalysis, { article as enMultiTimeframeAnalysisArticle } from '@/content/blog/en/multi-timeframe-analysis.mdx'
import JaMultiTimeframeAnalysis, { article as jaMultiTimeframeAnalysisArticle } from '@/content/blog/ja/multi-timeframe-analysis.mdx'
import PtMultiTimeframeAnalysis, { article as ptMultiTimeframeAnalysisArticle } from '@/content/blog/pt/multi-timeframe-analysis.mdx'
import type { Locale } from '@/i18n/config'
import { locales } from '@/i18n/config'

export type BlogArticle = {
  title: string
  description: string
  category: string
  publishedAt: string
}

export type BlogPost = BlogArticle & {
  slug: string
}

type BlogPostModule = {
  default: ComponentType
  article: BlogArticle
}

const blogPostModules: Record<Locale, Record<string, BlogPostModule>> = {
  en: {
    'multi-timeframe-analysis': {
      default: EnMultiTimeframeAnalysis,
      article: enMultiTimeframeAnalysisArticle
    }
  },
  ja: {
    'multi-timeframe-analysis': {
      default: JaMultiTimeframeAnalysis,
      article: jaMultiTimeframeAnalysisArticle
    }
  },
  pt: {
    'multi-timeframe-analysis': {
      default: PtMultiTimeframeAnalysis,
      article: ptMultiTimeframeAnalysisArticle
    }
  }
}

function getLocaleArticleSlugs(locale: Locale) {
  return Object.keys(blogPostModules[locale]).sort((firstSlug, secondSlug) => firstSlug.localeCompare(secondSlug))
}

export async function getBlogPost(locale: Locale, slug: string) {
  const post = blogPostModules[locale][slug]

  if (!post) {
    return null
  }

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
        publishedAt: post.publishedAt
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
