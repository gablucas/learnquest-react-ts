import Expand from '../../../../../components/Icons/Contract';
import Contract from '../../../../../components/Icons/Expand';
import useToggle from '../../../../../hooks/useToggle';
import Styles from '../../StudentData.module.css'
import Panel from '../../../Panel.module.css';
import { IStudent } from '../../../../../types/Users';
import { ILesson, TaskStudent } from '../../../../../types/Lessons';
import { useContext } from 'react';
import { GlobalContext } from '../../../../../GlobalContext';
import { MobileInfoData } from '../../../../../types/Commom';
import MoreInfo from '../../../../../components/Icons/MoreInfo';
import { getUser } from '../../../../../helpers/user/getUser';
import { getLesson } from '../../../../../helpers/lesson/getLesson';
import { getSubject } from '../../../../../helpers/subject/getSubject';
import { counterQuestionsBy } from '../../../../../helpers/lesson/counterQuestionsBy';

interface IDoneLessonsStudentProps {
  student: IStudent,
  setMobileInfo: React.Dispatch<React.SetStateAction<MobileInfoData[]>>,
}

const DoneLessonsStudent = ({ student, setMobileInfo }: IDoneLessonsStudentProps) => {
  const { setToggle } = useContext(GlobalContext);
  const donelesson = useToggle();

  function handleMobileInfo(lesson: TaskStudent | ILesson): void {
    const createdby = {title: 'Criado por', description: getUser(getLesson(lesson.id)?.createdby as string)?.name || ''};
    const subject = {title: 'Matéria', description: getSubject(getLesson(lesson.id)?.subject as string)?.name || ''};
    const questions = {title: 'Questões', description: ((lesson as TaskStudent).answers.length)};
    const correct = {title: 'Corretas', description: counterQuestionsBy('correct', lesson as TaskStudent)};
    const wrong = {title: 'Erradas', description: counterQuestionsBy('wrong', lesson as TaskStudent)};
    setMobileInfo([createdby, subject, questions, correct, wrong]);
    setToggle('mobile');
  }


  if (student)
  return (
    <div className={Styles.lessons_container}>
      <div className={Styles.lessons_title} onClick={donelesson.handleToggle}>
        <h2>Tarefas realizadas</h2>
        {donelesson.toggle? <Contract /> : <Expand />}
      </div>

      {donelesson.toggle && 
        (<>
          <div className={Styles.lessons_done}>
            <span>Aula</span>
            <span className={Panel.mobile}>Informações</span>
            <span>Criado por</span>
            <span>Matéria</span>
            <span>Questões</span>
            <span>Corretas</span>
            <span>Erradas</span>
          </div>

          <div>
            {student.lessons.map((lesson) => (
              <div className={Styles.lessons_done} key={lesson.id}>
                <span>{getLesson(lesson.id)?.title}</span>
                <button className={Panel.mobile} onClick={() => handleMobileInfo(lesson)} ><MoreInfo /></button>
                <span>{getUser(getLesson(lesson.id)?.createdby as string)?.name}</span>
                <span>{getSubject(getLesson(lesson.id)?.subject as string)?.name}</span>
                <span>{lesson.answers.length}</span>
                <span>{counterQuestionsBy('correct', lesson)}</span>
                <span>{counterQuestionsBy('wrong', lesson)}</span>
              </div>
            ))}
          </div>
        </>)}
    </div>
  )
}

export default DoneLessonsStudent;