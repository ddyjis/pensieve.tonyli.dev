import { createContext, useState } from 'react'

import useLocalStorage from '../lib/hooks/useLocalStorage'
import type { HistoryEntryProps } from './HistoryEntry'

interface PensieveContextProps {
  history: HistoryEntryProps[]
  addHistory: (_entry: HistoryEntryProps) => void
  removeHistory: (_entry: HistoryEntryProps) => void
  searchQuery: string
  setSearchQuery: (_query: string) => void
}

const defaultValues = {
  history: [] as HistoryEntryProps[],
  searchQuery: '',
}

export const PensieveContext = createContext<PensieveContextProps>({
  history: defaultValues.history,
  addHistory: () => {},
  removeHistory: () => {},
  searchQuery: defaultValues.searchQuery,
  setSearchQuery: () => {},
})

export const PensieveProvider = ({ children }: { children: React.ReactNode }) => {
  const [history, setHistory] = useLocalStorage<HistoryEntryProps[]>(
    'history',
    defaultValues.history
  )
  const [searchQuery, setSearchQuery] = useState(defaultValues.searchQuery)

  const addHistory = (entry: HistoryEntryProps) => {
    setHistory([entry, ...history.filter((h) => h.noteId !== entry.noteId)])
  }

  const removeHistory = (entry: HistoryEntryProps) => {
    setHistory(history.filter((h) => h.noteId !== entry.noteId))
  }

  return (
    <PensieveContext.Provider
      value={{ history, addHistory, removeHistory, searchQuery, setSearchQuery }}
    >
      {children}
    </PensieveContext.Provider>
  )
}
