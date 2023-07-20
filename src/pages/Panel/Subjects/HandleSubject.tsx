import React from 'react';
import Styles from './Subjects.module.css';
import Input from '../../../components/Inputs/Input';
import useForm, { UseFormType } from '../../../hooks/useForm';
import useData from '../../../hooks/useData';
import { GlobalContext } from '../../../GlobalContext';
import Modal from '../../../components/Modal';
import useRandom from '../../../hooks/useRandom';

type HandleSubjectProps = {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>,
  subjectID?: string,
}

const HandleSubject = ({ setToggle, subjectID }: HandleSubjectProps) => {
  const { data } = React.useContext(GlobalContext);
  const { getRandomID } = useRandom();
  const { createSubject, editSubject } = useData();
  const subject: UseFormType = useForm({type: 'subject', initialValue: data.subjects.find((subject) => subject.id === subjectID)?.name || ''});


  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (subject.validate()) {
      if(!subjectID && data) {
        createSubject({id: `S${getRandomID()}`, name: subject.value, status: true})
      } else if (subjectID) {
        editSubject(subjectID, {id: subjectID, name: subject.value, status: true})
      }

      setToggle(false);
    }
  }

  return (
    <Modal setToggle={setToggle}>
      <div className={Styles.container}>
        <div>
          <h2>{subjectID ? 'Editar' : 'Criar nova'} matéria</h2>
          <button onClick={() => setToggle(false)}>Fechar</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Input type='text' label='Matéria' {...subject} />
          <button>{!subjectID ? 'Cadastrar' : 'Atualizar'}</button>
        </form>
      </div>
    </Modal>
  )
}

export default HandleSubject;