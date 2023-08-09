import React from 'react';
import Panel from '../../../Panel.module.css';
import { useHelpers } from "../../../../../hooks/useHelpers";
import { GlobalContext } from '../../../../../GlobalContext';
import { getLoggedUser } from '../../../../../helpers/user/getLoggedUser';
import { getUser } from '../../../../../helpers/user/getUser';
import { getSubject } from '../../../../../helpers/subject/getSubject';
import { ButtonMobileInfo } from '../../../../../components/button-mobile-info';
import { ButtonDeleteLesson } from '../button-delete-lesson';
import { ButtonEditLesson } from '../button-edit-lesson';

const LessonsList = () => {
  const { data, filter } = React.useContext(GlobalContext);
  const { isArrayEmpty, arrayIncludes } = useHelpers();
  const loggedUser = getLoggedUser();

  let lessons = loggedUser?.access === 'admin' ? data.lessons : data.lessons.filter((lesson) => lesson.createdby === loggedUser?.id)
  if (!isArrayEmpty(filter.subject)) lessons = lessons.filter((lesson) => arrayIncludes(filter.subject, lesson.subject));
  if (!isArrayEmpty(filter.createdby)) lessons = lessons.filter((lesson) => arrayIncludes(filter.createdby, lesson.createdby));

  return (
    <>
      {lessons.map((lesson) => (
        <div key={lesson.id} className={Panel.lesson}>
          <span>{lesson.title}</span>
          <span>{getUser(lesson.createdby)?.name}</span>
          <span>{getSubject(lesson.subject)?.name}</span>
          <span>{lesson.status === 'active' ? 'Ativada' : 'Desativada'}</span>
          <ButtonMobileInfo info={[['Nome', lesson.title], ['Criado por', getUser(lesson.createdby)?.name || ''], ['Matéria', getSubject(lesson.subject)?.name || ''], ['Questões', lesson.task.length]]} />
          <ButtonEditLesson lessonID={lesson.id} />
          <ButtonDeleteLesson lessonID={lesson.id} />
        </div>
      ))}
    </>
  )
}

export default LessonsList;