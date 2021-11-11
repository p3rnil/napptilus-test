import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Header, List, SearchBar } from '../components'

const MainView = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Header />
      <SearchBar />
      <Typography variant="h3" component="h3" align="center">
        Find your Oompa Loompa
      </Typography>
      <Typography
        variant="h4"
        component="h4"
        align="center"
        style={{ color: 'grey' }}
      >
        There are more than 100k
      </Typography>
      <List />
    </Box>
  )
}

export default MainView
