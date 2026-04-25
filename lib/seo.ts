import { defaultLocale, locales, type Locale } from '@/i18n/config'

export const siteUrl = 'https://www.techlcosta.dev'
export const siteName = 'Leandro Costa'

export const ogImage = {
  url: '/og-image.png',
  width: 1731,
  height: 909,
  alt: 'Leandro Costa, Full Stack Web Developer'
}

export const openGraphLocales = {
  en: 'en_US',
  pt: 'pt_BR',
  ja: 'ja_JP'
} as const

export const socialProfiles = [
  'https://github.com/techlcosta',
  'https://www.linkedin.com/in/techlcosta',
  'https://x.com/leandrocosta88',
  'https://www.instagram.com/techleandrocosta/',
  'https://www.tiktok.com/@techleandrocosta'
]

export const personId = `${siteUrl}/#person`
export const websiteId = `${siteUrl}/#website`

export function absoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString()
}

export function languageAlternates(pathnameForLocale: (locale: Locale) => string) {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, pathnameForLocale(locale)])),
    'x-default': pathnameForLocale(defaultLocale)
  }
}
