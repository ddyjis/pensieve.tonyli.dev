import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

const useLocalStorage = <T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(initialValue)

  useEffect(() => {
    const storedValue = window.localStorage.getItem(key)
    if (storedValue !== null) {
      setValue(JSON.parse(storedValue))
    }
  }, [key])

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
