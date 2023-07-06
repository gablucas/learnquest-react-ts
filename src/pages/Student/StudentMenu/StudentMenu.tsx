import { Link } from 'react-router-dom';
import Style from '../Student.module.css';
import useData from '../../../hooks/useData';


const StudentMenu = () => {
  const { logoutUser } = useData();

  return (
    <div className={Style.student_menu_container}>
      <Link to='aulas'>Minhas aulas</Link>
      <Link to=''>Minhas informações</Link>
      <button onClick={logoutUser}>Sair</button>
    </div>
  )
}

export default StudentMenu;