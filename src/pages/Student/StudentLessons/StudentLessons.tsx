import React from 'react';
import Styles from '../Student.module.css';
import { GlobalContext } from '../../../GlobalContext';
import useData from '../../../hooks/useData';
import { Link } from 'react-router-dom';
import { IStudent } from '../../../types/Users';

const StudentLessons = () => {
  const { data } = React.useContext(GlobalContext);
  const { getUser } = useData();
  const student = getUser() as IStudent;

  const studentClass = data?.classes.find((f) => f.students.some((id) => id === student?.id));
  const lessons = data?.lessons.filter((lesson) => lesson.classes.some((id) => id === studentClass?.id && !student.lessons.some((s) => s.id === lesson.id)));

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
                <span>{lesson.subject}</span>
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