import { type GetServerSideProps } from 'next'

import Hero from '../components/Hero'
import Note, { type NoteProps } from '../components/Note'
import {
  type NoteId,
  getBacklinkDetails,
  getDocumentToken,
  getFilename,
  getFrontmatter,
  getNoteIds,
} from '../lib/firebase'
import { getSample } from '../lib/random'

type IndexPageProps = (Partial<NoteProps> & { noteId: null }) | (NoteProps & { noteId: NoteId })

export default function IndexPage({
  frontmatter,
  filename,
  documentToken,
  backlinkDetails,
  noteId,
}: IndexPageProps) {
  if (!noteId) {
    return <Hero />
  }
  return (
    <Note
      frontmatter={frontmatter}
      filename={filename}
      documentToken={documentToken}
      backlinkDetails={backlinkDetails}
    />
  )
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const noteIds = (await getNoteIds()) || []
  if (!noteIds.length) {
    return { props: { noteId: null } }
  }

  const noteId = getSample(noteIds)
  const frontmatter = await getFrontmatter(noteId)
  const documentToken = await getDocumentToken(noteId)
  const filename = await getFilename(noteId)

  if (!frontmatter || !documentToken || !filename) {
    return { props: { noteId: null } }
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
  }
}
