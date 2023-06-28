import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav>
      <ul>
        <li><Link to='/painel'>Visão geral</Link></li>
        <li><Link to='usuarios'>Usuarios</Link></li>
        <li><Link to='preferencias'>Preferências</Link></li>
      </ul>
    </nav>
  )
}

export default Sidebar;