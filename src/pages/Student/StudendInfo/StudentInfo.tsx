import React from 'react';
import Styles from './StudentInfo.module.css'
import useData from "../../../hooks/useData";
import { IStudent } from "../../../types/Users";
import { GlobalContext } from '../../../GlobalContext';
import { TaskStudent } from '../../../types/Lessons';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import { MobileInfoData } from '../../../types/Commom';

const StudentInfo = () => {
  const { data, toggle, setToggle } = React.useContext(GlobalContext);
  const { getLoggedUser, getSubject } = useData();
  const student = getLoggedUser() as IStudent;
  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoData[]>([{title: '', description: ''}]);

  const studentGroup = data?.groups.find((f) => f.students.some((id) => id === student?.id));
  const todoLessons = data?.lessons.filter((lesson) => lesson.groups.some((id) => id === studentGroup?.id && !student.lessons.some((l) => l.id === lesson.id) && !data.evaluate.some((e) => e.id === lesson.id)));

  function getLessonTitle(lesson: TaskStudent): string {
    const title = data.lessons.find((dataLesson) => dataLesson.id === lesson.id)?.title as string
    return title;
  }

  function getSubjectName(lesson: TaskStudent): string {
    const subject = getSubject(data.lessons.find((l) => l.id === lesson.id)?.subject as string)?.name as string;
    return subject;
  }

  function countCorrectQuestions(index: number): number {
    const correct =  student.lessons[index].answers.filter((f) => f.isCorrect === true).length;
    return correct;
  }

  function countWrongQuestions(index: number): number {
    const wrong = student.lessons[index].answers.filter((f) => f.isCorrect === false).length;
    return wrong;
  }

  function totalXPEarned(index: number): number {
    const totalXP = student.lessons[index].answers.map((l) => l.xp).reduce((acc, cur) => acc + cur);
    return totalXP;
  }

  function handleMobileInfo(index: number, lesson: TaskStudent): void {
    const subject = {title: 'Matéria', description: getSubjectName(lesson)};
    const questions = {title: 'Questões', description: lesson.answers.length};
    const correct = {title: 'Acertos', description: countCorrectQuestions(index)};
    const wrong = {title: 'Erros', description: countWrongQuestions(index)};
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
          <span>{todoLessons?.length}</span>
          <span>Aulas para fazer</span>
        </div>

        <div className={Styles.donelessons}>
          <span>{student.lessons.length}</span>
          <span>Aulas finalizadas</span>
        </div>

        <div className={Styles.data}>
          <span>{student.name}</span>
          <span>{studentGroup?.name}</span>
          <span>Rank 1</span>
          <span>XP Total {student.xp + (student.level - 1) * 125}</span>
        </div>

        <div className={Styles.messages}>
          <span>Sem mensagens</span>
        </div>

      </div>

      <div className={Styles.historic_container}>
        <h2>Histórico de aulas</h2>

        <div className={Styles.historic_list}>
          <div>
            <span>Aula</span>
            <span className={Styles.mobile}>Ver informações</span>
            <span>Matéria</span>
            <span>Questões</span>
            <span>Acertos</span>
            <span>Erros</span>
            <span>XP Ganho</span> 
          </div>

          {student.lessons.map((lesson, index) => (
            <div key={lesson.id}>
              <span>{getLessonTitle(lesson)}</span>
              <button className={Styles.mobile} onClick={() => handleMobileInfo(index, lesson)}>imagem</button>
              <span>{getSubjectName(lesson)}</span>
              <span>{lesson.answers.length}</span>
              <span>{countCorrectQuestions(index)}</span>
              <span>{countWrongQuestions(index)}</span>
              <span>{totalXPEarned(index)}</span>
            </div>
          ))}
        </div>
      </div>

      {toggle === 'mobile' && (<MobileInfo info={mobileInfo} />)}
    </div>
  )
}

export default StudentInfo;