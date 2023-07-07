import React from 'react';
import Input from "../../../components/Inputs/Input";
import Modal from "../../../components/Modal";
import useForm from "../../../hooks/useForm";
import useData from '../../../hooks/useData';

type EditDefaultPasswordProps = {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const EditDefaultPassword = ({ setToggle }: EditDefaultPasswordProps) => {
  const { editDefaultPassword } = useData();
  const editPassword = useForm('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (editPassword.validate()) {
      editDefaultPassword(editPassword.value);
      setToggle(false);
    }
  }

  return (
    <Modal setToggle={setToggle}>
      <form onSubmit={handleSubmit}>
        <Input type="text" label="Alterar senha padrão" {...editPassword}/>
        <button>Salvar nova senha</button>
      </form>
    </Modal>
  )
}

export default EditDefaultPassword;