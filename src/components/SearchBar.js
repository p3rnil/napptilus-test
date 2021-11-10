import { useState, useEffect } from 'react'
import { getItem } from '../utils/localStorage'
import {
  useOompaLoompaState,
  useOompaLoompaDispatch,
} from '../context/oompaLoompaContext'

const SearchBar = () => {
  const [listFromLocalStorage, setListFromLocalStorage] = useState(null)
  const [query, setQuery] = useState('')
  const { loading } = useOompaLoompaState()
  const dispatch = useOompaLoompaDispatch()

  const handleChange = (e) => {
    setQuery(e.target.value.toLowerCase())
  }

  // Load all Oompas from local storage
  useEffect(() => {
    if (!loading) {
      const getAllOompas = () => {
        const oompaLoompasList = getItem(`OompaLoompas`)
        if (oompaLoompasList !== null) {
          setListFromLocalStorage(
            oompaLoompasList.map((element) => element.list).flat()
          )
        }
      }
      getAllOompas()
    }
  }, [loading])

  // Filter & update context
  useEffect(() => {
    if (!listFromLocalStorage) return
    if (query.length === 0) {
      dispatch({ type: 'update_filteredList', payload: null })
      return
    }

    const filteredList = listFromLocalStorage.filter(
      (element) =>
        element.name.toLowerCase().includes(query) ||
        element.profession.toLowerCase().includes(query)
    )

    dispatch({ type: 'update_filteredList', payload: filteredList })
  }, [dispatch, listFromLocalStorage, query])

  return <input type="text" value={query} onChange={handleChange} />
}

export default SearchBar
