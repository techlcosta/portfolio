import { notFound } from 'next/navigation'

import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { hasLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

type LangPageProps = Readonly<{
  params: Promise<{ lang: string }>
}>

export default async function HomePage({ params }: LangPageProps) {
  const { lang } = await params

  if (!hasLocale(lang)) {
    notFound()
  }

  const dict = await getDictionary(lang)

  return (
    <main className="flex min-h-screen flex-1 flex-col items-center justify-center bg-[#02040b] text-white">
      <Header currentLocale={lang} navigation={dict.header.navigation} social={dict.header.social} languages={dict.languages} />
      <section
        className="flex min-h-screen w-full max-w-6xl flex-col px-4 pt-24 sm:px-6 sm:pt-28 md:px-8 md:pt-32"
        itemScope
        itemType="https://schema.org/Person"
      >
        <Hero locale={lang} greeting={dict.hero.greeting} name={dict.hero.name} role={dict.hero.role} imageAlt={dict.hero.imageAlt} />
        <Skills content={dict.skills} />
        <Projects content={dict.projects} />
      </section>
    </main>
  )
}
