import { Link } from 'react-router-dom';
import Style from '../Student.module.css';
import useData from '../../../hooks/useData';


const StudentMenu = () => {
  const { logoutUser } = useData();

  return (
    <div className={Style.student_menu_container}>
      <Link to='/estudante'>Minhas tarefas</Link>
      <Link to='informacoes'>Minhas informações</Link>
      <button onClick={logoutUser}>Sair</button>
    </div>
  )
}

export default StudentMenu;