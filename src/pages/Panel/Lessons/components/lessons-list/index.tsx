import React from 'react';
import Panel from '../../../Panel.module.css';
import { useHelpers } from "../../../../../hooks/useHelpers";
import { GlobalContext } from '../../../../../GlobalContext';
import { ILesson } from '../../../../../types/Lessons';
import MoreInfo from '../../../../../components/Icons/MoreInfo';
import EditIcon from '../../../../../components/Icons/EditIcon';
import DeleteIcon from '../../../../../components/Icons/DeleteIcon';
import { IStudent } from '../../../../../types/Users';
import { useNavigate } from 'react-router-dom';
import { MobileInfoData } from '../../../../../types/Commom';
import { getLoggedUser } from '../../../../../helpers/user/getLoggedUser';
import { getUser } from '../../../../../helpers/user/getUser';
import { getSubject } from '../../../../../helpers/subject/getSubject';
import { useLesson } from '../../../../../hooks/useLesson';

interface ILessonsListProps {
  setMobileInfo: React.Dispatch<React.SetStateAction<MobileInfoData[]>>,
}

const LessonsList = ({ setMobileInfo }: ILessonsListProps) => {
  const { data, filter, setToggle, setConfirm } = React.useContext(GlobalContext);
  const { isArrayEmpty, arrayIncludes } = useHelpers();
  const { deleteLesson } = useLesson();

  const navigate = useNavigate();
  const loggedUser = getLoggedUser();


  let lessons = loggedUser?.access === 'admin' ? data.lessons : data.lessons.filter((lesson) => lesson.createdby === loggedUser?.id)
  if (!isArrayEmpty(filter.subject)) lessons = lessons.filter((lesson) => arrayIncludes(filter.subject, lesson.subject));
  if (!isArrayEmpty(filter.createdby)) lessons = lessons.filter((lesson) => arrayIncludes(filter.createdby, lesson.createdby));


  function handleEdit(id: string): void {
    if (data.users.some((user) => user.access === 'student' && (user as IStudent).lessons.some((lesson) => lesson.id === id))) {
      setConfirm({type: 'message', text: 'Não é mais possível editar essa aula, pois ela já foi finalizada por um ou mais alunos'})
    } else {
      navigate(`editar/${id}`);
    }
  }

  function handleRemove(lessonID: string): void {
    setToggle('confirm');
    setConfirm({type: 'confirm', text: 'A exclusão desta aula também removerá de todos os alunos que já a concluíram, incluindo a XP ganha também. Deseja excluir mesmo assim?', action: () => deleteLesson(lessonID)})
  }

  function handleMobileInfo(lesson: ILesson): void {
    const title = {title: 'Nome', description: lesson.title};
    const createdby = {title: 'Criado por', description: getUser(lesson.createdby)?.name || ''};
    const subject = {title: 'Matéria', description: getSubject(lesson.subject)?.name || ''};
    const questions = {title: 'Questões', description: lesson.task.length};

    setMobileInfo([title, createdby, subject, questions]);
    setToggle('mobile');
  }

  return (
    <>
      {lessons.map((lesson) => (
        <div key={lesson.id} className={Panel.lesson}>
          <span>{lesson.title}</span>
          <span>{getUser(lesson.createdby)?.name}</span>
          <span>{getSubject(lesson.subject)?.name}</span>
          <span>{lesson.status === 'active' ? 'Ativada' : 'Desativada'}</span>
          <button className={Panel.mobile} onClick={() => handleMobileInfo(lesson)}><MoreInfo /></button>
          <button onClick={() => handleEdit(lesson.id)}><EditIcon /></button>
          <button onClick={() => handleRemove(lesson.id)}><DeleteIcon /></button>
        </div>
      ))}
    </>
  )
}

export default LessonsList;