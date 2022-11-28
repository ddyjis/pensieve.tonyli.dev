import type { GetStaticProps } from 'next'
import NextLink from 'next/link'

import { getHashtagToNoteIds, HashtagToNoteIds } from '../../lib/cache'

interface HashtagsPageProps {
  hashtagToNoteIds: HashtagToNoteIds
}

export default function HashtagsPage({ hashtagToNoteIds }: HashtagsPageProps) {
  return (
    <>
      <h1>Hashtags</h1>
      <ul className="hashtags">
        {Object.entries(hashtagToNoteIds)
          .sort(([aHashtag, aNoteIds], [bHashtag, bNoteIds]) =>
            aNoteIds.length > bNoteIds.length
              ? -1
              : aNoteIds.length < bNoteIds.length
              ? 1
              : aHashtag > bHashtag
              ? 1
              : -1
          )
          .map(([hashtag, noteIds]) => {
            return (
              <li key={hashtag}>
                <NextLink
                  href={`/-/hashtags/${hashtag}`}
                >{`#${hashtag} (${noteIds.length})`}</NextLink>
              </li>
            )
          })}
      </ul>
    </>
  )
}

export const getStaticProps: GetStaticProps<HashtagsPageProps> = async () => {
  const hashtagToNoteIds = await getHashtagToNoteIds()
  if (!hashtagToNoteIds) {
    return { notFound: true }
  }
  return { props: { hashtagToNoteIds } }
}
