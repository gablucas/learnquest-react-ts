import React from 'react';
import Styles from './Login.module.css';
import Container from '../../components/Container';
import Input from '../../components/Inputs/Input';
import useForm, { UseFormType } from '../../hooks/useForm';
import useUsers from '../../hooks/useUsers';
import { Link, Navigate, NavigateFunction, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../GlobalContext';

const Login = () => {
  const { auth, setAuth } = React.useContext(GlobalContext);
  const navigate: NavigateFunction = useNavigate();

  const email: UseFormType = useForm();
  const password: UseFormType = useForm();
  const users = useUsers();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (email.validate() && password.validate()) {
      if (users.instituitions.some((s) => s.email === email.value && s.password === password.value)) {
        localStorage.setItem('logged', email.value);
        setAuth(true)
        navigate('/panel');
      } else {
        password.setError('Usuário ou Senha invalidos');
      }
    }
  }

  if (auth) return <Navigate to='/' />
  return(
    <Container>
      <div className={Styles.login}>
        <h1>Faça o login</h1>
        <form onSubmit={handleSubmit}>
          <Input type='email' label='Email' {...email} />
          <Input type='password' label='Senha' {...password} />
          <button>Entrar</button>
          <div>Não possui conta? <Link to='/register' >Registre-se</Link></div>
        </form>
      </div>
    </Container>
  )
}

export default Login