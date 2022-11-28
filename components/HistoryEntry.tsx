import { useEffect, useState } from 'react'

import { type NoteId, getFrontmatter } from '../lib/cache'

interface HistoryEntryProps {
  noteId: NoteId
}

export default function HistoryEntry({ noteId }: HistoryEntryProps) {
  const [title, setTitle] = useState<string | undefined>(undefined)

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
      <h1 className="history__entry__title">{title}</h1>
    </div>
  )
}
