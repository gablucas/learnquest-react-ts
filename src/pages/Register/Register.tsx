import React from 'react';
import Container from '../../components/Container';
import styles from './Register.module.css';
import Input from '../../components/Inputs/Input';
import useForm, { UseFormType } from '../../hooks/useForm';
import { Link, Navigate, NavigateFunction, useNavigate } from 'react-router-dom';
import useUsers from '../../hooks/useUsers';
import { GlobalContext } from '../../GlobalContext';
import useRandom from '../../hooks/useRandom';

type HandleSubmitProp = React.FormEvent<HTMLFormElement>;

const Register = () => {
  const { auth } = React.useContext(GlobalContext);
  const userHook = useUsers();
  const randomId = useRandom();
  const navigate: NavigateFunction = useNavigate();

  const nome: UseFormType = useForm();
  const password: UseFormType = useForm();
  const confirmPassword: UseFormType = useForm();
  const email: UseFormType = useForm();

function handleSubmit(e: HandleSubmitProp): void {
  e.preventDefault();
  
  if (nome.validate() && password.validate() && confirmPassword.validate() && email.validate()) {

      userHook.registerUser({ 
        id: randomId.getRandomId(),
        access: 'instituition',
        nome: nome.value, 
        email: email.value, 
        password: password.value,
        users: [],
        preferences: {
          defaultPassword: 123,
        },
      });
      navigate('/login');
  }
}

  if (auth) return <Navigate to='/' />
  return (
    <Container>
      <div className={styles.register}>

        <div className={styles.about}>
          <h1></h1>
          <Link to='/'>Saiba mais sobre</Link>
        </div>

        <form onSubmit={handleSubmit}>
          <Input type='text' label='Nome da instituição' {...nome} />
          <Input type='email' label={'Email'} {...email} />
          <Input type='password' label='Senha' {...password} />
          <Input type='password' label='Confirmar Senha' {...confirmPassword} />
          <button>Cadastrar</button>
        </form>
      </div>

    </Container>
  )
}


export default Register;  