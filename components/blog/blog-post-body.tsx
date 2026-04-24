type BlogPostBodyProps = {
  children: React.ReactNode
}

export function BlogPostBody({ children }: BlogPostBodyProps) {
  return (
    <article className="max-w-none text-white/76 [&_a]:text-primary [&_a]:underline-offset-4 [&_a:hover]:underline [&_h1]:hidden [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-white [&_li]:my-2 [&_li]:leading-8 [&_p]:my-5 [&_p]:text-base [&_p]:leading-8 [&_strong]:text-white [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6">
      {children}
    </article>
  )
}
