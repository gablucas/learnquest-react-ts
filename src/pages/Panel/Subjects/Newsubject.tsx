import React from 'react';
import Styles from '../Panel.module.css';
import Input from '../../../components/Inputs/Input';
import useForm, { UseFormType } from '../../../hooks/useForm';
import useData from '../../../hooks/useData';
import { GlobalContext } from '../../../GlobalContext';
import Modal from '../../../components/Modal';

type Newsubjectprops = {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const Newsubject = ({ setToggle }: Newsubjectprops) => {
  const { data } = React.useContext(GlobalContext);
  const { createSubject } = useData();
  const materia: UseFormType = useForm('');


  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (materia.validate()) {
      if(data) {
        createSubject(materia.value)
        setToggle(false);
      }
    }
  }

  return (
    <Modal setToggle={setToggle}>
      <div className={Styles.newuser}>
        <h2>Criar nova matéria</h2>
        <form onSubmit={handleSubmit}>
          <Input type='text' label='Matéria' {...materia} />
          <button>Cadastrar</button>
        </form>
      </div>
    </Modal>
  )
}

export default Newsubject;