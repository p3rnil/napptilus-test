import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Header = () => {
  return (
    <Box
      gap={2}
      sx={{
        display: 'flex',
        alignSelf: 'stretch',
        width: '100%',
        backgroundColor: '#B8B8B8',
        padding: '5px 0',
        paddingLeft: '22%',
        marginBottom: '15px',
      }}
    >
      <img
        style={{ maxHeight: '25px' }}
        src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/logo-umpa-loompa.png"
        alt="logo"
        loading="lazy"
      />
      <Typography
        variant="subtitle1"
        component="div"
        align="center"
        style={{ fontWeight: 'bold' }}
      >
        Oompa Loompa's Crew
      </Typography>
    </Box>
  )
}

export default Header
