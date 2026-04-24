export const locales = ['en', 'pt', 'ja'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  pt: 'PT',
  ja: 'JP'
}

export function hasLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export function normalizeLocale(locale: string): Locale | null {
  const normalized = locale.toLowerCase()
  const base = normalized.split('-')[0]

  if (base === 'jp') {
    return 'ja'
  }

  return hasLocale(base) ? base : null
}
