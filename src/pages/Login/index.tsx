import Styles from './Login.module.css';
import Container from '../../components/Container';
import useForm, { UseFormType } from '../../hooks/useForm';
import { Navigate } from 'react-router-dom';
import useData from '../../hooks/useData';
import TestUsers from './test-users';
import LoginForm from './login-form';

const Login = () => {
  const { getLoggedUser } = useData();
  const user = getLoggedUser();

  const login: UseFormType = useForm({type: 'user', initialValue: ''});
  const password: UseFormType = useForm({type: 'password', initialValue: ''});

  if (user && user.access === 'student') return (<Navigate to='/estudante' />)
  if (user && user.access !== 'student') return (<Navigate to='/painel' />)
  else return(
    <Container>
      <div className={Styles.login_container}>
        <TestUsers login={login} password={password} />
        <LoginForm login={login} password={password} />
      </div>
    </Container>
  )
}

export default Login