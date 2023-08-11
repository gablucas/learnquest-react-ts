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

      <button onClick={() => testAccount({loginTest: 'admin', passwordTest: 'teste'})}>
        Administrador
      </button>

      <button onClick={() => testAccount({loginTest: 'professor', passwordTest: 'teste'})}>
        Professor
      </button>

      <button onClick={() => testAccount({loginTest: 'aluno', passwordTest: 'teste'})}>Aluno</button>

      <button onClick={resetData}>Desfazer todas ações</button>

      <Link role='link' to='/tutorial'>Saiba como funciona</Link>
    </div>
  )
}

export default TestUsers;