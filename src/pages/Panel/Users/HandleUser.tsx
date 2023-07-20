import React from 'react';
import Input from '../../../components/Inputs/Input';
import Select from '../../../components/Inputs/Select';
import useForm, { UseFormType } from '../../../hooks/useForm';
import useRandom from '../../../hooks/useRandom';
import useData from '../../../hooks/useData';
import { GlobalContext } from '../../../GlobalContext';
import { Link } from 'react-router-dom';
import { IInstituition, IStudent, IUser } from '../../../types/Users';
import Modal from '../../../components/Modal';


type HandleUserProps = {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>,
  userID?: string,
}

const HandleUser = ({ setToggle, userID }: HandleUserProps) => {
  const { data } = React.useContext(GlobalContext);
  const { createUser, editUser } = useData();
  const user = data.users.find((user) => user.id === userID);
  const { getRandomID } = useRandom();

  const access: UseFormType = useForm({type: 'newuser_access', initialValue: ''});
  const name: UseFormType = useForm({type: 'newuser_name', initialValue: user ? user.name : ''});
  const login: UseFormType = useForm({type: 'login', initialValue: user ? user.login : ''});
  const email: UseFormType = useForm({type: 'email', initialValue: user ? user.email: ''});

  const password: UseFormType = useForm({type: 'password', initialValue: user ? user.password : ''});


  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (!userID && access.validate() && login.validate() && access.validate() && name.validate() && email.validate()) {

      const user: IUser = {
        id: `U${getRandomID()}`,
        access: access.value as 'admin' | 'teacher' | 'student',
        login: login.value.toLowerCase(),
        email: email.value.toLowerCase(),
        name: name.value,
        password: (data as IInstituition).preferences.defaultPassword,
        status: true,
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
      
      setToggle(false);
    } else if (userID && name.validate() && login.validate() && email.validate() && password.validate()) {
      editUser(userID, name.value, login.value, email.value, password.value);
      setToggle(false);
    }
  }

  return (
    <Modal setToggle={setToggle}>
      <div>
        <h2>Criar novo usuário</h2>
        <form onSubmit={handleSubmit}>
         {!userID && (<Select options={[{option: 'admin', label: 'Administrador'}, {option: 'teacher', label: 'Professor'}, {option: 'student', label: 'Estudante'}]} {...access} />)}
          <Input type='text' label='name' {...name} />
          <Input type='text' label='Login' {...login} />
          <Input type='email' label='Email' {...email} />
          {userID && (<Input type='text' label='Senha' {...password} />)}
          <button>{!userID ? 'Cadastrar' : 'Atualizar'}</button>
        </form>

        <span>Será gerado uma senha padrão, veja em <Link to='/painel/preferencias'>Preferencias</Link></span>
      </div>
    </Modal>
  )
}

export default HandleUser;