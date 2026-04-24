'use client'

import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { startTransition } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import type { Locale } from '@/i18n/config'
import { hasLocale, localeLabels, locales } from '@/i18n/config'
import { cn } from '@/lib/utils'
import { Globe } from 'lucide-react'

type LocaleToggleProps = {
  currentLocale: Locale
  label: string
  names: Record<Locale, string>
  className?: string
  triggerClassName?: string
  iconClassName?: string
}

const localeIcons: Record<Locale, string> = {
  en: '/icons/languages/unitedStates.svg',
  pt: '/icons/languages/brazil.svg',
  ja: '/icons/languages/japan.svg'
}

function getLocalizedPathname(pathname: string, locale: Locale) {
  const segments = pathname.split('/')

  if (segments[1] && hasLocale(segments[1])) {
    segments[1] = locale
  } else {
    segments.splice(1, 0, locale)
  }

  return segments.join('/') || `/${locale}`
}

export function LocaleToggle({ currentLocale, label, names, className, triggerClassName, iconClassName }: LocaleToggleProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  function switchLocale(locale: Locale) {
    if (locale === currentLocale) {
      return
    }

    const nextPathname = getLocalizedPathname(pathname, locale)
    const query = searchParams.toString()
    const href = query ? `${nextPathname}?${query}` : nextPathname

    startTransition(() => {
      router.replace(href, { scroll: false })
    })
  }

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className={cn('size-12 cursor-pointer rounded-full', triggerClassName)} aria-label={label}>
            <Globe className={cn('size-4', iconClassName)} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-44 rounded-2xl border-white/10 bg-[#0b0f18]/96 p-2 text-white shadow-[0_20px_60px_-24px_rgba(0,0,0,0.75)] backdrop-blur-xl"
        >
          <DropdownMenuLabel className="px-2 pb-2 text-[11px] font-semibold tracking-[0.22em] text-white/55 uppercase">{label}</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={currentLocale}
            onValueChange={(value) => {
              if (hasLocale(value)) {
                switchLocale(value)
              }
            }}
          >
            {locales.map((locale) => (
              <DropdownMenuRadioItem key={locale} value={locale} className="rounded-md" aria-label={names[locale]}>
                <div className="flex items-center gap-3">
                  <Image src={localeIcons[locale]} alt="" width={18} height={18} className="size-4.5" aria-hidden="true" />
                  <span className="font-semibold tracking-[0.2em] uppercase">{localeLabels[locale]}</span>
                </div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
