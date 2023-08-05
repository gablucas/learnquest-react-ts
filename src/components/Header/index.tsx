import Container from '../Container';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import { getLoggedUser } from '../../helpers/user/getLoggedUser';

const Header = () => {

  return (
    <header className={styles.header}>
      <Container tag='div'>
        <Link role='presentation' to='/'><img src={Logo} alt="logo" /></Link>
        <nav>
          {getLoggedUser() === undefined ? (
            <Link role='link' to='/' className={styles.login}>Entrar</Link>
          ) : (
            <Link role='link' data-testid="username" to={getLoggedUser()?.access !== 'student' ? '/painel' : '/estudante'}>{getLoggedUser()?.name}</Link>
          )}
        </nav>
      </Container>
    </header>
  )
}

export default Header;