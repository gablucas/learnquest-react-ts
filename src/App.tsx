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
import StudentLessons from './pages/Student/StudentLessons/StudentLessons';
import StudentInfo from './pages/Student/StudendInfo/StudentInfo';
import StudentLesson from './pages/Student/StudentLesson/StudentLesson';
import Subjects from './pages/Panel/Subjects/Subjects';
import Groups from './pages/Panel/Groups/Groups';
import HandleLesson from './pages/Panel/Lessons/components/HandleLesson';
import EvaluateTasks from './pages/Panel/Evaluate/EvaluateTasks';
import EvaluateTask from './pages/Panel/Evaluate/components/EvaluateTask';
import Students from './pages/Panel/Students/Students';
import StudentData from './pages/Panel/Students/StudentData';


function App() {

  return (
    <>
      <HashRouter>
        <GlobalProvider>
          <Header />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route element={<ProtectedRoutes allowedAccess={['admin', 'teacher']}/>}>
              <Route path='/painel/*' element={<Panel />}>
                <Route path='' element={<Dashboard />} />
                <Route path='aulas' element={<Lessons />}/>
                <Route path='aulas/criar' element={<HandleLesson />} />
                <Route path='aulas/editar/:id' element={<HandleLesson />} />
                <Route path='avaliar' element={<EvaluateTasks />} />
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
