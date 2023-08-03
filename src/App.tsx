import { Routes, Route, HashRouter } from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import Panel from './pages/Panel';
import Login from './pages/Login';
import ProtectedRoutes from './components/Helper/ProtectedRoutes';
import { GlobalProvider } from './GlobalContext';
import Users from './pages/Panel/Users/Users';
import Dashboard from './pages/Panel/Dashboard';
import Preferences from './pages/Panel/Preferences';
import Lessons from './pages/Panel/Lessons';
import Student from './pages/Student';
import StudentLessons from './pages/Student/StudentLessons';
import Subjects from './pages/Panel/Subjects';
import Groups from './pages/Panel/Groups';
import HandleLesson from './pages/Panel/HandleLesson';
import EvaluateTask from './pages/Panel/EvaluateTasks';
import Students from './pages/Panel/Students/Students';
import StudentData from './pages/Panel/StudentData';
import Evaluate from './pages/Panel/Evaluate/Evaluate';
import StudentInformations from './pages/Student/Student-Information';
import StudentHandleLesson from './pages/Student/StudentLesson';
import Tutorial from './pages/Tutorial';


function App() {

  return (
    <>
      <HashRouter>
        <GlobalProvider>
          <Header />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/tutorial' element={<Tutorial />} />

            <Route element={<ProtectedRoutes allowedAccess={['admin', 'teacher']}/>}>
              <Route path='/painel/*' element={<Panel />}>
                <Route path='' element={<Dashboard />} />
                <Route path='aulas' element={<Lessons />}/>
                <Route path='aulas/criar' element={<HandleLesson />} />
                <Route path='aulas/editar/:id' element={<HandleLesson />} />
                <Route path='avaliar' element={<Evaluate />} />
                <Route path='avaliar/:id' element={<EvaluateTask />} />
                <Route path='alunos' element={<Students />} />
                <Route path='aluno/:id' element={<StudentData />} />
                
                <Route element={<ProtectedRoutes allowedAccess={['admin']} />}>
                  <Route path='usuarios' element={<Users />}/>
                  <Route path='turmas' element={<Groups />} />
                  <Route path='materias' element={<Subjects />} />
                  <Route path='preferencias' element={<Preferences />} />
                </Route>
              </Route>
            </Route>

            <Route element={<ProtectedRoutes allowedAccess={['student']}/>}>
              <Route path='/estudante/*' element={<Student />}>
                <Route path='' element={<StudentInformations />} />
                <Route path='aulas' element={<StudentLessons />} />
                <Route path='aula/:id' element={<StudentHandleLesson />} />
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
