import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Header, List, SearchBar } from '../components'

const Layout = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'repeat(3, 1fr)',
        justifyContent: 'center',
      }}
    >
      <Header />
      <Typography variant="h3" component="h3" align="center">
        Find your Oompa Loompa
      </Typography>
      <Typography variant="h4" component="h4" align="center">
        There are more than 100k
      </Typography>
      <SearchBar />
      <List />
    </Box>
  )
}

export default Layout
