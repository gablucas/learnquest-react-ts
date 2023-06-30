import React from 'react';
import { GlobalContext } from '../../GlobalContext';
import Container from '../Container';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import useData from '../../hooks/useData';

const Header = () => {
  const { user } = React.useContext(GlobalContext)
  const { getUser } = useData();

  return (
    <header className={styles.header}>
      <Container tag='div'>
        <Link to='/'><img src={Logo} alt="" /></Link>
        <nav>
          {!user ? (
            <>
            <Link to='/login' className={styles.login}>Entrar</Link>
            <Link to='/registrar' className={styles.register}>Registrar</Link>
          </>
          ) : (
            <Link to='/painel'>{getUser()?.nome}</Link>
          )}
        </nav>
      </Container>
    </header>
  )
}

export default Header;