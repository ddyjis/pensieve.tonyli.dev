import useLocalStorage from './useLocalStorage'

const useHistory = () => {
  const [history, setHistory] = useLocalStorage<string[]>('history', [])
  const addHistory = (entry: string) => setHistory([entry, ...history.filter((h) => h !== entry)])
  const removeHistory = (entry: string) => setHistory(history.filter((h) => h !== entry))
  return { history, addHistory, removeHistory }
}

export default useHistory
