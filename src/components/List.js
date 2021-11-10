import Box from '@mui/material/Box'
import { useEffect, useCallback, useState, useRef } from 'react'
import { Card } from '../components'
import useOompaLoompas from '../services/useOompaLoompas'
import {
  useOompaLoompaState,
  useOompaLoompaDispatch,
} from '../context/oompaLoompaContext'

const List = () => {
  const [page, setPage] = useState(1)
  const { response, loading } = useOompaLoompas(page)
  const { list } = useOompaLoompaState()
  const dispatch = useOompaLoompaDispatch()
  const loader = useRef(null)

  const handleObserver = useCallback((entries) => {
    const target = entries[0]
    if (target.isIntersecting) {
      setPage((prev) => prev + 1)
    }
  }, [])

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0.0,
    }
    const observer = new IntersectionObserver(handleObserver, option)
    if (loader.current) {
      observer.observe(loader.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleObserver, loader.current])

  // Effect for update context
  useEffect(() => {
    if (response !== null && response.length !== 0) {
      // Update context
      dispatch({ type: 'update_list', payload: response })
    }
  }, [dispatch, response])

  if (loading) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridGap: '40px 25px',
        justifyContent: 'center',
      }}
    >
      {list.map((element, index) => {
        return <Card key={index} info={element}></Card>
      })}
      <div ref={loader} />
    </Box>
  )
}

export default List
