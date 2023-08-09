import Panel from '../../../Panel.module.css';
import Styles from '../../StudentData.module.css';
import Expand from '../../../../../components/Icons/Contract';
import Contract from '../../../../../components/Icons/Expand';
import useToggle from '../../../../../hooks/useToggle';
import { ILesson } from '../../../../../types/Lessons';
import { getUser } from '../../../../../helpers/user/getUser';
import { getSubject } from '../../../../../helpers/subject/getSubject';
import { getLesson } from '../../../../../helpers/lesson/getLesson';
import { ButtonMobileInfo } from '../../../../../components/button-mobile-info';

interface ITodoLessonsStudentProps {
  lessonsTodo: ILesson[],
}

const TodoLessonsStudent = ({ lessonsTodo }: ITodoLessonsStudentProps) => {
  const todolesson = useToggle();

  function mobileInfo(lesson: ILesson): [string, string | number][] {

    return [
      ['Criado por', getUser(getLesson(lesson.id)?.createdby as string)?.name || ''],
      ['Matéria',  getSubject(getLesson(lesson.id)?.subject as string)?.name || ''],
      ['Questões', getLesson(lesson.id)?.task.length || 0],
    ]
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
                <ButtonMobileInfo info={mobileInfo(lesson)} />
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