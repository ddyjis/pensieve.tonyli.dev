import { X } from 'lucide-react'
import NextLink from 'next/link'
import { useContext, useEffect, useState } from 'react'

import { type NoteId, getFrontmatter } from '../lib/cache'
import { PensieveContext } from './PensieveContext'

interface HistoryEntryProps {
  noteId: NoteId
}

export default function HistoryEntry({ noteId }: HistoryEntryProps) {
  const [title, setTitle] = useState<string | undefined>(undefined)
  const { removeHistory } = useContext(PensieveContext)

  useEffect(() => {
    const fetchData = async () => {
      const frontmatter = await getFrontmatter(noteId)
      if (frontmatter) {
        setTitle(frontmatter.title)
      }
    }
    fetchData()
  }, [noteId])

  if (!title) {
    return <></>
  }

  return (
    <div className="history__entry">
      <NextLink href={`/${noteId}`}>
        <div className="history__entry__title">{title}</div>
      </NextLink>
      <div className="history__entry__remove__button">
        <X
          onClick={(e) => {
            e.stopPropagation()
            removeHistory(noteId)
          }}
        />
      </div>
    </div>
  )
}
