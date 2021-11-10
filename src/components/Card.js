import Box from '@mui/material/Box'

const Card = ({ info }) => {
  const { name, image, gender, profession } = info
  return (
    <Box>
      <img src={image} alt={name} loading="lazy" />
      <span>{name}</span>
      <span>{gender}</span>
      <span>{profession}</span>
    </Box>
  )
}

export default Card
