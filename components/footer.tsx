import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import { GitHubIcon } from '../public/icons/social/github-icon'
import { InstagramIcon } from '../public/icons/social/instagram-icon'
import { LinkedinIcon } from '../public/icons/social/linkedin-icon'
import { TikTokIcon } from '../public/icons/social/tiktok-icon'
import { XIcon } from '../public/icons/social/x-icon'

type FooterProps = {
  currentLocale: Locale
  navigation: {
    home: string
    blog: string
    projects: string
    skills: string
  }
  social: {
    github: string
    instagram: string
    linkedin: string
    tiktok: string
    x: string
  }
  tagline: string
}

const currentYear = new Date().getFullYear()

export function Footer({ currentLocale, navigation, social, tagline }: FooterProps) {
  const internalLinks = [
    { href: `/${currentLocale}`, label: navigation.home },
    { href: `/${currentLocale}#skills`, label: navigation.skills },
    { href: `/${currentLocale}#projects`, label: navigation.projects },
    { href: `/${currentLocale}/blog`, label: navigation.blog }
  ]
  const socialLinks = [
    { href: 'https://github.com/techlcosta', label: social.github, icon: GitHubIcon },
    { href: 'https://www.linkedin.com/in/techlcosta', label: social.linkedin, icon: LinkedinIcon },
    { href: 'https://x.com/leandrocosta88', label: social.x, icon: XIcon },
    { href: 'https://www.instagram.com/techleandrocosta/', label: social.instagram, icon: InstagramIcon },
    { href: 'https://www.tiktok.com/@techleandrocosta', label: social.tiktok, icon: TikTokIcon }
  ]

  return (
    <footer className="w-full border-t border-white/10 bg-[#02040b] px-4 py-10 sm:px-6 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md space-y-3">
          <p className="text-lg font-semibold tracking-tight text-white">Leandro Costa</p>
          <p className="text-sm leading-7 text-white/58">{tagline}</p>
          <p className="text-xs text-white/38">&copy; {currentYear} Leandro Costa</p>
        </div>

        <div className="flex flex-col gap-5 md:items-end">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/64">
            {internalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap gap-2">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hover:border-primary/50 hover:text-primary inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-white/62 transition-colors"
              >
                <Icon className="size-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
