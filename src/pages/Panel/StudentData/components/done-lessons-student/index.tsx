import Expand from '../../../../../components/Icons/Contract';
import Contract from '../../../../../components/Icons/Expand';
import useToggle from '../../../../../hooks/useToggle';
import Styles from '../../StudentData.module.css'
import Panel from '../../../Panel.module.css';
import { IStudent } from '../../../../../types/Users';
import { TaskStudent } from '../../../../../types/Lessons';
import { getUser } from '../../../../../helpers/user/getUser';
import { getLesson } from '../../../../../helpers/lesson/getLesson';
import { getSubject } from '../../../../../helpers/subject/getSubject';
import { counterQuestionsBy } from '../../../../../helpers/lesson/counterQuestionsBy';
import { ButtonMobileInfo } from '../../../../../components/button-mobile-info';

interface IDoneLessonsStudentProps {
  student: IStudent,
}

const DoneLessonsStudent = ({ student }: IDoneLessonsStudentProps) => {
  const donelesson = useToggle();

  function MobileInfo(lesson: TaskStudent): [string, string | number][] {

    return [
      ['Criado por', getUser(getLesson(lesson.id)?.createdby as string)?.name || ''],
      ['Matéria', getSubject(getLesson(lesson.id)?.subject as string)?.name || ''],
      ['Questões', ((lesson as TaskStudent).answers.length)],
      ['Corretas', counterQuestionsBy('correct', lesson as TaskStudent)],
      ['Erradas', counterQuestionsBy('wrong', lesson as TaskStudent)],
    ]
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
                <ButtonMobileInfo info={MobileInfo(lesson)} />
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