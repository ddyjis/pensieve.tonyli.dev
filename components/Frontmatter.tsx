import NextLink from 'next/link'

import type { Frontmatter as FrontmatterType } from '../lib/firebase'

interface FrontmatterProps {
  frontmatter: FrontmatterType
  filename?: string
}

export default function Frontmatter({ frontmatter, filename }: FrontmatterProps) {
  return (
    <header className="note__header">
      {/* TODO: Currently the balancer is making the page to jump occasionally after scrolling.
       *  Upgrade react-wrap-balancer to see if it could be fixed (current version: v0.2.3) */}
      <h1 className="note__title">{frontmatter.title}</h1>
      <div className="note__aliases">
        {frontmatter.aliases?.map((alias) => (
          <div className="note__alias" key={alias}>
            {alias}
          </div>
        ))}
      </div>
      <div className="note__tags">
        {frontmatter.tags?.map((tag) => (
          <NextLink href={`/-/tag/${tag}`} className="note__tag" key={tag}>
            #{tag}
          </NextLink>
        ))}
      </div>
      <div className="note__metadata">
        <div className="note__create_time">{frontmatter.created}</div>
        {filename && (
          <NextLink
            className="note__edit_link"
            href={`${process.env.NEXT_PUBLIC_CONTENT_EDIT_BASE_URL}${filename}.md`}
            target="_blank"
          >
            Edit
          </NextLink>
        )}
        <div className="note__update_time">{frontmatter.updated}</div>
      </div>
    </header>
  )
}
