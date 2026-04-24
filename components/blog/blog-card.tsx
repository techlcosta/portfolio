import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import type { BlogPost } from '@/lib/blog'

type BlogCardProps = {
  article: BlogPost
  locale: Locale
}

export function BlogCard({ article, locale }: BlogCardProps) {
  return (
    <Link
      href={`/${locale}/blog/${article.slug}`}
      className="group rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-primary/40 hover:bg-white/[0.06] sm:p-8"
    >
      <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-medium tracking-[0.18em] text-white/46 uppercase">
        <span>{article.category}</span>
        <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden="true" />
        <span>{article.readTime}</span>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-primary">{article.title}</h2>
        <p className="max-w-2xl text-sm leading-7 text-white/64 sm:text-base">{article.description}</p>
      </div>
    </Link>
  )
}
