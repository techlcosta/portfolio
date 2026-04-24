import type { SVGProps } from 'react'

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="4.25" y="4.25" width="15.5" height="15.5" rx="4.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.75" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.45" cy="6.55" r="1.2" fill="currentColor" />
    </svg>
  )
}
