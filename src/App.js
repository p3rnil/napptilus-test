import Layout from './components'
import { OompaLoompaProvider } from './context/oompaLoompaContext'

const App = () => {
  return (
    <OompaLoompaProvider>
      <Layout />
    </OompaLoompaProvider>
  )
}

export default App
