import { createContext, useState } from 'react'

import type { NoteId } from '../lib/firebase'
import useLocalStorage from '../lib/hooks/useLocalStorage'

interface PensieveContextProps {
  history: NoteId[]
  addHistory: (_noteId: NoteId) => void
  removeHistory: (_noteId: NoteId) => void
  searchQuery: string
  setSearchQuery: (_query: string) => void
}

const defaultValues = {
  history: [] as NoteId[],
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
  const [history, setHistory] = useLocalStorage<string[]>('history', defaultValues.history)
  const [searchQuery, setSearchQuery] = useState(defaultValues.searchQuery)

  const addHistory = (entry: string) => {
    setHistory([entry, ...history.filter((h) => h !== entry)])
  }

  const removeHistory = (entry: string) => {
    setHistory(history.filter((h) => h !== entry))
  }

  return (
    <PensieveContext.Provider
      value={{ history, addHistory, removeHistory, searchQuery, setSearchQuery }}
    >
      {children}
    </PensieveContext.Provider>
  )
}
