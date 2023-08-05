import Styles from './Sidebar.module.css';
import Panel from '../Panel.module.css';
import { Link, useParams } from "react-router-dom";
import useToggle from '../../../hooks/useToggle';
import { useAuth } from '../../../hooks/useAuth';
import { userHasAccess } from '../../../helpers/user/userHasAccess';

const Sidebar = () => {
  const { logoutUser } = useAuth();
  const mobileMenu = useToggle();
  const param = useParams();
  const route = param['*'];
  const isAdmin = userHasAccess('admin');

  function selectedMenu(selectRoute: string[]): string {
    if (selectRoute.some((r) => r === route?.split('/')[0])) {
      return Styles.active;
    } else {
      return '';
    }
  }

  return (
    <nav className={Styles.sidebar}>
      <button className={Panel.mobile} onClick={mobileMenu.handleToggle}>Menu</button>
      <ul className={mobileMenu.toggle ? Styles.open : Styles.closed}>
        <li className={selectedMenu([''])} onClick={mobileMenu.handleToggle}><Link role='link' to='/painel'>Visão geral</Link></li>
        {isAdmin && <li className={selectedMenu(['usuarios'])} onClick={mobileMenu.handleToggle}><Link role='link' to='usuarios'>Usuários</Link></li>}
        {isAdmin && <li className={selectedMenu(['turmas'])} onClick={mobileMenu.handleToggle}><Link role='link' to='turmas'>Turmas</Link></li>}
        {isAdmin && <li className={selectedMenu(['materias'])} onClick={mobileMenu.handleToggle}><Link role='link' to='materias'>Matérias</Link></li>}
        <li className={selectedMenu(['alunos', 'aluno'])} onClick={mobileMenu.handleToggle}><Link role='link' to='alunos'>Alunos</Link></li>
        <li className={selectedMenu(['aulas'])} onClick={mobileMenu.handleToggle}><Link role='link' to='aulas'>Aulas</Link></li>
        <li className={selectedMenu(['avaliar'])} onClick={mobileMenu.handleToggle}><Link role='link' to='avaliar'>Avaliar tarefas</Link></li>
        {isAdmin && <li className={selectedMenu(['preferencias'])} onClick={mobileMenu.handleToggle}><Link role='link' to='preferencias'>Preferências</Link></li>}
        <li><button onClick={logoutUser}>Sair</button></li>
      </ul>
    </nav>
  )
}

export default Sidebar;