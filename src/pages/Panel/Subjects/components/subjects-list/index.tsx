import React from 'react';
import Panel from '../../../Panel.module.css';
import { GlobalContext } from "../../../../../GlobalContext";
import { MobileInfoData, Subject } from "../../../../../types/Commom";
import EditIcon from '../../../../../components/Icons/EditIcon';
import MoreInfo from '../../../../../components/Icons/MoreInfo';
import DeleteIcon from '../../../../../components/Icons/DeleteIcon';
import { useSubject } from '../../../../../hooks/useSubject';

interface ISubjectsList {
  subjects: Subject[],
  setSubjectID: React.Dispatch<React.SetStateAction<string>>,
  setMobileInfo: React.Dispatch<React.SetStateAction<MobileInfoData[]>>,
}

const SubjectsList = ({ subjects, setSubjectID, setMobileInfo }: ISubjectsList) => {
  const { data, setConfirm, setToggle } = React.useContext(GlobalContext);
  const { deleteSubject } = useSubject();

  function getLessonsPerSubject(id: string): number {
    return data.lessons.map((lesson) => lesson.subject === id).length
  }

  function handleDeleteSubject(id: string): void {
    setToggle('confirm');
    setConfirm({type: 'confirm', text: 'Deseja realmente excluir está matéria?', action: () => deleteSubject(id)});
  }

  function handleEdit(id: string): void {
    setSubjectID(id);
    setToggle('edit');
  }

  function handleMobileInfo(subject: Subject): void {
    const name = {title: 'Nome', description: subject.name};
    const lessons = {title: 'Aulas', description: getLessonsPerSubject(subject.id)};
    const status = {title: 'Estado', description: subject.status ? 'Ativado' : 'Desativado'};

    setMobileInfo([name, lessons, status]);
    setToggle('mobile');
  }

  return (
    <>
      {subjects.map((subject) => (
        <div key={subject.id} className={Panel.subject}>
          <span>{subject.name}</span>
          <span>{getLessonsPerSubject(subject.id)}</span>
          <span>{subject.status === 'active' ? 'Ativado' : 'Desativado'}</span>
          <button className={Panel.mobile} onClick={() => handleMobileInfo(subject)} ><MoreInfo /></button>
          <button onClick={() => handleEdit(subject.id)}><EditIcon /></button>
          <button onClick={() => handleDeleteSubject(subject.id)}><DeleteIcon /></button>
        </div>
      ))}
    </>
  )
}

export default SubjectsList;