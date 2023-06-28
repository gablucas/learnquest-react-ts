import React from 'react';
import Container from '../Container';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import { GlobalContext } from '../../GlobalContext';

const Header = () => {
  const { auth } = React.useContext(GlobalContext);

  return (
    <header className={styles.header}>
      <Container tag='div'>
        <Link to='/'><img src={Logo} alt="" /></Link>
        <nav>
          {!auth ? (
            <>
            <Link to='/login' className={styles.login}>Entrar</Link>
            <Link to='/registrar' className={styles.register}>Registrar</Link>
          </>
          ) : (
            <Link to='/painel'>Usuario</Link>
          )}
        </nav>
      </Container>
    </header>
  )
}

export default Header;