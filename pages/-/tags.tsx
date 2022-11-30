import type { GetStaticProps } from 'next'
import NextLink from 'next/link'

import { getTagToNoteIds, TagToNoteIds } from '../../lib/firebase'

interface TagsPageProps {
  tagToNoteIds: TagToNoteIds
}

export default function TagsPage({ tagToNoteIds }: TagsPageProps) {
  return (
    <ul className="tags">
      {Object.entries(tagToNoteIds)
        .sort(([aTag, aNoteIds], [bTag, bNoteIds]) =>
          aNoteIds.length > bNoteIds.length
            ? -1
            : aNoteIds.length < bNoteIds.length
            ? 1
            : aTag > bTag
            ? 1
            : -1
        )
        .map(([tag, noteIds]) => {
          return (
            <li key={tag}>
              <NextLink href={`/-/tag/${tag}`}>{`${tag} (${noteIds.length})`}</NextLink>
            </li>
          )
        })}
    </ul>
  )
}

export const getStaticProps: GetStaticProps<TagsPageProps> = async () => {
  const tagToNoteIds = await getTagToNoteIds()
  if (!tagToNoteIds) {
    console.error('Tag not found')
    return { notFound: true }
  }
  return { props: { tagToNoteIds } }
}
