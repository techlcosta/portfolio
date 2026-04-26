'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { Suspense, useEffect } from 'react'

type GoogleAnalyticsProps = {
  measurementId?: string
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function GoogleAnalyticsPageView({ measurementId }: Required<GoogleAnalyticsProps>) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!window.gtag) {
      return
    }

    const queryString = searchParams.toString()
    const pagePath = queryString ? `${pathname}?${queryString}` : pathname

    window.gtag('config', measurementId, {
      page_path: pagePath
    })
  }, [measurementId, pathname, searchParams])

  return null
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (!measurementId) {
    return null
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${JSON.stringify(measurementId)}, { send_page_view: false });
          `
        }}
      />
      <Suspense fallback={null}>
        <GoogleAnalyticsPageView measurementId={measurementId} />
      </Suspense>
    </>
  )
}
