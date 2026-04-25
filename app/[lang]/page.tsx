import { notFound } from 'next/navigation'

import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { JsonLd } from '@/components/json-ld'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { hasLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { absoluteUrl, personId, siteName, siteUrl, socialProfiles, websiteId } from '@/lib/seo'

type LangPageProps = Readonly<{
  params: Promise<{ lang: string }>
}>

export default async function HomePage({ params }: LangPageProps) {
  const { lang } = await params

  if (!hasLocale(lang)) {
    notFound()
  }

  const dict = await getDictionary(lang)
  const pageUrl = absoluteUrl(`/${lang}`)
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: siteName,
        url: pageUrl,
        image: absoluteUrl('/my_profile.png'),
        jobTitle: dict.hero.role,
        sameAs: socialProfiles,
        knowsAbout: ['Full stack development', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'API development', 'Automation', 'Financial market tools']
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: siteName,
        url: siteUrl,
        inLanguage: lang,
        author: {
          '@id': personId
        }
      },
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl}#profile`,
        url: pageUrl,
        name: dict.meta.title,
        description: dict.meta.description,
        inLanguage: lang,
        mainEntity: {
          '@id': personId
        }
      }
    ]
  }

  return (
    <main className="flex min-h-screen flex-1 flex-col items-center justify-center bg-[#02040b] text-white">
      <JsonLd data={structuredData} />
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
