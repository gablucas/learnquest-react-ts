import React from 'react';
import Styles from '../Student.module.css';
import { GlobalContext } from "../../../GlobalContext";
import { Link } from 'react-router-dom';

const StudentLessons = () => {
  const { data } = React.useContext(GlobalContext);

  return (
    <div className={Styles.student_lessons_container}>
      <h1>Aulas</h1>

      <div className={Styles.student_lessons}>
        {data?.lessons.map((lesson) => (
          <Link to={`aula/${lesson.id}`} key={lesson.id}>
            <div></div>
            <span>{lesson.title}</span>
          </Link>
        ))}
      </div>

      <h1>Aulas Finalizadas</h1>

    </div>
  )
}

export default StudentLessons;