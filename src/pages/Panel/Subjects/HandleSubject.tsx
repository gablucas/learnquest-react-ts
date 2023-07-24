import React from 'react';
import Styles from './Subjects.module.css';
import Input from '../../../components/Inputs/Input';
import useForm, { UseFormType } from '../../../hooks/useForm';
import useData from '../../../hooks/useData';
import { GlobalContext } from '../../../GlobalContext';
import Modal from '../../../components/Modal';
import useRandom from '../../../hooks/useRandom';
import Select from '../../../components/Inputs/Select';
import { Status } from '../../../types/Commom';

type HandleSubjectProps = {
  subjectID?: string,
}

const HandleSubject = ({ subjectID }: HandleSubjectProps) => {
  const { data, setToggle } = React.useContext(GlobalContext);
  const { getRandomID } = useRandom();
  const { createSubject, editSubject } = useData();
  
  const subject = data.subjects.find((subject) => subject.id === subjectID);

  const name: UseFormType = useForm({type: 'subject', initialValue: subject ? subject.name : ''});
  const status: UseFormType = useForm({type: 'status', initialValue: subject ? subject.status : ''});


  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (name.validate()) {
      if(!subjectID && data) {
        createSubject({id: `S${getRandomID()}`, name: name.value, status: 'active'});
      } else if (subjectID) {
        editSubject(subjectID, {id: subjectID, name: name.value, status: status.value as Status});
      }

      setToggle('none');
    }
  }

  return (
    <Modal>
      <div className={Styles.container}>
        <div>
          <h2>{subjectID ? 'Editar' : 'Criar nova'} matéria</h2>
          <button onClick={() => setToggle('none')}>Fechar</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Input type='text' label='Matéria' {...name} />
          {subjectID && (<Select label='Estado' options={[{name: 'Ativo', value: 'active'}, {name: 'Desativo', value: 'disable'}]} {...status} />)}
          <button>{!subjectID ? 'Cadastrar' : 'Atualizar'}</button>
        </form>
      </div>
    </Modal>
  )
}

export default HandleSubject;