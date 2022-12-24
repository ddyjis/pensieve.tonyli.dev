import NextLink from 'next/link'
import Balancer from 'react-wrap-balancer'

import type { Frontmatter as FrontmatterType } from '../lib/firebase'

interface FrontmatterProps {
  frontmatter: FrontmatterType
  filename?: string
}

export default function Frontmatter({ frontmatter, filename }: FrontmatterProps) {
  return (
    <header className="note__header">
      <h1 className="note__title">
        <Balancer ratio={0.5}>{frontmatter.title}</Balancer>
      </h1>
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
