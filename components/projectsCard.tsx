import { ExternalLinkIcon } from 'lucide-react'
import Image from 'next/image'

import { cn } from '@/lib/utils'

export interface ProjectCardProps {
  title: string
  stack: string[]
  description: string
  preview: string
  actionTitle?: string
  action?: string
  readMoreLabel: string
  readLessLabel: string
}

const DESCRIPTION_EXPAND_THRESHOLD = 145

export function ProjectCard({ action, actionTitle = 'Abrir projeto', description, preview, readLessLabel, readMoreLabel, stack, title }: ProjectCardProps) {
  const canExpandDescription = description.length > DESCRIPTION_EXPAND_THRESHOLD
  const normalizedTitle = title
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  const descriptionToggleId = `project-description-${normalizedTitle || 'toggle'}`

  return (
    <article className="group hover:border-primary/40 relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/3 px-3 py-5 transition-colors hover:bg-white/6 sm:px-4">
      <div
        className={cn(
          'relative grid h-full gap-4 transition-[grid-template-rows] duration-300 ease-out',
          'grid-rows-[3.25rem_8rem_auto_8.75rem_1fr] has-[input:checked]:grid-rows-[3.25rem_11.5rem_auto_8.75rem_1fr]',
          'sm:grid-rows-[3.5rem_8.75rem_auto_4rem_1fr] sm:has-[input:checked]:grid-rows-[3.5rem_13rem_auto_4rem_1fr]'
        )}
      >
        <div className="flex min-h-0 items-end">
          <h3 className="line-clamp-2 text-xl leading-tight font-semibold tracking-tight text-white">{title}</h3>
        </div>

        <div className="relative min-h-0 overflow-hidden">
          {canExpandDescription ? (
            <>
              <input id={descriptionToggleId} type="checkbox" className="peer sr-only" aria-controls={`${descriptionToggleId}-text`} />
              <p id={`${descriptionToggleId}-text`} className="line-clamp-3 text-sm leading-7 text-white/64 transition-all duration-300 peer-checked:line-clamp-none">
                {description}
              </p>
              <label
                htmlFor={descriptionToggleId}
                className="text-primary hover:text-primary/80 peer-focus-visible:ring-primary mt-2 inline-flex cursor-pointer items-center rounded-sm text-sm font-medium transition-colors peer-checked:hidden peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#02040b]"
              >
                {readMoreLabel}
              </label>
              <label
                htmlFor={descriptionToggleId}
                className="text-primary hover:text-primary/80 peer-focus-visible:ring-primary mt-2 hidden cursor-pointer items-center rounded-sm text-sm font-medium transition-colors peer-checked:inline-flex peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#02040b]"
              >
                {readLessLabel}
              </label>
            </>
          ) : (
            <p className="text-sm leading-7 text-white/64 transition-all duration-300">{description}</p>
          )}
        </div>

        <div className="relative min-h-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(39,223,183,0.14),transparent_62%)]" aria-hidden="true" />
          <div className="relative aspect-video max-h-full w-full overflow-hidden rounded-2xl">
            <Image
              src={preview}
              alt={`Preview do projeto ${title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="aspect-video object-cover"
            />
            <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 hidden max-h-[42%] flex-wrap gap-2 overflow-hidden opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:flex">
              {stack.map((tech) => (
                <span key={tech} className="rounded-full border border-white/10 bg-[#02040b]/82 px-3 py-1 text-xs text-white/78 backdrop-blur-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="min-h-0 space-y-3">
          <ul className="flex h-16 flex-wrap gap-2 overflow-hidden sm:hidden">
            {stack.map((tech) => (
              <li key={tech} className="rounded-full bg-white/6 px-3 py-1 text-xs text-white/68">
                {tech}
              </li>
            ))}
          </ul>

          {action ? (
            <a
              href={action}
              target="_blank"
              rel="noreferrer"
              className="bg-primary text-primary-foreground hover:bg-primary/80 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors sm:w-fit"
            >
              {actionTitle}
              <ExternalLinkIcon className="size-4" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}
