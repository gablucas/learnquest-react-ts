import Styles from '../Panel.module.css';
import { Link } from "react-router-dom";
import useData from '../../../hooks/useData';

const Sidebar = () => {
  const { getUser, logoutUser } = useData();
  


  return (
    <nav className={Styles.sidebar}>
      <ul>
        {getUser()?.access === 'admin' && <li><Link to='/painel'>Visão geral</Link></li>}
        {getUser()?.access === 'admin' && <li><Link to='usuarios'>Usuarios</Link></li>}
        {getUser()?.access !== 'student' && <li><Link to='aulas'>Aulas</Link></li>}
        {getUser()?.access === 'admin' && <li><Link to='preferencias'>Preferências</Link></li>}
        <li><button onClick={logoutUser}>Sair</button></li>
      </ul>
    </nav>
  )
}

export default Sidebar;