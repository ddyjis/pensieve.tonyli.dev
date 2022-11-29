import { useContext } from 'react'

import HistoryEntry from './HistoryEntry'
import { PensieveContext } from './PensieveContext'

export default function History() {
  const { history } = useContext(PensieveContext)
  return (
    <div className="history">
      {history.map((noteId) => (
        <HistoryEntry noteId={noteId} key={noteId} />
      ))}
    </div>
  )
}
