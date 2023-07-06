import React from 'react';
import Styles from '../Panel.module.css';
import Input from '../../../components/Inputs/Input';
import useForm, { UseFormType } from '../../../hooks/useForm';
import useData from '../../../hooks/useData';
import { GlobalContext } from '../../../GlobalContext';

type Newsubjectprops = {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const Newsubject = ({ setToggle }: Newsubjectprops) => {
  const { data } = React.useContext(GlobalContext);
  const { createSubject } = useData();
  const materia: UseFormType = useForm();


  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (materia.validate()) {
      if(data) {
        createSubject(materia.value)
        setToggle(false);
      }
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
          <Input type='text' label='Matéria' {...materia} />
          <button>Cadastrar</button>
        </form>

      </div>

    </div>
  )
}

export default Newsubject;