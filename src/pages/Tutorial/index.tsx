import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import Styles from './Tutorial.module.css';
import RoleTypes from './role-types';
import Faq from './faq';
import About from './about';

const Tutorial = () => {

  return (
    <Container>
      <div className={Styles.tutorial}>
        <Link role='link' to='/'>Voltar para a página de login</Link>
        <About />
        <RoleTypes />
        <Faq />
      </div>
    </Container>
  )
}

export default Tutorial;
