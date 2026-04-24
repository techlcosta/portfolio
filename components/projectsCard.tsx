import { ExternalLinkIcon } from 'lucide-react'
import Image from 'next/image'

export interface ProjectCardProps {
  title: string
  stack: string[]
  description: string
  preview: string
  status?: string
  actionTitle?: string
  action?: string
}

export function ProjectCard({ action, actionTitle = 'Abrir projeto', description, preview, stack, title }: ProjectCardProps) {
  return (
    <article className="group hover:border-primary/40 relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/3 px-3 py-6 transition-colors hover:bg-white/6 xl:min-h-112">
      <div className="bg-primary/12 absolute -top-16 -right-16 h-36 w-36 rounded-full blur-3xl transition-opacity group-hover:opacity-80" aria-hidden="true" />

      <div className="relative flex h-full flex-col gap-6">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
          <p className="text-sm leading-7 text-white/64">{description}</p>
        </div>

        <div className="relative grid min-h-40 place-items-center overflow-hidden rounded-3xl border border-white/10 bg-white/6 sm:min-h-52">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(39,223,183,0.14),transparent_62%)]" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 hidden flex-wrap gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:flex">
            {stack.map((tech) => (
              <span key={tech} className="rounded-full border border-white/10 bg-[#02040b]/82 px-3 py-1 text-xs text-white/78 backdrop-blur-sm">
                {tech}
              </span>
            ))}
          </div>
          <Image src={preview} alt={`Preview do projeto ${title}`} width={420} height={260} className="relative max-h-56 w-full object-contain" />
        </div>

        <div className="mt-auto space-y-4">
          <ul className="flex flex-wrap gap-2 sm:hidden">
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
