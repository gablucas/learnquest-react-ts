import React from 'react';
import { GlobalContext } from '../../../../GlobalContext';
import { MobileInfoData } from '../../../../types/Commom';
import { TaskStudent } from '../../../../types/Lessons';
import { IStudent } from '../../../../types/Users';
import Styles from '../StudentInformations.module.css';
import { getSubject } from '../../../../helpers/subject/getSubject';
import { getLesson } from '../../../../helpers/lesson/getLesson';
import { counterQuestionsBy } from '../../../../helpers/lesson/counterQuestionsBy';

interface IStudentDoneLessonsProps {
  student: IStudent,
  setMobileInfo: React.Dispatch<React.SetStateAction<MobileInfoData[]>>,
}

const StudentDoneLessons = ({ student, setMobileInfo }: IStudentDoneLessonsProps) => {
  const { setToggle } = React.useContext(GlobalContext);

  function totalXPEarned(index: number): number {
    const totalXP = student.lessons[index].answers.map((l) => l.xp).reduce((acc, cur) => acc + cur);
    return totalXP;
  }

  function handleMobileInfo(index: number, lesson: TaskStudent): void {
    const subject = {title: 'Matéria', description: getSubject(getLesson(lesson.id)?.subject as string)?.name as string};
    const questions = {title: 'Questões', description: lesson.answers.length};
    const correct = {title: 'Acertos', description: counterQuestionsBy('correct', lesson)};
    const wrong = {title: 'Erros', description: counterQuestionsBy('wrong', lesson)};
    const totalXP = {title: 'XP Ganho', description: totalXPEarned(index)};

    setMobileInfo([subject, questions, correct, wrong, totalXP]);
    setToggle('mobile');
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
            <button className={Styles.mobile} onClick={() => handleMobileInfo(index, lesson)}>imagem</button>
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