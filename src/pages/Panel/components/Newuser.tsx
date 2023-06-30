import React from 'react';
import Styles from '../Panel.module.css';
import Input from '../../../components/Inputs/Input';
import Select from '../../../components/Inputs/Select';
import useForm, { UseFormType } from '../../../hooks/useForm';
import useRandom from '../../../hooks/useRandom';
import useData from '../../../hooks/useData';
import { GlobalContext } from '../../../GlobalContext';
import { Link } from 'react-router-dom';


type NewuserProps = {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const Newuser = ({ setToggle }: NewuserProps) => {
  const { data } = React.useContext(GlobalContext);
  const { createUser } = useData();
  const { getRandomId } = useRandom();
  const access: UseFormType = useForm();
  const name: UseFormType = useForm();
  const login: UseFormType = useForm();
  const email: UseFormType = useForm();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (access.validate() && login.validate() && access.validate() && name.validate() && email.validate()) {

      if(data) {
        createUser({
          id: getRandomId(),
          access: access.value as 'admin' | 'teacher' | 'student',
          login: login.value,
          email: email.value,
          nome: name.value,
          password: data.preferences.defaultPassword,
          status: 'active',
        })
      }
    }

      setToggle(false);
    }

  

  function handleClose(e: React.MouseEvent<HTMLDivElement>): void {
    if (e.target === e.currentTarget) setToggle(false);
  }

  return (
    <div className={Styles.newuser} onClick={handleClose}>

      <div>
        <h2>Criar novo usuário</h2>
        <form onSubmit={handleSubmit}>
          <Select options={[{option: 'admin', label: 'Administrador'}, {option: 'teacher', label: 'Professor'}, {option: 'student', label: 'Estudante'}]} {...access} />
          <Input type='text' label='Nome' {...name} />
          <Input type='text' label='Login' {...login} />
          <Input type='email' label='Email' {...email} />
          <button>Cadastrar</button>
        </form>

        <span>Será gerado uma senha padrão, veja em <Link to='preferencias'>Preferencias</Link></span>
      </div>

    </div>
  )
}

export default Newuser;