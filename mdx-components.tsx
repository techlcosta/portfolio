import type { ComponentProps } from 'react'
import type { MDXComponents } from 'mdx/types'

function Anchor({ href, ...props }: ComponentProps<'a'>) {
  const isExternalLink = typeof href === 'string' && /^https?:\/\//.test(href)

  return <a href={href} target={isExternalLink ? '_blank' : undefined} rel={isExternalLink ? 'noopener noreferrer' : undefined} {...props} />
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: Anchor,
    ...components
  }
}
