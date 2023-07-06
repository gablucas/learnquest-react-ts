import { Routes, Route, HashRouter } from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import Panel from './pages/Panel';
import Login from './pages/Login';
import ProtectedRoutes from './components/Helper/ProtectedRoutes';
import { GlobalProvider } from './GlobalContext';
import Users from './pages/Panel/Users/Users';
import Dashboard from './pages/Panel/Dashboard/Dashboard';
import Preferences from './pages/Panel/Preferences/Preferences';
import Lessons from './pages/Panel/Lessons/Lessons';
import Student from './pages/Student';
import Classes from './pages/Panel/Classes/Classes';
import CreateLesson from './pages/Panel/Lessons/components/CreateLesson';
import StudentLessons from './pages/Student/StudentLessons/StudentLessons';
import StudentInfo from './pages/Student/StudendInfo/StudentInfo';
import StudentLesson from './pages/Student/StudentLesson/StudentLesson';
import Subjects from './pages/Panel/Subjects/Subjects';

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
                <Route path='turmas' element={<ProtectedRoutes allowedAccess={['admin']}><Classes /></ProtectedRoutes>} />
                <Route path='materias' element={<ProtectedRoutes allowedAccess={['admin']}><Subjects /></ProtectedRoutes>} />
                <Route path='preferencias' element={<ProtectedRoutes allowedAccess={['admin']}><Preferences /></ProtectedRoutes>} />
                <Route path='aulas' element={<Lessons />}/>
                <Route path='aulas/criar' element={<CreateLesson />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoutes allowedAccess={['student']}/>}>
              <Route path='/estudante' element={<Student />}>
                <Route path='' element={<StudentInfo />} />
                <Route path='aulas' element={<StudentLessons />} />
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
