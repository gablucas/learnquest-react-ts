import { Routes, Route, HashRouter } from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Plans from './pages/Planos/Plans';
import Panel from './pages/Panel';
import Login from './pages/Login';
import ProtectedRoutes from './components/Helper/ProtectedRoutes';
import { GlobalProvider } from './GlobalContext';
import Users from './pages/Panel/components/Users';
import Dashboard from './pages/Panel/components/Dashboard';
import Preferences from './pages/Panel/components/Preferences';

function App() {

  return (
    <>
      <HashRouter>
        <GlobalProvider>
          <Header />
          <Routes>

            <Route path='/' element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/painel' element={<Panel />}>
                <Route path='' element={<Dashboard />} />
                <Route path='usuarios' element={<Users />} />
                <Route path='preferencias' element={<Preferences />} />
              </Route>
            </Route>

          </Routes>
          <Footer />
        </GlobalProvider>
      </HashRouter>
    </>
  )
}

export default App
