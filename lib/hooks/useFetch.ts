import { useEffect, useState } from 'react'

const useFetch = <T>(url: string, args?: RequestInit) => {
  const [data, setData] = useState<T | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    fetch(url, args)
      .then((r) => {
        if (r.ok) {
          return r.json()
        }
        throw r
      })
      .then((d) => setData(d))
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false))
  }, [url, args])

  return { data, isLoading, error }
}

export default useFetch
