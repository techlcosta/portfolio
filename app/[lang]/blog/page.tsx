import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BlogCard } from '@/components/blog/blog-card'
import { BlogPageShell, getPortfolioHref } from '@/components/blog/blog-page-shell'
import { Header } from '@/components/header'
import { hasLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getBlogPosts } from '@/lib/blog'
import { languageAlternates, ogImage, openGraphLocales, siteName, siteUrl } from '@/lib/seo'

type BlogPageProps = Readonly<{
  params: Promise<{ lang: string }>
}>

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { lang } = await params

  if (!hasLocale(lang)) {
    return {}
  }

  const dict = await getDictionary(lang)
  const title = `${dict.blog.title} | Leandro Costa`
  const description = dict.blog.description
  const pathname = `/${lang}/blog`
  const url = new URL(pathname, siteUrl)

  return {
    title,
    description,
    alternates: {
      canonical: pathname,
      languages: languageAlternates((locale) => `/${locale}/blog`)
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: openGraphLocales[lang],
      alternateLocale: Object.values(openGraphLocales).filter((locale) => locale !== openGraphLocales[lang]),
      type: 'website',
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

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params

  if (!hasLocale(lang)) {
    notFound()
  }

  const [dict, articles] = await Promise.all([getDictionary(lang), getBlogPosts(lang)])

  return (
    <main className="min-h-screen bg-[#02040b] text-white">
      <Header currentLocale={lang} navigation={dict.header.navigation} social={dict.header.social} languages={dict.languages} />

      <BlogPageShell
        backHref={getPortfolioHref(lang)}
        backLabel={dict.blog.backToPortfolio}
        eyebrow={dict.blog.eyebrow}
        title={dict.blog.title}
        description={dict.blog.description}
      >
        <div className="grid gap-5">
          {articles.length > 0 ? articles.map((article) => <BlogCard key={article.slug} article={article} locale={lang} />) : <p className="text-white/64">{dict.blog.empty}</p>}
        </div>
      </BlogPageShell>
    </main>
  )
}
