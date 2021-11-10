import { useEffect, useCallback, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import { Card } from '../components'
import useOompaLoompas from '../services/useOompaLoompas'
import {
  useOompaLoompaState,
  useOompaLoompaDispatch,
} from '../context/oompaLoompaContext'

const List = () => {
  const { list, filteredList, page } = useOompaLoompaState()
  const [listToShow, setListToShow] = useState(list)
  const { response, loading } = useOompaLoompas(page)
  const dispatch = useOompaLoompaDispatch()
  const loader = useRef(null)

  const loaderRef = useCallback(
    (node) => {
      if (loading) return
      if (loader.current) loader.current.disconnect()
      loader.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && filteredList === null) {
          dispatch({ type: 'increment_page' })
        }
      })
      if (node) loader.current.observe(node)
    },
    [dispatch, filteredList, loading]
  )

  useEffect(() => {
    if (filteredList !== null) {
      setListToShow(filteredList)
    } else {
      setListToShow(list)
    }
  }, [list, filteredList])

  useEffect(() => {
    dispatch({ type: 'update_loading', payload: loading })
  }, [dispatch, loading])

  // Effect for update context
  useEffect(() => {
    if (response !== null && response.length !== 0) {
      // Update context
      dispatch({ type: 'update_list', payload: response })
    }
  }, [dispatch, response])

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridGap: '40px 25px',
        justifyContent: 'center',
      }}
    >
      {listToShow.map((element, index) => {
        if (listToShow.length === index + 1) {
          return (
            <div key={index} ref={loaderRef}>
              <Card key={index} info={element} />
            </div>
          )
        } else {
          return (
            <div key={index}>
              <Card key={index} info={element} />
            </div>
          )
        }
      })}
    </Box>
  )
}

export default List
