import { Routes, Route, HashRouter } from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import Panel from './pages/Panel';
import Login from './pages/Login';
import ProtectedRoutes from './components/Helper/ProtectedRoutes';
import { GlobalProvider } from './GlobalContext';
import Users from './pages/Panel/components/Users';
import Dashboard from './pages/Panel/components/Dashboard';
import Preferences from './pages/Panel/components/Preferences';
import Lessons from './pages/Panel/components/Lessons';
import CreateLesson from './pages/Panel/components/CreateLesson';
import Student from './pages/Student';
import StudentLessons from './pages/Student/components/StudentLessons';
import StudentInfo from './pages/Student/components/StudentInfo';
import StudentLesson from './pages/Student/components/StudentLesson';

function App() {

  return (
    <>
      <HashRouter>
        <GlobalProvider>
          <Header />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route element={<ProtectedRoutes allowedAccess={['admin', 'teacher']}/>}>
              <Route path='/painel' element={<Panel />}>
                <Route path='' element={<Dashboard />} />
                <Route path='usuarios' element={<ProtectedRoutes allowedAccess={['admin']}><Users /></ProtectedRoutes>} />
                <Route path='preferencias' element={<ProtectedRoutes allowedAccess={['admin']}><Preferences /></ProtectedRoutes>} />
                <Route path='aulas' element={<Lessons />}/>
                <Route path='aulas/criar' element={<CreateLesson />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoutes allowedAccess={['student']}/>}>
              <Route path='/estudante' element={<Student />}>
                <Route path='' element={<StudentLessons />} />
                <Route path='informacoes' element={<StudentInfo />} />
                <Route path='aula/:id' element={<StudentLesson />} />
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
