import Container from '../Container';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import useData from '../../hooks/useData';

const Header = () => {
  const { getUser } = useData();
  const user = getUser();

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
            <Link to={getUser()?.access !== 'student' ? '/painel' : '/estudante'}>{getUser()?.nome}</Link>
          )}
        </nav>
      </Container>
    </header>
  )
}

export default Header;