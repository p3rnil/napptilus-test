import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
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

  return (
    <Box
      sx={{
        display: 'flex',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '5px',
        borderColor: '#B8B8B8',
        padding: '5px',
        marginLeft: '48.5%',
      }}
    >
      <input
        type="text"
        style={{ border: '0', outline: 'none', maxWidth: '100px' }}
        value={query}
        placeholder="Search"
        onChange={handleChange}
      />
      <img
        style={{
          maxHeight: '15px',
          borderLeftWidth: '1px',
          borderColor: 'grey',
          borderLeftStyle: 'solid',
          paddingLeft: '3px',
        }}
        src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/ic_search.png"
        alt="logo"
        loading="lazy"
      />
    </Box>
  )
}

export default SearchBar
