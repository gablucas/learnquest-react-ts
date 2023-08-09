import React from 'react';
import Panel from '../../../Panel.module.css';
import { GlobalContext } from "../../../../../GlobalContext";
import { ButtonEditSubject } from '../button-edit-subject';
import { ButtonDeleteSubject } from '../button-delete-subject';
import { ButtonMobileInfo } from '../../../../../components/button-mobile-info';
import { useHelpers } from '../../../../../hooks/useHelpers';


const SubjectsList = () => {
  const { data, filter } = React.useContext(GlobalContext)
  const { isArrayEmpty, arrayIncludes } = useHelpers();
  
  let subjects = data.subjects;
  if (!isArrayEmpty(filter.subject)) subjects = subjects.filter((subject) => arrayIncludes(filter.subject, subject.id));
  if (!isArrayEmpty(filter.status)) subjects = subjects.filter((subject) => arrayIncludes(filter.status, subject.status));

  function getLessonsPerSubject(id: string): number {
    return data.lessons.map((lesson) => lesson.subject === id).length
  }

  return (
    <>
      {subjects.map((subject) => (
        <div key={subject.id} className={Panel.subject}>
          <span>{subject.name}</span>
          <span>{getLessonsPerSubject(subject.id)}</span>
          <span>{subject.status === 'active' ? 'Ativado' : 'Desativado'}</span>
          <ButtonMobileInfo info={[['Nome', subject.name], ['Aulas', getLessonsPerSubject(subject.id)], ['Estado', subject.status ? 'Ativado' : 'Desativado']]} />
          <ButtonEditSubject subjectID={subject.id} />
          <ButtonDeleteSubject subjectID={subject.id} />
        </div>
      ))}
    </>
  )
}

export default SubjectsList;