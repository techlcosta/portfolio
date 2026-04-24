import type { ComponentType } from 'react'

import EnFullStackNotes, { article as enFullStackNotesArticle } from '@/content/blog/en/full-stack-notes.mdx'
import EnLearningNewTechnologies, { article as enLearningNewTechnologiesArticle } from '@/content/blog/en/learning-new-technologies.mdx'
import JaFullStackNotes, { article as jaFullStackNotesArticle } from '@/content/blog/ja/full-stack-notes.mdx'
import JaLearningNewTechnologies, { article as jaLearningNewTechnologiesArticle } from '@/content/blog/ja/learning-new-technologies.mdx'
import PtFullStackNotes, { article as ptFullStackNotesArticle } from '@/content/blog/pt/full-stack-notes.mdx'
import PtLearningNewTechnologies, { article as ptLearningNewTechnologiesArticle } from '@/content/blog/pt/learning-new-technologies.mdx'
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

const blogPostModules: Record<Locale, Record<string, BlogPostModule>> = {
  en: {
    'full-stack-notes': {
      default: EnFullStackNotes,
      article: enFullStackNotesArticle
    },
    'learning-new-technologies': {
      default: EnLearningNewTechnologies,
      article: enLearningNewTechnologiesArticle
    }
  },
  ja: {
    'full-stack-notes': {
      default: JaFullStackNotes,
      article: jaFullStackNotesArticle
    },
    'learning-new-technologies': {
      default: JaLearningNewTechnologies,
      article: jaLearningNewTechnologiesArticle
    }
  },
  pt: {
    'full-stack-notes': {
      default: PtFullStackNotes,
      article: ptFullStackNotesArticle
    },
    'learning-new-technologies': {
      default: PtLearningNewTechnologies,
      article: ptLearningNewTechnologiesArticle
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
