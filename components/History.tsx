import { Fragment, useContext } from 'react'

import { type ReadableTimeDiff, timeSince } from '../lib/time'
import HistoryEntry, { type HistoryEntryProps } from './HistoryEntry'
import { PensieveContext } from './PensieveContext'

export default function History() {
  const { history } = useContext(PensieveContext)
  const groupedHistory = history.reduce(
    (grouped, current) => {
      grouped[timeSince(current.timestamp)].push(current)
      return grouped
    },
    {
      Today: [],
      Yesterday: [],
      'This Week': [],
      'Last Week': [],
      'Last 30 days': [],
      Older: [],
    } as Record<ReadableTimeDiff, HistoryEntryProps[]>
  )

  return (
    <div className="history">
      {Object.entries(groupedHistory).map(([since, entries]) => {
        if (!entries.length) {
          return null
        }
        return (
          <Fragment key={since}>
            <div className="history__since">{since}</div>
            {entries.map((entry) => (
              <HistoryEntry {...entry} key={entry.noteId} />
            ))}
          </Fragment>
        )
      })}
    </div>
  )
}
