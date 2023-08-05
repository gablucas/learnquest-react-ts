import React from 'react';
import Styles from './HandleUser.module.css';
import Input from '../../../../../components/Inputs/Input';
import Select from '../../../../../components/Inputs/Select';
import useForm, { UseFormType } from '../../../../../hooks/useForm';
import { GlobalContext } from '../../../../../GlobalContext';
import { Link } from 'react-router-dom';
import { IInstituition, IStudent, IUser } from '../../../../../types/Users';
import Modal from '../../../../../components/Modal';
import { Status } from '../../../../../types/Commom';
import { useUser } from '../../../../../hooks/useUser';
import { generateRandomID } from '../../../../../utils/generateRandomID';


type HandleUserProps = {
  userID?: string,
}

const HandleUser = ({ userID }: HandleUserProps) => {
  const { data, setToggle } = React.useContext(GlobalContext);
  const { createUser, editUser } = useUser();
  const user = data.users.find((user) => user.id === userID);

  const access: UseFormType = useForm({type: 'access', initialValue: ''});
  const name: UseFormType = useForm({type: 'name', initialValue: user ? user.name : ''});
  const login: UseFormType = useForm({type: userID ? 'edit_login' : 'login', initialValue: user ? user.login : ''});
  const email: UseFormType = useForm({type: userID ? 'edit_email' : 'email', initialValue: user ? user.email: ''});

  const password: UseFormType = useForm({type: 'password', initialValue: user ? user.password : ''});
  const status: UseFormType = useForm({type: 'selected', initialValue: user?.status || ''})


  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (!userID && access.validate() && login.validate() && access.validate() && name.validate() && email.validate()) {

      const user: IUser = {
        id: `U${generateRandomID()}`,
        access: access.value as 'admin' | 'teacher' | 'student',
        login: login.value.toLowerCase(),
        email: email.value.toLowerCase(),
        name: name.value,
        password: (data as IInstituition).preferences.defaultPassword,
        status: 'active',
      }

      if(access.value === 'student') {
        const student: IStudent = {
          ...user,
          level: 1,
          xp: 0,
          lessons: [],
        }
        createUser(student);
      } else {
        createUser(user);
      }
      
      setToggle('none');
    } else if (userID && name.validate() && login.validate() && email.validate() && password.validate() && status.validate()) {
      editUser(userID, name.value, login.value, email.value, password.value, status.value as Status);
      setToggle('none');
    }
  }

  return (
    <Modal>
      <div className={Styles.container}>
        <div>
          <h2>{userID ? 'Editar': 'Criar novo'} usuário</h2>
          <button onClick={() => setToggle('none')}>Fechar</button>
        </div>
        
        <form onSubmit={handleSubmit}>
         {!userID && (<Select label='Acesso' options={[{ name: 'Administrador', value: 'admin'}, { name: 'Professor', value: 'teacher'}, { name: 'Estudante', value: 'student'}]} {...access} />)}
          <Input type='text' label='Nome' {...name} />
          <Input type='text' label='Login' {...login} />
          <Input type='email' label='Email' {...email} />
          {userID && (<Input type='text' label='Senha' {...password} />)}
          {userID && (<Select label='Estado' options={[{name: 'Ativo', value: 'active'}, {name: 'Desativo', value: 'disable'}]} {...status} />)}
          <button>{!userID ? 'Cadastrar' : 'Atualizar'}</button>
        </form>

        {!userID && (<span className={Styles.passwordnotice}>Será gerado uma senha padrão, veja em <Link to='/painel/preferencias'>Preferencias</Link></span>)}
      </div>
    </Modal>
  )
}

export default HandleUser;