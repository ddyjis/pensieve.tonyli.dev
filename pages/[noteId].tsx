import type { GetStaticPaths, GetStaticProps } from 'next'
import { useContext, useEffect } from 'react'

import Note from '../components/Note'
import { PensieveContext } from '../components/PensieveContext'
import {
  type BacklinkDetails,
  type DocumentToken,
  type Frontmatter,
  type NoteId,
  getBacklinkDetails,
  getDocumentToken,
  getFilename,
  getFrontmatter,
  getNoteIds,
} from '../lib/firebase'

interface NotePageProps {
  noteId: NoteId
  frontmatter: Frontmatter
  filename: string
  documentToken: DocumentToken
  backlinkDetails: BacklinkDetails
}

export default function NotePage({
  noteId,
  frontmatter,
  filename,
  documentToken,
  backlinkDetails,
}: NotePageProps) {
  const { addHistory } = useContext(PensieveContext)
  useEffect(() => {
    if (noteId) {
      addHistory({ noteId, title: frontmatter.title, timestamp: Date.now() })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId, frontmatter.title])

  return (
    <Note
      frontmatter={frontmatter}
      filename={filename}
      documentToken={documentToken}
      backlinkDetails={backlinkDetails}
    />
  )
}

export const getStaticProps: GetStaticProps<NotePageProps, { noteId: string }> = async ({
  params,
}) => {
  const noteId = params?.noteId
  if (!noteId) {
    return { notFound: true }
  }
  const frontmatter = await getFrontmatter(noteId)
  const documentToken = await getDocumentToken(noteId)
  const filename = await getFilename(noteId)

  if (!frontmatter || !documentToken || !filename) {
    return { notFound: true }
  }

  const backlinkDetails = await getBacklinkDetails(noteId)
  return {
    props: {
      noteId,
      frontmatter,
      documentToken,
      filename,
      backlinkDetails,
    },
    revalidate: 300, // 5 minutes
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const noteIds = (await getNoteIds()) || []
  return {
    paths: noteIds.map((noteId) => ({ params: { noteId } })),
    fallback: 'blocking',
  }
}
