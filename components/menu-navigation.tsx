'use client'

import { Locale } from '@/i18n/config'
import { cn } from '@/lib/utils'
import { BrainCogIcon, Code2Icon, HomeIcon, RssIcon } from 'lucide-react'
import Link from 'next/link'
import { ComponentType, SVGProps, useEffect, useState } from 'react'
import { GitHubIcon } from '../public/icons/social/github-icon'
import { InstagramIcon } from '../public/icons/social/instagram-icon'
import { LinkedinIcon } from '../public/icons/social/linkedin-icon'
import { TikTokIcon } from '../public/icons/social/tiktok-icon'
import { XIcon } from '../public/icons/social/x-icon'
import { LocaleToggle } from './locale-toggle'
import { Button } from './ui/button'
import { Dock, DockIcon } from './ui/dock'
import { Separator } from './ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

type MenuIcon = ComponentType<SVGProps<SVGSVGElement>>

const COMPACT_NAVIGATION_QUERY = '(max-width: 639px)'
const NAVIGATION_BUTTON_CLASSNAME = 'size-7 rounded-full sm:size-12'
const NAVIGATION_ICON_CLASSNAME = 'size-3.5 sm:size-5'
const SOCIAL_ICON_CLASSNAME = 'size-4 sm:size-6'

interface NavigationProps {
  label: string
  path: string
  icon: MenuIcon
  iconClassName?: string
}

interface ScrollNavigationProps {
  label: string
  targetId: string
  icon: MenuIcon
  iconClassName?: string
}

interface MenuNavigationLabels {
  home: string
  blog: string
  projects: string
  skills: string
  github: string
  linkedin: string
  tiktok: string
  x: string
  locale: string
}

interface MenuNavigationProps {
  currentLocale: Locale
  labels: MenuNavigationLabels
  localeNames: Record<Locale, string>
}

function useCompactNavigation() {
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(COMPACT_NAVIGATION_QUERY)
    const updateNavigationSize = () => setIsCompact(mediaQuery.matches)

    updateNavigationSize()
    mediaQuery.addEventListener('change', updateNavigationSize)

    return () => mediaQuery.removeEventListener('change', updateNavigationSize)
  }, [])

  return isCompact
}

function RouteNavigation({ label, path, icon: Icon, iconClassName }: NavigationProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button asChild variant="ghost" size="icon" className={NAVIGATION_BUTTON_CLASSNAME}>
          <Link href={path} aria-label={label}>
            <Icon className={cn(NAVIGATION_ICON_CLASSNAME, iconClassName)} />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  )
}

function ExternalNavigation({ label, path, icon: Icon, iconClassName }: NavigationProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button asChild variant="ghost" size="icon" className={NAVIGATION_BUTTON_CLASSNAME}>
          <a href={path} aria-label={label} target="_blank" rel="noreferrer">
            <Icon className={cn(NAVIGATION_ICON_CLASSNAME, iconClassName)} />
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  )
}

function ScrollNavigation({ label, targetId, icon: Icon, iconClassName }: ScrollNavigationProps) {
  const handleScrollNavigation = () => {
    const targetSection = document.getElementById(targetId)

    if (!targetSection) return

    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          aria-label={label}
          onClick={handleScrollNavigation}
          variant="ghost"
          size="icon"
          className={cn(NAVIGATION_BUTTON_CLASSNAME, 'cursor-pointer')}
        >
          <Icon className={cn(NAVIGATION_ICON_CLASSNAME, iconClassName)} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export function MenuNavigation({ currentLocale, labels, localeNames }: MenuNavigationProps) {
  const isCompact = useCompactNavigation()

  return (
    <TooltipProvider>
      <Dock
        direction="middle"
        iconSize={isCompact ? 28 : 40}
        iconMagnification={isCompact ? 28 : 60}
        iconDistance={isCompact ? 80 : 140}
        disableMagnification={isCompact}
        className="mt-3 h-10 gap-0.5 rounded-xl p-1 sm:mt-8 sm:h-14.5 sm:gap-2 sm:rounded-2xl sm:p-2"
      >
        <DockIcon>
          <RouteNavigation path={`/${currentLocale}`} label={labels.home} icon={HomeIcon} />
        </DockIcon>

        <DockIcon>
          <ScrollNavigation label={labels.skills} targetId="skills" icon={BrainCogIcon} />
        </DockIcon>

        <DockIcon>
          <ScrollNavigation label={labels.projects} targetId="projects" icon={Code2Icon} />
        </DockIcon>

        <DockIcon>
          <RouteNavigation path={`/${currentLocale}/blog`} label={labels.blog} icon={RssIcon} />
        </DockIcon>

        <Separator orientation="vertical" className="h-6 sm:h-full" />

        <DockIcon>
          <ExternalNavigation path="https://x.com/leandrocosta88" label={labels.x} icon={XIcon} iconClassName={SOCIAL_ICON_CLASSNAME} />
        </DockIcon>

        <DockIcon>
          <ExternalNavigation path="https://www.tiktok.com/@techleandrocosta" label={labels.tiktok} icon={TikTokIcon} iconClassName={SOCIAL_ICON_CLASSNAME} />
        </DockIcon>

        <DockIcon>
          <ExternalNavigation
            path="https://www.instagram.com/techleandrocosta/"
            label={labels.linkedin}
            icon={InstagramIcon}
            iconClassName={SOCIAL_ICON_CLASSNAME}
          />
        </DockIcon>

        <DockIcon>
          <ExternalNavigation path="https://github.com/techlcosta" label={labels.github} icon={GitHubIcon} iconClassName={SOCIAL_ICON_CLASSNAME} />
        </DockIcon>

        <DockIcon>
          <ExternalNavigation path="https://www.linkedin.com/in/techlcosta" label={labels.linkedin} icon={LinkedinIcon} iconClassName={SOCIAL_ICON_CLASSNAME} />
        </DockIcon>

        <Separator orientation="vertical" className="h-6 sm:h-full" />

        <DockIcon>
          <LocaleToggle
            currentLocale={currentLocale}
            label={labels.locale}
            names={localeNames}
            triggerClassName={NAVIGATION_BUTTON_CLASSNAME}
            iconClassName={NAVIGATION_ICON_CLASSNAME}
          />
        </DockIcon>
      </Dock>
    </TooltipProvider>
  )
}
