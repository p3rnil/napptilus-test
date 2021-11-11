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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '50px',
        }}
      >
        <img
          style={{ maxHeight: '450px' }}
          src={response.image}
          alt={response.name}
          loading="lazy"
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '500px',
            marginLeft: '15px',
          }}
        >
          <Typography
            variant="h6"
            component="div"
            style={{ fontWeight: 'bold' }}
          >
            {response.name}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            style={{ color: 'grey' }}
          >
            {response.gender}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            style={{ fontStyle: 'italic', color: 'grey', marginBottom: '30px' }}
          >
            {response.profession}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: response.description }} />
        </Box>
      </Box>
    </>
  )
}

export default CardDetail
