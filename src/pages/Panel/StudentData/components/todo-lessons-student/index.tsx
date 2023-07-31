import React from 'react';
import Panel from '../../../Panel.module.css';
import Styles from '../../StudentData.module.css';
import Expand from '../../../../../components/Icons/Contract';
import Contract from '../../../../../components/Icons/Expand';
import useToggle from '../../../../../hooks/useToggle';
import { MobileInfoData } from '../../../../../types/Commom';
import { ILesson, TaskStudent } from '../../../../../types/Lessons';
import MoreInfo from '../../../../../components/Icons/MoreInfo';
import { GlobalContext } from '../../../../../GlobalContext';
import useData from '../../../../../hooks/useData';

interface ITodoLessonsStudentProps {
  setMobileInfo: React.Dispatch<React.SetStateAction<MobileInfoData[]>>,
  lessonsTodo: ILesson[],
}

const TodoLessonsStudent = ({ setMobileInfo, lessonsTodo }: ITodoLessonsStudentProps) => {
  const { setToggle } = React.useContext(GlobalContext);
  const { getUser, getLesson, getSubject } = useData();
  const todolesson = useToggle();

  function handleMobileInfo(lesson: TaskStudent | ILesson): void {
    const createdby = {title: 'Criado por', description: getUser(getLesson(lesson.id)?.createdby as string)?.name || ''};
    const subject = {title: 'Matéria', description: getSubject(getLesson(lesson.id)?.subject as string)?.name || ''};
    const questions = {title: 'Questões', description: ((lesson as ILesson).task.length)};
    setMobileInfo([createdby, subject, questions]);
  
    setToggle('mobile');
  }

  return (
    <div className={Styles.lessons_container}>

      <div className={Styles.lessons_title} onClick={todolesson.handleToggle}>
        <h2>Tarefas a fazer</h2>
        {todolesson.toggle ? <Contract /> : <Expand />}
      </div>

      {todolesson.toggle && 
        (<>
          <div className={Styles.lessons_todo}>
            <span>Aula</span>
            <span className={Panel.mobile}>Informações</span>
            <span>Criado por</span>
            <span>Matéria</span>
            <span>Questões</span>
          </div>

          <div>
            {lessonsTodo && lessonsTodo.map((lesson) => (
              <div className={Styles.lessons_todo} key={lesson.id}>
                <span>{lesson.title}</span>
                <button className={Panel.mobile} onClick={() => handleMobileInfo(lesson)} ><MoreInfo /></button>
                <span>{getUser(lesson.createdby)?.name}</span>
                <span>{getSubject(lesson.subject)?.name}</span>
                <span>{lesson.task.length}</span>
              </div>
            ))}
          </div>
      </>)}
    </div>
  )
}

export default TodoLessonsStudent;