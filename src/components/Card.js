import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'

const Card = ({ info }) => {
  const { id, name, image, gender, profession } = info
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '300px',
        cursor: 'pointer',
      }}
      onClick={() => {
        navigate(`/${id}`)
      }}
    >
      <img
        style={{ maxWidth: '300px' }}
        src={image}
        alt={name}
        loading="lazy"
      />
      <Typography
        variant="body1"
        component="span"
        style={{ fontWeight: 'bold', marginTop: '25px' }}
      >
        {name}
      </Typography>
      <Typography variant="body2" component="span" style={{ color: 'grey' }}>
        {gender}
      </Typography>
      <Typography
        variant="body2"
        component="span"
        style={{ fontStyle: 'italic', color: 'grey' }}
      >
        {profession}
      </Typography>
    </Box>
  )
}

export default Card
