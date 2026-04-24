import type { Locale } from '@/i18n/config'
import { MenuNavigation } from './menu-navigation'

interface HeaderProps {
  currentLocale: Locale
  navigation: {
    home: string
    blog: string
    projects: string
    skills: string
    portfolio: string
    about: string
    contact: string
  }
  social: {
    github: string
    instagram: string
    twitter: string
    linkedin: string
    tiktok: string
    x: string
  }
  languages: {
    label: string
    available: Record<Locale, string>
  }
}

export function Header({ currentLocale, navigation, social, languages }: HeaderProps) {
  const menuLabels = {
    home: navigation.home,
    blog: navigation.blog,
    projects: navigation.projects,
    skills: navigation.skills,
    github: social.github,
    linkedin: social.linkedin,
    tiktok: social.tiktok,
    x: social.x,
    locale: languages.label
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-2 sm:px-6 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <MenuNavigation currentLocale={currentLocale} labels={menuLabels} localeNames={languages.available} />
      </div>
    </header>
  )
}
