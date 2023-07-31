import React from 'react';
import Input from "../../../../../components/Inputs/Input";
import Modal from "../../../../../components/Modal";
import useForm from "../../../../../hooks/useForm";
import useData from '../../../../../hooks/useData';
import { GlobalContext } from '../../../../../GlobalContext';


const EditDefaultPassword = () => {
  const { setToggle } = React.useContext(GlobalContext)
  const { editDefaultPassword } = useData();
  const editPassword = useForm({type: 'defaultPassword', initialValue: ''});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (editPassword.validate()) {
      editDefaultPassword(editPassword.value);
      setToggle('none');
    }
  }

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <Input type="text" label="Alterar senha padrão" {...editPassword}/>
        <button>Salvar nova senha</button>
      </form>
    </Modal>
  )
}

export default EditDefaultPassword;