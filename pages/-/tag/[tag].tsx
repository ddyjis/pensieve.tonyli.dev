import type { GetStaticPaths, GetStaticProps } from 'next'
import NextLink from 'next/link'

import {
  type NoteIdToTitle,
  type Tag,
  Frontmatter,
  getFrontmatter,
  getNoteIdsFromTag,
  getTagToNoteIds,
} from '../../../lib/firebase'

interface TagPageProps {
  tag: Tag
  noteIdToTitle: NoteIdToTitle
}

export default function TagPage({ tag, noteIdToTitle }: TagPageProps) {
  return (
    <div className="metadata-page">
      <h1 className="tag__name">{tag}</h1>
      <ul className="notes">
        {Object.entries(noteIdToTitle).map(([noteId, title]) => (
          <li key={noteId}>
            <NextLink href={`/${noteId}`}>{title}</NextLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tagToNoteIds = (await getTagToNoteIds()) || {}
  const paths = Object.keys(tagToNoteIds).map((tag) => `/-/tag/${tag}`)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<TagPageProps> = async ({ params }) => {
  if (!params || !params.tag) {
    return {
      notFound: true,
    }
  }

  const { tag } = params
  const noteIds = await getNoteIdsFromTag(tag.toString())
  if (!noteIds) {
    return {
      notFound: true,
    }
  }

  const noteIdFrontmatterPairs = await Promise.all(
    noteIds.map(async (noteId) => [noteId, await getFrontmatter(noteId)])
  )
  const noteIdToTitle = noteIdFrontmatterPairs
    .filter(([_, frontmatter]) => Boolean(frontmatter))
    .reduce((map, [noteId, frontmatter]) => {
      if (!noteId || !frontmatter) {
        return map
      }
      map[noteId.toString()] = (frontmatter as Frontmatter).title
      return map
    }, {} as NoteIdToTitle)
  return {
    props: {
      tag: tag.toString(),
      noteIdToTitle,
    },
    revalidate: 300, // 5 minutes
  }
}
