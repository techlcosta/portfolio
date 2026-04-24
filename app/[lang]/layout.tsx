import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'

import { hasLocale, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import '../globals.css'

type LangParams = Promise<{ lang: string }>

type LangLayoutProps = Readonly<{
  children: React.ReactNode
  params: LangParams
}>

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: Pick<LangLayoutProps, 'params'>): Promise<Metadata> {
  const { lang } = await params

  if (!hasLocale(lang)) {
    return {}
  }

  const dict = await getDictionary(lang)

  return {
    title: dict.meta.title,
    description: dict.meta.description
  }
}

export default async function RootLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params

  if (!hasLocale(lang)) {
    notFound()
  }

  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body>{children}</body>
    </html>
  )
}
