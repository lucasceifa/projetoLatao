import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Config } from './pages/Config'
import { Compra } from './pages/Compra'
import { IsAuth } from './Utils/Helper'
import { MyFlights } from './pages/MyFlights'

export const AppRoutes: React.FC = () => {

  function AuthenticateRoutes() {
    if (IsAuth()) {
      return <Outlet />
    } else {
      return <Navigate to={'/Login'}/>
    }
  }

  return (
    <Router>
      <Routes>
        <Route path='Login' element={<Login />}/>
        <Route element={<AuthenticateRoutes />}>
          <Route path='' element={<Home />}/>
          <Route path='MyFlights' element={<MyFlights />}/>
          <Route path='Config' element={<Config />}/>
          <Route path='Compra/:id' element={<Compra />}/>
        </Route>
      </Routes>
    </Router>
  )
}
