import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='' element={<Home />}/>
      </Routes>
    </Router>
  )
}
