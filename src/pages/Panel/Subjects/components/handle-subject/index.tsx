import React from 'react';
import Panel from '../../../Panel.module.css';
import Styles from './HandleSubject.module.css';
import Input from '../../../../../components/Inputs/Input';
import useForm, { UseFormType } from '../../../../../hooks/useForm';
import Modal from '../../../../../components/Modal';
import Select from '../../../../../components/Inputs/Select';
import { GlobalContext } from '../../../../../GlobalContext';
import { Status } from '../../../../../types/Commom';
import { generateRandomID } from '../../../../../utils/generateRandomID';
import { useSubject } from '../../../../../hooks/useSubject';

type HandleSubjectProps = {
  subjectID?: string,
  handleToggle: () => void,
}

const HandleSubject = ({ subjectID, handleToggle }: HandleSubjectProps) => {
  const { data, setToggle } = React.useContext(GlobalContext);
  const { createSubject, editSubject } = useSubject();
  
  const subjectToEdit = data.subjects.find((subject) => subject.id === subjectID);

  const [teachers, setTeachers] = React.useState<string[]>(subjectToEdit ? subjectToEdit.teachers : []);

  const name: UseFormType = useForm({type: 'subject', initialValue: subjectToEdit ? subjectToEdit.name : ''});
  const status: UseFormType = useForm({type: 'status', initialValue: subjectToEdit ? subjectToEdit.status : ''});

  function handleTeacher(e: React.ChangeEvent<HTMLInputElement>, teacherID: string): void {
    if (e.target.checked) {
      setTeachers([...teachers, teacherID]);
    } else {
      setTeachers(teachers.filter((teacher) => teacher !== teacherID))
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (name.validate()) {
      const subject = {
        id: subjectToEdit ? subjectToEdit.id : `S${generateRandomID()}`,
        name: name.value,
        teachers,
        status: subjectToEdit ? status.value as Status : 'active',
      }

      if(!subjectID && data) {
        createSubject(subject);
      } else if (subjectID) {
        editSubject(subjectID, subject);
      }

      setToggle('none');
    }
  }

  return (
    <Modal handleToggle={handleToggle}>
      <div className={Styles.container}>
        <div>
          <h2>{subjectID ? 'Editar' : 'Criar nova'} matéria</h2>
          <button onClick={handleToggle}>Fechar</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Input type='text' label='Matéria' {...name} />

          <div>
            <span>Adicionar professores a matéria</span>
            <div className={Panel.selectusers}>
              {data.users.map((user) => user.access === 'teacher' && (
                <div key={user.id}>
                  <input type='checkbox' checked={teachers.some((teacher) => teacher === user.id)} onChange={(e) => handleTeacher(e, user.id)}/>
                  <label>{user.name}</label>
                </div>
              ))}
            </div>
          </div>

          {subjectID && (<Select label='Estado' options={[{name: 'Ativo', value: 'active'}, {name: 'Desativo', value: 'disable'}]} {...status} />)}
          <button>{!subjectID ? 'Cadastrar' : 'Atualizar'}</button>
        </form>
      </div>
    </Modal>
  )
}

export default HandleSubject;