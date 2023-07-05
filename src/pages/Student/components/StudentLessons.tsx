import React from 'react';
import Styles from '../Student.module.css';
import { GlobalContext } from "../../../GlobalContext";
import { Link } from 'react-router-dom';
import useData from '../../../hooks/useData';

const StudentLessons = () => {
  const { data } = React.useContext(GlobalContext);
  const { getUser } = useData();

  const userClass = data?.classes.find((f) => f.students.some((s) => s === getUser()?.id));
  const lessons = data?.lessons.filter((f) => f.classes.some((id) => id === userClass?.id));

  return (
    <div className={Styles.student_lessons_container}>
      <h1>Aulas</h1>

      <div className={Styles.student_lessons}>
        {lessons?.map((lesson) => (
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