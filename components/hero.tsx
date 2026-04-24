import type { Locale } from '@/i18n/config'

import { cn } from '@/lib/utils'
import { Profile } from './profile-image'
import { AnimatedShinyText } from './ui/animated-shiny-text'
import { AuroraText } from './ui/aurora-text'

type HeroProps = {
  locale: Locale
  greeting: string
  name: string
  role: string
  imageAlt: string
}

const COLORS = ['#fff3d6', '#f3c969', '#d98b5f', '#8fb8ff']
const GREETING_COLORS = ['#d8ffe7', '#8fe3b0', '#33c47a', '#0f7a4f']
const GREETING_FONT_CLASS: Record<Locale, string> = {
  en: 'font-script text-7xl',
  pt: 'font-script text-7xl',
  ja: 'font-rounded text-5xl'
}

export function Hero({ locale, greeting, name, role, imageAlt }: HeroProps) {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center md:px-10 md:py-14" aria-labelledby="hero-title">
      <div className="flex flex-col gap-4">
        <AuroraText colors={GREETING_COLORS} className={cn(GREETING_FONT_CLASS[locale], 'font-bold')}>
          {greeting}
        </AuroraText>
        <AuroraText colors={COLORS} className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
          {name}
        </AuroraText>

        <div className="space-y-3">
          <AnimatedShinyText className="text-primary text-xl">
            <span>{role}</span>
          </AnimatedShinyText>
        </div>
      </div>

      <div className="mt-10 md:mt-14">
        <Profile imageAlt={imageAlt} />
      </div>
    </section>
  )
}
