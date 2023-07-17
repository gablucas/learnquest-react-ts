import Styles from '../Panel.module.css';
import { Link, useParams } from "react-router-dom";
import useData from '../../../hooks/useData';

const Sidebar = () => {
  const { getLoggedUser, logoutUser } = useData();
  const param = useParams();
  const route = param['*'];

  return (
    <nav className={Styles.sidebar}>
      <ul>
        <li className={route === '' ? Styles.active : ''}><Link to='/painel'>Visão geral</Link></li>
        {getLoggedUser()?.access === 'admin' && <li className={route?.includes('usuarios') ? Styles.active : ''}><Link to='usuarios'>Usuarios</Link></li>}
        {getLoggedUser()?.access === 'admin' && <li className={route?.includes('turmas') ? Styles.active : ''}><Link to='turmas'>Turmas</Link></li>}
        {getLoggedUser()?.access === 'admin' && <li className={route?.includes('materias') ? Styles.active : ''}><Link to='materias'>Matérias</Link></li>}
        <li className={route?.includes('aulas') ? Styles.active : ''}><Link to='aulas'>Aulas</Link></li>
        <li className={route?.includes('avaliar') ? Styles.active : ''}><Link to='avaliar'>Avaliar tarefas</Link></li>
        {getLoggedUser()?.access === 'admin' && <li className={route?.includes('preferencias') ? Styles.active : ''}><Link to='preferencias'>Preferências</Link></li>}
        <li><button onClick={logoutUser}>Sair</button></li>
      </ul>
    </nav>
  )
}

export default Sidebar;