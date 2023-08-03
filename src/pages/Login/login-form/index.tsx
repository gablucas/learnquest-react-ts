import Input from '../../../components/Inputs/Input';
import useData from '../../../hooks/useData';
import { UseFormType } from '../../../hooks/useForm';
import Styles from '../Login.module.css';

interface ILoginFormProps {
  login: UseFormType,
  password: UseFormType
}

const LoginForm = ({ login, password }: ILoginFormProps) => {

  const { authUser } = useData();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (login.validate() && password.validate()) {
      authUser(login.value, password.value, password.setError)
    }
  }

  return (
    <div className={Styles.login}>
      <h1>Faça o login</h1>
      <form role='form' onSubmit={handleSubmit}>
        <Input type='text' label='Login' {...login} />
        <Input type='password' label='Senha' {...password} />
        <button>Entrar</button>
      </form>
    </div>
  )
}

export default LoginForm;