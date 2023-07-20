import { Link, useParams } from 'react-router-dom';
import Styles from './StudentMenu.module.css';
import useData from '../../../hooks/useData';


const StudentMenu = () => {
  const { logoutUser } = useData();
  const param = useParams();
  const route = param['*'];

  return (
    <nav className={Styles.student_menu_container}>
      <ul>
        <li className={route === '' ? Styles.active : ''}><Link to=''>Minhas informações</Link></li>
        <li className={route?.includes('aulas') ? Styles.active : ''}><Link to='aulas'>Minhas aulas</Link></li>
        <li><button onClick={logoutUser}>Sair</button></li>
      </ul>
    </nav>
  )
}

export default StudentMenu;