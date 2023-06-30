import { Link } from 'react-router-dom';
import Style from '../Student.module.css';

const StudentMenu = () => {

  return (
    <div className={Style.student_menu_container}>
      <Link to='/estudante'>Minhas tarefas</Link>
      <Link to='informacoes'>Minhas informações</Link>
      <button>Sair</button>
    </div>
  )
}

export default StudentMenu;