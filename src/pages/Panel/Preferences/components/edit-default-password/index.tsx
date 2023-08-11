import React from 'react';
import Styles from '../../Preferences.module.css';
import Input from "../../../../../components/Inputs/Input";
import Modal from "../../../../../components/Modal";
import useForm from "../../../../../hooks/useForm";
import useData from '../../../../../hooks/useData';

type EditDefaultPasswordProps = {
  handleToggle: () => void,
}

const EditDefaultPassword = ({ handleToggle }: EditDefaultPasswordProps) => {
  const { editDefaultPassword } = useData();
  const editPassword = useForm({type: 'defaultPassword', initialValue: ''});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (editPassword.validate()) {
      editDefaultPassword(editPassword.value);
      handleToggle();
    }
  }

  return (
    <Modal handleToggle={handleToggle}>
      <div className={Styles.editpassword}>
        <div>
          <h2>Senha padrão</h2>
          <button onClick={handleToggle}>Fechar</button>
        </div>
        <form onSubmit={handleSubmit}>
          <Input id='change_default_password' type="text" label="Alterar senha padrão" {...editPassword}/>
          <button>Salvar nova senha</button>
        </form>
      </div>
    </Modal>
  )
}

export default EditDefaultPassword;