import Link from 'next/link'

import type { Locale } from '@/i18n/config'

type BlogPageShellProps = {
  backHref: string
  backLabel: string
  children: React.ReactNode
  description: string
  eyebrow: string
  title: string
}

export function BlogPageShell({ backHref, backLabel, children, description, eyebrow, title }: BlogPageShellProps) {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col px-4 pt-28 pb-20 sm:px-6 md:px-8 md:pt-36">
      <div className="mb-10 space-y-5 border-b border-white/10 pb-10">
        <Link href={backHref} className="text-primary text-sm font-medium tracking-[0.18em] uppercase transition-colors hover:text-white">
          {backLabel}
        </Link>

        <div className="space-y-4">
          <p className="text-sm text-white/50">{eyebrow}</p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{title}</h1>
          <p className="max-w-2xl text-base leading-8 text-white/68 sm:text-lg">{description}</p>
        </div>
      </div>

      {children}
    </section>
  )
}

export function getPortfolioHref(locale: Locale) {
  return `/${locale}`
}

export function getBlogHref(locale: Locale) {
  return `/${locale}/blog`
}
