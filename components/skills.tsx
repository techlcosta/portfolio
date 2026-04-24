import { readdirSync } from 'node:fs'
import path from 'node:path'

import { IconCloud } from '@/components/ui/icon-cloud'

const skillsDirectory = path.join(process.cwd(), 'public/icons/skills')

const skillImages = readdirSync(skillsDirectory)
  .filter((file) => file.endsWith('.svg'))
  .sort((firstFile, secondFile) => firstFile.localeCompare(secondFile))
  .map((file) => `/icons/skills/${file}`)

type SkillsProps = {
  content: {
    title: string
    headline: string
    description: string
    highlights: string[]
  }
}

export function Skills({ content }: SkillsProps) {
  return (
    <section
      id="skills"
      className="grid scroll-mt-28 items-center gap-10 py-12 md:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] md:py-20"
      aria-labelledby="skills-title"
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-primary text-sm font-medium tracking-[0.22em] uppercase">{content.title}</p>
          <h2 id="skills-title" className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {content.headline}
          </h2>
        </div>

        <p className="text-base leading-8 text-white/72 sm:text-lg">{content.description}</p>

        <ul className="grid gap-3 text-sm text-white/78 sm:text-base">
          {content.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3">
              <span className="bg-primary mt-2 h-2 w-2 rounded-full" aria-hidden="true" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto w-full max-w-xl">
        <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(39,223,183,0.18),transparent_68%)] blur-3xl" aria-hidden="true" />
        <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/3 p-4 shadow-[0_30px_80px_-36px_rgba(39,223,183,0.35)]">
          <div className="relative aspect-square w-full">
            <div className="absolute top-1/2 left-1/2 w-[140%] max-w-none -translate-x-1/2 -translate-y-1/2">
              <IconCloud images={skillImages} size={620} sphereRadius={205} iconSize={44} className="mx-auto h-auto w-full max-w-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
