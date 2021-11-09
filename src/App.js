import { Routes, Route } from 'react-router-dom'
import { MainView, DetailView } from './views'
import { OompaLoompaProvider } from './context/oompaLoompaContext'

const App = () => {
  return (
    <OompaLoompaProvider>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/:id" element={<DetailView />} />
      </Routes>
    </OompaLoompaProvider>
  )
}

export default App
