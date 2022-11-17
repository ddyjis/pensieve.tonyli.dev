import NextLink from "next/link";

import type { Frontmatter as FrontmatterType } from "../../utils/cache";

interface FrontmatterProps {
  frontmatter: FrontmatterType;
  filename?: string;
}

export default function Frontmatter({ frontmatter, filename }: FrontmatterProps) {
  return (
    <header className="note__header">
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
          <div className="note__tag" key={tag}>
            {tag}
          </div>
        ))}
      </div>
      {/* TODO: add baseurl for edit */}
      {filename && (
        <NextLink className="note__edit_link" href={`/${filename}.md`}>
          Edit
        </NextLink>
      )}
      <div className="note__create_time">{frontmatter.created}</div>
      <div className="note__update_time">{frontmatter.updated}</div>
    </header>
  );
}
