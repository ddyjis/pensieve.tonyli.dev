import NextLink from 'next/link'
import React, { useContext } from 'react'

import { PensieveContext } from '../../components/PensieveContext'
import useFetch from '../../lib/hooks/useFetch'
import { type SearchResult as SearchResultType } from '../api/search'

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useContext(PensieveContext)

  return (
    <div className="search-bar">
      <input
        type="text"
        name="search_field"
        id="search_field"
        value={searchQuery}
        placeholder="Search for Notes"
        aria-label="Search"
        onChange={(event) => setSearchQuery(event.target.value)}
        autoFocus
      />
    </div>
  )
}

const SearchResult = () => {
  const { searchQuery } = useContext(PensieveContext)
  const { data, isLoading, error } = useFetch<SearchResultType>(`/api/search/?q=${searchQuery}`)

  if (!searchQuery || searchQuery.length < 3) {
    return null
  }
  if (error) {
    console.log(error)
    return <div>Failed to load search result</div>
  }

  if (!data || isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <div className="search-result">
      {data.notes.map(({ id, value: { readableText, title } }) => (
        <NextLink href={`/${id}`} className="search-result__item" key={id}>
          <h1>{title}</h1>
          <p dangerouslySetInnerHTML={{ __html: readableText }}></p>
        </NextLink>
      ))}
    </div>
  )
}

export default function SearchPage() {
  return (
    <>
      <SearchBar />
      <SearchResult />
    </>
  )
}
