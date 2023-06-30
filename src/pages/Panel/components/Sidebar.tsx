import React from 'react';
import Styles from '../Panel.module.css';
import { Link } from "react-router-dom";
import { GlobalContext } from "../../../GlobalContext";
import useData from '../../../hooks/useData';

const Sidebar = () => {
  const { setUser } = React.useContext(GlobalContext);
  const { getUser } = useData();
  
  function handleLogout(): void {
    localStorage.removeItem('logged');
    setUser(null);
  }

  return (
    <nav className={Styles.sidebar}>
      <ul>
        {getUser()?.access === 'admin' && <li><Link to='/painel'>Visão geral</Link></li>}
        {getUser()?.access === 'admin' && <li><Link to='usuarios'>Usuarios</Link></li>}
        {getUser()?.access !== 'student' && <li><Link to='aulas'>Aulas</Link></li>}
        {getUser()?.access === 'admin' && <li><Link to='preferencias'>Preferências</Link></li>}
        <li><button onClick={handleLogout}>Sair</button></li>
      </ul>
    </nav>
  )
}

export default Sidebar;