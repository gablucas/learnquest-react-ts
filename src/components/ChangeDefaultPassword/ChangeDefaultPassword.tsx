import React from 'react';
import { GlobalContext } from "../../GlobalContext";
import useData from "../../hooks/useData";
import useForm from "../../hooks/useForm";
import Input from "../Inputs/Input";
import Modal from "../Modal";

const ChangeDefaultPassword = () => {
  const { data } = React.useContext(GlobalContext)
  const { getLoggedUser, editPassword } = useData();
  const password = useForm({type: 'password', initialValue: ''});
  const confirmPassword = useForm({type: 'confirmPassword', initialValue: ''});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (password.validate() && confirmPassword.validate() && password.value === confirmPassword.value) {
      e.preventDefault();
      editPassword(password.value)
    }
  }

  if (getLoggedUser()?.password == data?.preferences.defaultPassword)
  return (
    <Modal>
      <h2>Defina uma nova senha</h2>
      <form onSubmit={handleSubmit}>
        <Input type="password" label="Nova senha" {...password} />
        <Input type="password" label="Confirmar nova senha" {...confirmPassword} />
        <button>Salvar nova senha</button>
      </form>
    </Modal>
  )
}

export default ChangeDefaultPassword;