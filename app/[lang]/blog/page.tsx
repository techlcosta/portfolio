import { notFound } from 'next/navigation'

import { BlogCard } from '@/components/blog/blog-card'
import { BlogPageShell, getPortfolioHref } from '@/components/blog/blog-page-shell'
import { Header } from '@/components/header'
import { hasLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getBlogPosts } from '@/lib/blog'

type BlogPageProps = Readonly<{
  params: Promise<{ lang: string }>
}>

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
