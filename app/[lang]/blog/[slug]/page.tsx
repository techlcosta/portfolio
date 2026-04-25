import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BlogPageShell, getBlogHref } from '@/components/blog/blog-page-shell'
import { BlogPostBody } from '@/components/blog/blog-post-body'
import { Header } from '@/components/header'
import { JsonLd } from '@/components/json-ld'
import { hasLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getAllBlogStaticParams, getBlogPost } from '@/lib/blog'
import { absoluteUrl, languageAlternates, ogImage, openGraphLocales, personId, siteName, siteUrl, websiteId } from '@/lib/seo'

type BlogPostPageProps = Readonly<{
  params: Promise<{ lang: string; slug: string }>
}>

export function generateStaticParams() {
  return getAllBlogStaticParams()
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { lang, slug } = await params

  if (!hasLocale(lang)) {
    return {}
  }

  const post = await getBlogPost(lang, slug)

  if (!post) {
    return {}
  }

  const title = `${post.title} | Leandro Costa`
  const description = post.description
  const pathname = `/${lang}/blog/${slug}`
  const url = new URL(pathname, siteUrl)

  return {
    title,
    description,
    alternates: {
      canonical: pathname,
      languages: languageAlternates((locale) => `/${locale}/blog/${slug}`)
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: openGraphLocales[lang],
      alternateLocale: Object.values(openGraphLocales).filter((locale) => locale !== openGraphLocales[lang]),
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [siteName],
      section: post.category,
      images: [ogImage]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url]
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = await params

  if (!hasLocale(lang)) {
    notFound()
  }

  const [dict, post] = await Promise.all([getDictionary(lang), getBlogPost(lang, slug)])

  if (!post) {
    notFound()
  }

  const { Content } = post
  const pageUrl = absoluteUrl(`/${lang}/blog/${slug}`)
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: siteName,
        url: absoluteUrl(`/${lang}`)
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: siteName,
        url: siteUrl,
        inLanguage: lang,
        author: {
          '@id': personId
        }
      },
      {
        '@type': 'BlogPosting',
        '@id': `${pageUrl}#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        image: absoluteUrl(ogImage.url),
        inLanguage: lang,
        mainEntityOfPage: pageUrl,
        author: {
          '@id': personId
        },
        publisher: {
          '@id': personId
        },
        isPartOf: {
          '@id': websiteId
        },
        articleSection: post.category
      }
    ]
  }

  return (
    <main className="min-h-screen bg-[#02040b] text-white">
      <JsonLd data={structuredData} />
      <Header currentLocale={lang} navigation={dict.header.navigation} social={dict.header.social} languages={dict.languages} />

      <BlogPageShell backHref={getBlogHref(lang)} backLabel={dict.blog.backToBlog} eyebrow={post.category} title={post.title} description={post.description}>
        <BlogPostBody>
          <Content />
        </BlogPostBody>
      </BlogPageShell>
    </main>
  )
}
