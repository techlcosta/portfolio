import Link from 'next/link'

import { BlogCard } from '@/components/blog/blog-card'
import type { Locale } from '@/i18n/config'
import type { BlogPost } from '@/lib/blog'

type LatestPostsProps = {
  content: {
    title: string
    headline: string
    description: string
    viewAll: string
  }
  locale: Locale
  posts: BlogPost[]
}

export function LatestPosts({ content, locale, posts }: LatestPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section id="latest-posts" className="scroll-mt-28 py-12 md:py-20" aria-labelledby="latest-posts-title">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl space-y-4">
          <p className="text-primary text-sm font-medium tracking-[0.22em] uppercase">{content.title}</p>
          <h2 id="latest-posts-title" className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {content.headline}
          </h2>
          <p className="text-base leading-8 text-white/72 sm:text-lg">{content.description}</p>
        </div>

        <Link
          href={`/${locale}/blog`}
          className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground inline-flex w-fit items-center justify-center rounded-full border px-4 py-2.5 text-sm font-medium transition-colors"
        >
          {content.viewAll}
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.slug} article={post} locale={locale} />
        ))}
      </div>
    </section>
  )
}
