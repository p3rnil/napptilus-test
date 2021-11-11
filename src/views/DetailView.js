import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useOompaLoompa from '../services/useOompaLoompa'
import { Header } from '../components'

const CardDetail = () => {
  let params = useParams()
  const { response, loading } = useOompaLoompa(parseInt(params.id))

  if (loading) return null

  return (
    <>
      <Header />
      <Box>
        <img
          style={{ maxWidth: '300px' }}
          src={response.image}
          alt={response.name}
          loading="lazy"
        />
        <Typography variant="body2" component="span" style={{ color: 'grey' }}>
          {response.name}
        </Typography>
        <Typography variant="body2" component="span" style={{ color: 'grey' }}>
          {response.gender}
        </Typography>
        <Typography variant="body2" component="span" style={{ color: 'grey' }}>
          {response.profession}
        </Typography>
        <Typography variant="body2" component="span" style={{ color: 'grey' }}>
          {response.description}
        </Typography>
      </Box>
    </>
  )
}

export default CardDetail
