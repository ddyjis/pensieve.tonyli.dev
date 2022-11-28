import type { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect } from 'react'

import Backlinks from '../components/Backlinks'
import Frontmatter from '../components/Frontmatter'
import DocumentToken from '../components/Token'
import {
  type BacklinkDetails,
  type DocumentToken as DocumentTokenType,
  type Frontmatter as FrontmatterType,
  type NoteId,
  getBacklinkIds,
  getDocumentToken,
  getFilename,
  getFrontmatter,
  getLink,
  getNoteIds,
} from '../lib/cache'
import useHistory from '../lib/hooks/useHistory'

interface NotePageProps {
  noteId: NoteId
  frontmatter: FrontmatterType
  filename: string
  documentToken: DocumentTokenType
  backlinkDetails: BacklinkDetails
}

export default function NotePage({
  noteId,
  frontmatter,
  filename,
  documentToken,
  backlinkDetails,
}: NotePageProps) {
  const { addHistory } = useHistory()
  useEffect(() => {
    addHistory(noteId)
  })

  return (
    <div className="note__wrapper container">
      <div className="note">
        <Frontmatter frontmatter={frontmatter} filename={filename} />
        <div className="note__body">
          <DocumentToken token={documentToken} />
        </div>
        <Backlinks backlinkDetails={backlinkDetails} />
      </div>
    </div>
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

  const backlinkIds = await getBacklinkIds(noteId)
  const backlinkDetails: BacklinkDetails = {}
  for (let linkId of backlinkIds || []) {
    if (!backlinkDetails[linkId]) {
      const link = await getLink(linkId)
      if (!link) {
        continue
      }
      const originNoteFrontmatter = await getFrontmatter(link.from)
      if (!originNoteFrontmatter) {
        continue
      }
      backlinkDetails[linkId] = { ...link, noteTitle: originNoteFrontmatter.title }
    }
  }
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
