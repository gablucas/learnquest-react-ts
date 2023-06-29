import Container from '../Container';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';

const Header = () => {

  return (
    <header className={styles.header}>
      <Container tag='div'>
        <Link to='/'><img src={Logo} alt="" /></Link>
        <nav>
          {!localStorage.getItem('logged') ? (
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