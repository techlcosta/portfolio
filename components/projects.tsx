import { ProjectCard } from './projectsCard'

type Project = {
  title: string
  description: string
  preview: string
  actionTitle?: string
  action?: string
  stack: string[]
}

type ProjectsProps = {
  content: {
    title: string
    headline: string
    description: string
    readMore: string
    readLess: string
    items: Project[]
  }
}

export function Projects({ content }: ProjectsProps) {
  return (
    <section id="projects" className="scroll-mt-28 py-12 md:py-20" aria-labelledby="projects-title">
      <div className="mb-10 max-w-3xl space-y-4">
        <p className="text-primary text-sm font-medium tracking-[0.22em] uppercase">{content.title}</p>
        <h2 id="projects-title" className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {content.headline}
        </h2>
        <p className="text-base leading-8 text-white/72 sm:text-lg">{content.description}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {content.items.map((project) => (
          <ProjectCard
            key={project.title}
            action={project.action}
            actionTitle={project.actionTitle}
            description={project.description}
            preview={project.preview}
            readLessLabel={content.readLess}
            readMoreLabel={content.readMore}
            stack={project.stack}
            title={project.title}
          />
        ))}
      </div>
    </section>
  )
}
