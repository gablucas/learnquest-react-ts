import React from 'react';
import Styles from '../Student.module.css';
import { GlobalContext } from '../../../GlobalContext';
import useData from '../../../hooks/useData';
import { Link } from 'react-router-dom';
import { IStudent } from '../../../types/Users';

const StudentLessons = () => {
  const { data } = React.useContext(GlobalContext);
  const { getLoggedUser } = useData();
  const student = getLoggedUser() as IStudent;

  const studentGroup = data?.groups.find((f) => f.students.some((id) => id === student?.id));
  const lessons = data?.lessons.filter((lesson) => lesson.groups.some((id) => id === studentGroup?.id && !student.lessons.some((l) => l.id === lesson.id) && !data.evaluate.some((e) => e.id === lesson.id)));

  return (
    <div className={Styles.student_lessons_container}>

      <h1>Suas aulas</h1>

      <div className={Styles.student_lessons_list}>
        <div>
          <span>Aula</span>
          <span>Matéria</span>
          <span>Questões</span>
          <span>XP Total</span>
        </div>

        <ul>
          {lessons?.map((lesson) => (
            <li className={Styles.student_lessons}>
              <Link to={`/estudante/aula/${lesson.id}`}  key={lesson.id}>
                <span>{lesson.title}</span>
                <span>{data.subjects.find((subject) => subject.id === lesson.subject)?.name}</span>
                <span>{lesson.questions.length}</span>
                <span>{lesson.questions.map((m) => m.xp).reduce((acc, cur) => acc + cur)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default StudentLessons;