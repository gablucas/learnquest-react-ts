import React from 'react';
import Input from '../../../components/Inputs/Input';
import useForm, { UseFormType } from '../../../hooks/useForm';
import { Link } from 'react-router-dom';
import Modal from '../../../components/Modal';
import { GlobalContext } from '../../../GlobalContext';
import useData from '../../../hooks/useData';


type NewuserProps = {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>,
  userID: string,
}

const EditUser = ({ setToggle, userID }: NewuserProps) => {
  const { data } = React.useContext(GlobalContext);
  const { editUser } = useData();
  const user = data.users.find((user) => user.id === userID);

  const name: UseFormType = useForm(user ? user.nome : '');
  const login: UseFormType = useForm(user ? user.login : '');
  const email: UseFormType = useForm(user ? user.email: '');
  const password: UseFormType = useForm(user ? user.password : '');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (name.validate() && login.validate() && email.validate() && password.validate()) {
      editUser(userID, name.value, login.value, email.value, password.value);
      setToggle(false);
    }
  }

  return (
    <Modal setToggle={setToggle}>
      <div>
        <h2>Criar novo usuário</h2>
        <form onSubmit={handleSubmit}>
          <Input type='text' label='Nome' {...name} />
          <Input type='text' label='Login' {...login} />
          <Input type='email' label='Email' {...email} />
          <Input type='text' label='Senha' {...password} />
          <button>Cadastrar</button>
        </form>

        <span>Será gerado uma senha padrão, veja em <Link to='/painel/preferencias'>Preferencias</Link></span>
      </div>
    </Modal>
  )
}

export default EditUser;