import React from 'react';
import { GlobalContext } from "../../GlobalContext";
import useForm from "../../hooks/useForm";
import Input from "../Inputs/Input";
import Modal from "../Modal";
import { getLoggedUser } from '../../helpers/user/getLoggedUser';
import { useUser } from '../../hooks/useUser';

const ChangeDefaultPassword = () => {
  const { data } = React.useContext(GlobalContext)
  const { changeUserPassword } = useUser();

  const password = useForm({type: 'password', initialValue: ''});
  const confirmPassword = useForm({type: 'confirmPassword', initialValue: ''});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (password.validate() && confirmPassword.validate() && password.value === confirmPassword.value) {
      e.preventDefault();
      changeUserPassword(password.value);
    }
  }

  if (getLoggedUser()?.password == data?.preferences.defaultPassword)
  return (
    <Modal handleToggle={() => null}>
      <h2>Defina uma nova senha</h2>
      <form onSubmit={handleSubmit}>
        <Input id='new_password' type="password" label="Nova senha" {...password} />
        <Input id='confirm_new_password' type="password" label="Confirmar nova senha" {...confirmPassword} />
        <button>Salvar nova senha</button>
      </form>
    </Modal>
  )
}

export default ChangeDefaultPassword;