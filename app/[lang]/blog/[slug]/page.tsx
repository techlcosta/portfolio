import { notFound } from 'next/navigation'

import { BlogPageShell, getBlogHref } from '@/components/blog/blog-page-shell'
import { BlogPostBody } from '@/components/blog/blog-post-body'
import { Header } from '@/components/header'
import { hasLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getAllBlogStaticParams, getBlogPost } from '@/lib/blog'

type BlogPostPageProps = Readonly<{
  params: Promise<{ lang: string; slug: string }>
}>

export function generateStaticParams() {
  return getAllBlogStaticParams()
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = await params

  if (!hasLocale(lang)) {
    notFound()
  }

  const [dict, post] = await Promise.all([getDictionary(lang), getBlogPost(lang, slug)])

  if (!post) {
    notFound()
  }

  const { Content } = post

  return (
    <main className="min-h-screen bg-[#02040b] text-white">
      <Header currentLocale={lang} navigation={dict.header.navigation} social={dict.header.social} languages={dict.languages} />

      <BlogPageShell backHref={getBlogHref(lang)} backLabel={dict.blog.backToBlog} eyebrow={post.category} title={post.title} description={post.description}>
        <BlogPostBody>
          <Content />
        </BlogPostBody>
      </BlogPageShell>
    </main>
  )
}
