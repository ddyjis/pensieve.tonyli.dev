import useHistory from '../lib/hooks/useHistory'
import HistoryEntry from './HistoryEntry'

export default function History() {
  const { history } = useHistory()
  return (
    <div className="history">
      <h1 className="history__title">History</h1>
      {history.map((noteId) => (
        <HistoryEntry noteId={noteId} key={noteId} />
      ))}
    </div>
  )
}
