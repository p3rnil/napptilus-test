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

  const loaderRef = useCallback(
    (node) => {
      if (loading) return
      if (loader.current) loader.current.disconnect()
      loader.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1)
        }
      })
      if (node) loader.current.observe(node)
    },
    [loading]
  )

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
        if (list.length === index + 1) {
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
