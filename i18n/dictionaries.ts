import 'server-only'

import type { Locale } from '@/i18n/config'

const dictionaries = {
  en: () => import('@/i18n/messages/en.json').then((module) => module.default),
  pt: () => import('@/i18n/messages/pt.json').then((module) => module.default),
  ja: () => import('@/i18n/messages/ja.json').then((module) => module.default)
} as const

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]()
}
