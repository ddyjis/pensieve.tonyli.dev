import { X } from 'lucide-react'
import NextLink from 'next/link'
import { useContext } from 'react'

import type { NoteId } from '../lib/firebase'
import { PensieveContext } from './PensieveContext'

export interface HistoryEntryProps {
  noteId: NoteId
  title: string
}

export default function HistoryEntry(entry: HistoryEntryProps) {
  const { noteId, title } = entry
  const { removeHistory } = useContext(PensieveContext)

  return (
    <div className="history__entry">
      <NextLink href={`/${noteId}`}>
        <div className="history__entry__title">{title}</div>
      </NextLink>
      <div className="history__entry__remove__button">
        <X
          onClick={(e) => {
            e.stopPropagation()
            removeHistory(entry)
          }}
        />
      </div>
    </div>
  )
}
