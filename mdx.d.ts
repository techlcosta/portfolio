declare module '*.mdx' {
  import type { ComponentType } from 'react'

  export const article: {
    title: string
    description: string
    category: string
    publishedAt: string
    readTime: string
  }

  const MDXContent: ComponentType
  export default MDXContent
}
