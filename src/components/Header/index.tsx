import Container from '../Container';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import useData from '../../hooks/useData';

const Header = () => {
  const { getLoggedUser } = useData();
  const user = getLoggedUser();

  return (
    <header className={styles.header}>
      <Container tag='div'>
        <Link to='/'><img src={Logo} alt="" /></Link>
        <nav>
          {!user ? (
            <>
              <Link to='/' className={styles.login}>Entrar</Link>
            </>
          ) : (
            <Link to={getLoggedUser()?.access !== 'student' ? '/painel' : '/estudante'}>{getLoggedUser()?.name}</Link>
          )}
        </nav>
      </Container>
    </header>
  )
}

export default Header;