import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import type { BlogPost } from '@/lib/blog'

type BlogCardProps = {
  article: BlogPost
  locale: Locale
}

const dateLocales: Record<Locale, string> = {
  en: 'en-US',
  pt: 'pt-BR',
  ja: 'ja-JP'
}

function formatPublishedDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(dateLocales[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${date}T00:00:00.000Z`))
}

export function BlogCard({ article, locale }: BlogCardProps) {
  const publishedDate = formatPublishedDate(article.publishedAt, locale)

  return (
    <Link
      href={`/${locale}/blog/${article.slug}`}
      className="group hover:border-primary/40 rounded-[1.75rem] border border-white/10 bg-white/3 p-6 transition-colors hover:bg-white/6 sm:p-8"
    >
      <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-medium tracking-[0.18em] text-white/46">
        <span className="uppercase">{article.category}</span>
        <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden="true" />
        <time dateTime={article.publishedAt}>{publishedDate}</time>
      </div>

      <div className="space-y-3">
        <h2 className="group-hover:text-primary text-2xl font-semibold tracking-tight text-white transition-colors">{article.title}</h2>
        <p className="max-w-2xl text-sm leading-7 text-white/64 sm:text-base">{article.description}</p>
      </div>
    </Link>
  )
}
