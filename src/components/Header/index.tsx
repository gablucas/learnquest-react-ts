import React from 'react';
import Container from '../Container';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import { getLoggedUser } from '../../helpers/user/getLoggedUser';
import { GlobalContext } from '../../GlobalContext';

const Header = () => {
  const { user } = React.useContext(GlobalContext);
  const loggedUser =  getLoggedUser();

  return (
    <header className={styles.header}>
      <Container tag='div'>
        <Link role='presentation' to='/'><img src={Logo} alt="logo" /></Link>
        <nav>
          {user ? (
            <Link role='link' data-testid="username" to={loggedUser?.access !== 'student' ? '/painel' : '/estudante'}>{loggedUser?.name}</Link>
            ) : (
            <Link role='link' to='/' className={styles.login}>Entrar</Link>
          )}
        </nav>
      </Container>
    </header>
  )
}

export default Header;