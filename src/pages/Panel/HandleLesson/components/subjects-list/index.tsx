import React from 'react';
import Styles from '../../HandleLesson.module.css';
import useValidate from '../../../../../hooks/useValidate';
import Error from '../../../../../components/Helper/Error';
import { getLoggedUserSubjects } from '../../../../../helpers/subject/getLoggedUserSubjects';

interface ISubjectsListProps {
  subject: string,
  setSubject: React.Dispatch<React.SetStateAction<string>>,
}

const SubjectsList = ({ subject, setSubject}: ISubjectsListProps) => {
  const { error } = useValidate();
  const userSubjects = getLoggedUserSubjects();

  function handleSubject(e: React.ChangeEvent<HTMLSelectElement>): void {
    setSubject(e.target.value)
  }

  return (
    <div className={Styles.subjects}>
      <h2>Matéria</h2>
      <select value={subject} onChange={handleSubject}>
        {userSubjects.length > 0 ? (<option value=''>Selecione uma matéria</option>) : (<option value=''>Sem máteria criada, ativa ou vinculada</option>)}
        {userSubjects.map((sub) => (
          <option key={sub.id} value={sub.id}>{sub.name}</option>
        ))}
      </select>
      {error === 'subject' && (<Error>Selecione uma matéria</Error>)}
    </div>
  )
}

export default SubjectsList;