import React from 'react';
import Panel from '../../../Panel.module.css';
import { GlobalContext } from "../../../../../GlobalContext";
import { Subject } from "../../../../../types/Commom";
import { ButtonEditSubject } from '../button-edit-subject';
import { ButtonDeleteSubject } from '../button-delete-subject';
import { ButtonMobileInfo } from '../../../../../components/button-mobile-info';

interface ISubjectsList {
  subjects: Subject[],
}

const SubjectsList = ({ subjects }: ISubjectsList) => {
  const { data } = React.useContext(GlobalContext);

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