import React from 'react';
import Styles from './Login.module.css';
import Container from '../../components/Container';
import Input from '../../components/Inputs/Input';
import useForm, { UseFormType } from '../../hooks/useForm';
import { Navigate, NavigateFunction, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../GlobalContext';

const Login = () => {
  const { data, setUser } = React.useContext(GlobalContext);

  const navigate: NavigateFunction = useNavigate();
  const login: UseFormType = useForm();
  const password: UseFormType = useForm();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (login.validate() && password.validate()) {
      if (data?.users.some((s) => s.login === login.value && s.password === password.value)) {
        localStorage.setItem('logged', login.value);
        setUser(login.value);
        navigate('/painel');
      } else {
        password.setError('Usuário ou Senha invalidos');
      }
    }
  }

  if (localStorage.getItem('logged')) return <Navigate to='/painel' />
  return(
    <Container>
      <div className={Styles.login}>
        <h1>Faça o login</h1>
        <form onSubmit={handleSubmit}>
          <Input type='text' label='Login' {...login} />
          <Input type='password' label='Senha' {...password} />
          <button>Entrar</button>
        </form>
      </div>
    </Container>
  )
}

export default Login