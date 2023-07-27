import React from 'react';
import Styles from './StudentDashboard.module.css'
import useData from "../../../hooks/useData";
import { IStudent } from "../../../types/Users";
import { GlobalContext } from '../../../GlobalContext';
import { TaskStudent } from '../../../types/Lessons';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import { MobileInfoData } from '../../../types/Commom';

const StudentDashboard = () => {
  const { data, toggle, setToggle } = React.useContext(GlobalContext);
  const { getLoggedUser, getLesson, getSubject, getStudentLessons, counterCorrectWrongQuestions } = useData();
  const student = getLoggedUser() as IStudent;
  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoData[]>([{title: '', description: ''}]);

  function totalXPEarned(index: number): number {
    const totalXP = student.lessons[index].answers.map((l) => l.xp).reduce((acc, cur) => acc + cur);
    return totalXP;
  }

  function handleMobileInfo(index: number, lesson: TaskStudent): void {
    const subject = {title: 'Matéria', description: getSubject(getLesson(lesson.id)?.subject as string)?.name as string};
    const questions = {title: 'Questões', description: lesson.answers.length};
    const correct = {title: 'Acertos', description: counterCorrectWrongQuestions('correct', lesson)};
    const wrong = {title: 'Erros', description: counterCorrectWrongQuestions('wrong', lesson)};
    const totalXP = {title: 'XP Ganho', description: totalXPEarned(index)};

    setMobileInfo([subject, questions, correct, wrong, totalXP]);
    setToggle('mobile');
  }

  if (data)
  return (
    <div className={Styles.container}>
      <h1>Suas informações</h1>

      <div className={Styles.dashboard}>
        <div className={Styles.level}>
          <div style={{background: `radial-gradient(closest-side, #302B33 79%, transparent 80% 100%), conic-gradient(#FFA700 ${(student.xp * 100) / (student.level * 125)}%, #464149 0)`}}>
            <span>{student.level}</span>
            <span>{student.xp} / {student.level * 125}</span>
          </div>
        </div>

        <div className={Styles.todolessons}>
          <span>{getStudentLessons().length}</span>
          <span>Aulas para fazer</span>
        </div>

        <div className={Styles.donelessons}>
          <span>{student.lessons.length}</span>
          <span>Aulas finalizadas</span>
        </div>

        <div className={Styles.data}>
          <span>{student.name}</span>
          <span>{data.groups.find((group) => group.students.some((studentID) => student.id === studentID))?.name}</span>
          <span>Rank 1</span>
          <span>XP Total {student.xp + (student.level - 1) * 125}</span>
        </div>

        <div className={Styles.messages}>
          <span>Sem mensagens</span>
        </div>

      </div>

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
              <span>{counterCorrectWrongQuestions('correct', lesson)}</span>
              <span>{counterCorrectWrongQuestions('wrong', lesson)}</span>
              <span>{totalXPEarned(index)}</span>
            </div>
          ))}
        </div>
      </div>

      {toggle === 'mobile' && (<MobileInfo info={mobileInfo} />)}
    </div>
  )
}

export default StudentDashboard;