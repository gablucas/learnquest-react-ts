import Styles from './StudentLessons.module.css';
import { Link } from 'react-router-dom';
import StartLesson from '../../../components/Icons/StartLesson';
import { Subject } from '../../../types/Commom';

import { ILesson } from '../../../types/Lessons';
import { getSubject } from '../../../helpers/subject/getSubject';
import { getStudentLessons } from '../../../helpers/lesson/getStudentLessons';
import { ButtonMobileInfo } from '../../../components/button-mobile-info';

const StudentLessons = () => {
  function getTotalXP(lesson: ILesson): number {
    const totalXP = lesson.task.map((m) => m.xp).reduce((acc, cur) => acc + cur);
    return totalXP;
  }

  function mobileInfo(lesson: ILesson): [string, string | number][] {
    return [
      ['Matéria', (getSubject(lesson.subject) as Subject).name],
      ['Questões', lesson.task.length],
      ['XP Total', getTotalXP(lesson)]
    ]
  }

  return (
    <div className={Styles.container}>

      <h1>Suas aulas</h1>

      <div className={Styles.list}>
        <div>
          <span>Aula</span>
          <span>Matéria</span>
          <span>Questões</span>
          <span>XP Total</span>
          <span className={Styles.mobile}>Informações</span>
          <span>Iniciar a aula</span>
        </div>

        <ul>
          {getStudentLessons().map((lesson) => (
            <li key={lesson.id} className={Styles.lessons}>
              <div key={lesson.id}>
                <span>{lesson.title}</span>
                <span>{getSubject(lesson.subject)?.name}</span>
                <span>{lesson.task.length}</span>
                <span>{getTotalXP(lesson)}</span>
                <ButtonMobileInfo info={mobileInfo(lesson)} />
                <Link to={`/estudante/aula/${lesson.id}`}  key={lesson.id}><StartLesson /></Link>
              </div>  
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default StudentLessons;