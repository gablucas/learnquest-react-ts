import { useContext } from 'react';
import Styles from './Sidebar.module.css';
import Panel from '../Panel.module.css';
import { Link, useParams } from "react-router-dom";
import useData from '../../../hooks/useData';
import { GlobalContext } from '../../../GlobalContext';

const Sidebar = () => {
  const { toggle, setToggle } = useContext(GlobalContext);
  const { getLoggedUser, logoutUser } = useData();
  const param = useParams();
  const route = param['*'];

  function userHasAccess(access: 'student' | 'teacher' | 'admin'): boolean {
    return getLoggedUser()?.access === access
  }

  function selectedMenu(selectRoute: string[]): string {
    if (selectRoute.some((r) => r === route?.split('/')[0])) {
      return Styles.active;
    } else {
      return '';
    }
  }

  function closeMenuMobile(): void {
    if (toggle !== 'none') {
      setToggle('none');
    }
  }

  return (
    <nav className={Styles.sidebar}>
      <button className={Panel.mobile} onClick={() => setToggle('mobile')}>Menu</button>

      <ul className={toggle === 'mobile' ? Styles.open : Styles.closed}>
        <li className={selectedMenu([''])} onClick={closeMenuMobile}><Link to='/painel'>Visão geral</Link></li>
        {userHasAccess('admin') && <li className={selectedMenu(['usuarios'])} onClick={closeMenuMobile}><Link to='usuarios'>Usuarios</Link></li>}
        {userHasAccess('admin') && <li className={selectedMenu(['turmas'])} onClick={closeMenuMobile}><Link to='turmas'>Turmas</Link></li>}
        {userHasAccess('admin') && <li className={selectedMenu(['materias'])} onClick={closeMenuMobile}><Link to='materias'>Matérias</Link></li>}
        <li className={selectedMenu(['alunos', 'aluno'])} onClick={closeMenuMobile}><Link to='alunos'>Alunos</Link></li>
        <li className={selectedMenu(['aulas'])} onClick={closeMenuMobile}><Link to='aulas'>Aulas</Link></li>
        <li className={selectedMenu(['avaliar'])} onClick={closeMenuMobile}><Link to='avaliar'>Avaliar tarefas</Link></li>
        {userHasAccess('admin') && <li className={selectedMenu(['preferencias'])} onClick={closeMenuMobile}><Link to='preferencias'>Preferências</Link></li>}
        <li><button onClick={logoutUser}>Sair</button></li>
      </ul>
    </nav>
  )
}

export default Sidebar;