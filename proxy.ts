import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'pt', 'ja'] as const
const defaultLocale = 'en'

type Locale = (typeof locales)[number]

function hasLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

function normalizeLocale(locale: string): Locale | null {
  const normalized = locale.toLowerCase()
  const base = normalized.split('-')[0]

  if (base === 'jp') {
    return 'ja'
  }

  return hasLocale(base) ? base : null
}

function getPreferredLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language')

  if (!acceptLanguage) {
    return defaultLocale
  }

  const candidates = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, quality] = part.trim().split(';q=')

      return {
        tag,
        quality: quality ? Number(quality) : 1
      }
    })
    .sort((left, right) => right.quality - left.quality)

  for (const candidate of candidates) {
    const locale = normalizeLocale(candidate.tag)

    if (locale) {
      return locale
    }
  }

  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/jp' || pathname.startsWith('/jp/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(/^\/jp(?=\/|$)/, '/ja')
    return NextResponse.redirect(url)
  }

  const pathnameHasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  const locale = getPreferredLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`

  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
}
