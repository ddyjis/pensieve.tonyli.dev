import type { GetStaticPaths, GetStaticProps } from 'next'
import NextLink from 'next/link'

import {
  type Hashtag,
  type NoteIdToTitle,
  Frontmatter,
  getFrontmatter,
  getHashtagToNoteIds,
  getNoteIdsFromHashtag,
} from '../../../lib/firebase'

interface HashtagPageProps {
  hashtag: Hashtag
  noteIdToTitle: NoteIdToTitle
}

export default function HashtagPage({ hashtag, noteIdToTitle }: HashtagPageProps) {
  return (
    <div className="hashtag">
      <h1 className="tag__name">{`#${hashtag}`}</h1>
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
  const hashtagToNoteIds = (await getHashtagToNoteIds()) || {}
  const paths = Object.keys(hashtagToNoteIds).map((hashtag) => `/-/hashtag/${hashtag}`)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<HashtagPageProps> = async ({ params }) => {
  if (!params || !params.hashtag) {
    return {
      notFound: true,
    }
  }

  const { hashtag } = params
  const noteIds = await getNoteIdsFromHashtag(hashtag.toString())
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
      hashtag: hashtag.toString(),
      noteIdToTitle,
    },
    revalidate: 300, // 5 minutes
  }
}
