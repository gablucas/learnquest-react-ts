import React from 'react';
import Styles from './Sidebar.module.css';
import Panel from '../Panel.module.css';
import { Link, useParams } from "react-router-dom";
import useData from '../../../hooks/useData';

const Sidebar = () => {
  const { getLoggedUser, logoutUser } = useData();
  const param = useParams();
  const route = param['*'];

  const [toggleMobileMenu, setToggleMobileMenu] = React.useState<boolean>(false);

  function userHasAccess(access: 'student' | 'teacher' | 'admin'): boolean {
    return getLoggedUser()?.access === access
  }

  function selectedMenu(r: string): string {
    if (route === r) {
      return Styles.active;
    } else {
      return '';
    }
  }

  function closeMenuMobile(): void {
    if (toggleMobileMenu) {
      setToggleMobileMenu(false);
    }
  }
  
  selectedMenu('usuarios')

  return (
    <nav className={Styles.sidebar}>
      <button className={Panel.mobile} onClick={() => setToggleMobileMenu(!toggleMobileMenu)}>Menu</button>

      <ul className={toggleMobileMenu ? Styles.open : Styles.closed}>
        <li className={selectedMenu('')} onClick={closeMenuMobile}><Link to='/painel'>Visão geral</Link></li>
        {userHasAccess('admin') && <li className={selectedMenu('usuarios')} onClick={closeMenuMobile}><Link to='usuarios'>Usuarios</Link></li>}
        {userHasAccess('admin') && <li className={selectedMenu('turmas')} onClick={closeMenuMobile}><Link to='turmas'>Turmas</Link></li>}
        {userHasAccess('admin') && <li className={selectedMenu('materias')} onClick={closeMenuMobile}><Link to='materias'>Matérias</Link></li>}
        <li className={selectedMenu('aulas')} onClick={closeMenuMobile}><Link to='aulas'>Aulas</Link></li>
        <li className={selectedMenu('avaliar')} onClick={closeMenuMobile}><Link to='avaliar'>Avaliar tarefas</Link></li>
        {userHasAccess('admin') && <li className={selectedMenu('preferencias')} onClick={closeMenuMobile}><Link to='preferencias'>Preferências</Link></li>}
        <li><button onClick={logoutUser}>Sair</button></li>
      </ul>
    </nav>
  )
}

export default Sidebar;