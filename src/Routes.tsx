import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Config } from './pages/Config'

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='' element={<Home />}/>
        <Route path='Login' element={<Login />}/>
        <Route path='Config' element={<Config />}/>
      </Routes>
    </Router>
  )
}
