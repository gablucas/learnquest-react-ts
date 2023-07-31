import { Link } from 'react-router-dom';
import { UseFormType } from '../../../hooks/useForm';
import Styles from '../Login.module.css';

interface ITestUsersProps {
  login: UseFormType,
  password: UseFormType
}

interface ITestAccountProps {
  loginTest: string,
  passwordTest: string,
}


const TestUsers = ({ login, password }: ITestUsersProps) => {

  function testAccount({loginTest, passwordTest}: ITestAccountProps): void {
    login.setValue(loginTest);
    password.setValue(passwordTest);
  }

  function resetData(): void {
    localStorage.removeItem('data');
    localStorage.removeItem('logged');
    window.location.reload();
  }

  return (
    <div className={Styles.test}>
      <h2>Contas para teste</h2>
      <span>Selecione para preencher automaticamente</span>

      <div onClick={() => testAccount({loginTest: 'admin', passwordTest: 'teste'})}>
        <span>Administrador</span>
        {/* <span>Login: admin</span>
        <span>Senha: teste</span> */}
      </div>

      <div onClick={() => testAccount({loginTest: 'professor', passwordTest: 'teste'})}>
        <span>Professor</span>
        {/* <span>Login: professor </span>
        <span>Senha: teste</span> */}
      </div>

      <div onClick={() => testAccount({loginTest: 'aluno', passwordTest: 'teste'})}>
        <span>Aluno</span>
        {/* <span>Login: aluno</span>
        <span>Senha: teste</span> */}
      </div>

      <div onClick={resetData}>
        <span>Defazer todas ações</span>
      </div>

      <Link to='/tutorial'>Saiba como funciona</Link>
    </div>
  )
}

export default TestUsers;