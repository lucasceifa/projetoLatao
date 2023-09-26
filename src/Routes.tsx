import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='' element={<Home />}/>
        <Route path='Login' element={<Login />}/>
      </Routes>
    </Router>
  )
}
