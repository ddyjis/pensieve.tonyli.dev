import Backlinks from '../components/Backlinks'
import Frontmatter from '../components/Frontmatter'
import DocumentToken from '../components/Token'
import {
  BacklinkDetails,
  DocumentToken as DocumentTokenType,
  Frontmatter as FrontmatterType,
} from '../lib/firebase'

export interface NoteProps {
  frontmatter: FrontmatterType
  filename: string
  documentToken: DocumentTokenType
  backlinkDetails: BacklinkDetails
}

export default function Note({ frontmatter, filename, documentToken, backlinkDetails }: NoteProps) {
  return (
    <div className="note__wrapper">
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
