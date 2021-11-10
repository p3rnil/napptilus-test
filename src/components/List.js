import Box from '@mui/material/Box'
import { useEffect } from 'react'
import { Card } from '../components'
import useOompaLoompas from '../services/useOompaLoompas'
import {
  useOompaLoompaState,
  useOompaLoompaDispatch,
} from '../context/oompaLoompaContext'

const List = () => {
  const { response, loading } = useOompaLoompas()
  const { list } = useOompaLoompaState()
  const dispatch = useOompaLoompaDispatch()

  // Effect for update context
  useEffect(() => {
    if (response !== null && response.length !== 0) {
      // Update context
      dispatch({ type: 'update_list', payload: response })
    }
  }, [response])

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
    </Box>
  )
}

export default List
