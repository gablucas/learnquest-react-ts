import React from 'react';
import Input from '../../../components/Inputs/Input';
import Select from '../../../components/Inputs/Select';
import useForm, { UseFormType } from '../../../hooks/useForm';
import useRandom from '../../../hooks/useRandom';
import useUsers, { IInstituition } from '../../../hooks/useUsers';
import Styles from '../Panel.module.css';
import { Link } from 'react-router-dom';
import useData from '../../../hooks/useData';
import { GlobalContext } from '../../../GlobalContext';

type NewuserProps = {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const Newuser = ({ setToggle }: NewuserProps) => {
  const { myData } = React.useContext(GlobalContext)
  const { createUser } = useData();

  const users = useUsers();
  const random = useRandom();
  const access: UseFormType = useForm();
  const name: UseFormType = useForm();
  const email: UseFormType = useForm();


  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (access.validate() && name.validate() && email.validate()) {
      if (access.value === 'teacher') {
        createUser({
          id: random.getRandomId(),
          access: access.value,
          nome: name.value,
          email: email.value,
          instituition: users.loggedUser(),
          password: (myData as IInstituition).preferences.defaultPassword,
          status: 'active',
        })

      } else if (access.value === 'student') {
        createUser({
          id: random.getRandomId(),
          access: access.value,
          nome: name.value,
          email: email.value,
          instituition: users.loggedUser(),
          password: (myData as IInstituition).preferences.defaultPassword,
          status: 'active',
        })
      }

      setToggle(false);
    }

  }

  function handleClose(e: React.MouseEvent<HTMLDivElement>): void {
    if (e.target === e.currentTarget) setToggle(false);
  }

  return (
    <div className={Styles.newuser} onClick={handleClose}>

      <div>
        <h2>Criar novo usuário</h2>
        <form onSubmit={handleSubmit}>
          <Select options={['Teacher', 'Student']} {...access} />
          <Input type='text' label='Nome' {...name} />
          <Input type='email' label='Email' {...email} />
          <button>Cadastrar</button>
        </form>

        <span>Será gerado uma senha padrão, veja em <Link to='preferencias'>Preferencias</Link></span>
      </div>

    </div>
  )
}

export default Newuser;