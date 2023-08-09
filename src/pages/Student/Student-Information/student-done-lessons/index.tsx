import { TaskStudent } from '../../../../types/Lessons';
import { IStudent } from '../../../../types/Users';
import Styles from '../StudentInformations.module.css';
import { getSubject } from '../../../../helpers/subject/getSubject';
import { getLesson } from '../../../../helpers/lesson/getLesson';
import { counterQuestionsBy } from '../../../../helpers/lesson/counterQuestionsBy';
import { ButtonMobileInfo } from '../../../../components/button-mobile-info';

interface IStudentDoneLessonsProps {
  student: IStudent,
}

const StudentDoneLessons = ({ student }: IStudentDoneLessonsProps) => {

  function totalXPEarned(index: number): number {
    const totalXP = student.lessons[index].answers.map((l) => l.xp).reduce((acc, cur) => acc + cur);
    return totalXP;
  }

  function mobileInfo(index: number, lesson: TaskStudent): [string, string | number][] {
    return [
      ['Matéria', getSubject(getLesson(lesson.id)?.subject as string)?.name as string],
      ['Questões', lesson.answers.length],
      ['Acertos', counterQuestionsBy('correct', lesson)],
      ['Erros', counterQuestionsBy('wrong', lesson)],
      ['XP Ganho', totalXPEarned(index)],
    ]
  }

  return (
    <div className={Styles.historic_container}>
      <h2>Aulas finalizadas</h2>

      <div className={Styles.historic_list}>
        <div>
          <span>Aula</span>
          <span className={Styles.mobile}>Ver informações</span>
          <span>Matéria</span>
          <span>Questões</span>
          <span>Corretas</span>
          <span>Erradas</span>
          <span>XP Ganho</span> 
        </div>

        {student.lessons.map((lesson, index) => (
          <div key={lesson.id}>
            <span>{getLesson(lesson.id)?.title}</span>
            <ButtonMobileInfo info={mobileInfo(index, lesson)} />
            <span>{getSubject(getLesson(lesson.id)?.subject as string)?.name}</span>
            <span>{lesson.answers.length}</span>
            <span>{counterQuestionsBy('correct', lesson)}</span>
            <span>{counterQuestionsBy('wrong', lesson)}</span>
            <span>{totalXPEarned(index)}</span>
          </div>
        ))}
      </div>
  </div>
  )
}

export default StudentDoneLessons;