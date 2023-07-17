import React from 'react';
import Styles from './Login.module.css';
import Container from '../../components/Container';
import Input from '../../components/Inputs/Input';
import useForm, { UseFormType } from '../../hooks/useForm';
import { Navigate, NavigateFunction, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../GlobalContext';
import useData from '../../hooks/useData';

const Login = () => {
  const { data, setUser } = React.useContext(GlobalContext);
  const { getLoggedUser } = useData();
  const user = getLoggedUser();

  const navigate: NavigateFunction = useNavigate();
  const login: UseFormType = useForm({type: 'user', initialValue: ''});
  const password: UseFormType = useForm({type: 'password', initialValue: ''});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (login.validate() && password.validate()) {
      if (data?.users.some((s) => s.login.toLowerCase() === login.value.toLowerCase() && s.password === password.value)) {
        localStorage.setItem('logged', login.value);
        setUser(login.value);

        if (getLoggedUser()?.access === "student") {
          navigate('/estudante');
        } else {
          navigate('/painel');
        }

      } else {
        password.setError('Usuário ou Senha invalidos');
      }
    }
  }

  if (user && user.access === 'student') return <Navigate to='/estudante' />
  if (user && user.access !== 'student') return <Navigate to='/painel' />
  else
  return(
    <Container>
      <div className={Styles.login_container}>
        <div className={Styles.test}>
          <h2>Contas para teste</h2>
          <div>
            <span>Administrador</span>
            <span>Login: admin</span>
            <span>Senha: 123</span>
          </div>
          <div>
            <span>Professor</span>
            <span>Login: professor </span>
            <span>Senha: 123</span>
          </div>
          <div>
            <span>Aluno</span>
            <span>Login: aluno</span>
            <span>Senha: 123</span>
          </div>
        </div>
        <div className={Styles.login}>
          <h1>Faça o login</h1>
          <form onSubmit={handleSubmit}>
            <Input type='text' label='Login' {...login} />
            <Input type='password' label='Senha' {...password} />
            <button>Entrar</button>
          </form>
        </div>
      </div>
    </Container>
  )
}

export default Login