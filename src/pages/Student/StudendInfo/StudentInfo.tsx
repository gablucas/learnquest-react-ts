import React from 'react';
import Styles from '../Student.module.css';
import useData from "../../../hooks/useData";
import { IStudent } from "../../../types/Users";
import { GlobalContext } from '../../../GlobalContext';

const StudentInfo = () => {
  const { data } = React.useContext(GlobalContext);
  const { getLoggedUser } = useData();
  const student = getLoggedUser() as IStudent;

  const studentClass = data?.groups.find((f) => f.students.some((id) => id === student?.id));
  const todoLessons = data?.lessons.filter((lesson) => lesson.groups.some((id) => id === studentClass?.id && !student.lessons.some((s) => s.id === lesson.id)));

  if (data)
  return (
    <div className={Styles.student_info_container}>
      <h1>Suas informações</h1>

      <div className={Styles.student_info_dashboard}>
        <div className={Styles.student_info_level}>
          <div style={{background: `radial-gradient(closest-side, #302B33 79%, transparent 80% 100%), conic-gradient(#FFA700 ${(student.xp * 100) / (student.level * 125)}%, #464149 0)`}}>
            <span>{student.level}</span>
            <span>{student.xp} / {student.level * 125}</span>
          </div>
        </div>

        <div className={Styles.student_info_todolessons}>
          <span>{todoLessons?.length}</span>
          <span>Aulas para fazer</span>
        </div>

        <div className={Styles.student_info_donelessons}>
          <span>{student.lessons.length}</span>
          <span>Aulas finalizadas</span>
        </div>

        <div className={Styles.student_info_data}>
          <span>{student.name}</span>
          <span>{studentClass?.name}</span>
          <span>Rank 1</span>
          <span>XP Total {student.xp + (student.level - 1) * 125}</span>
        </div>

        <div className={Styles.student_info_messages}>
          <span>Sem mensagens</span>
        </div>

      </div>

      <div className={Styles.student_info_historic_container}>
        <h2>Histórico de aulas</h2>

        <div className={Styles.student_info_historic_list}>
          <div>
            <span>Aula</span>
            <span>Matéria</span>
            <span>Questões</span>
            <span>Acertos</span>
            <span>Erros</span>
            <span>XP Ganho</span>
          </div>

          {student.lessons.map((lesson, index) => (
            <div>
              <span>{data.lessons.find((dataLesson) => dataLesson.id === lesson.id)?.title}</span>
              <span>{data.subjects.find((subject) => subject.id === data?.lessons.find((dataLesson) => dataLesson.id === lesson.id)?.subject)?.name }</span>
              <span>{lesson.answers.length}</span>
              <span>{student.lessons[index].answers.filter((f) => f.isCorrect === true).length}</span>
              <span>{student.lessons[index].answers.filter((f) => f.isCorrect === false).length}</span>
              <span>{student.lessons[index].answers.map((l) => l.xp).reduce((acc, cur) => acc + cur)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudentInfo;