import React from 'react';
import Styles from '../Student.module.css';
import useData from "../../../hooks/useData";
import { IStudent } from "../../../types/Users";
import { GlobalContext } from '../../../GlobalContext';

const StudentInfo = () => {
  const { data } = React.useContext(GlobalContext);
  const { getUser } = useData();
  const student = getUser() as IStudent;

  const studentClass = data?.classes.find((f) => f.students.some((id) => id === student?.id));
  const lessons = data?.lessons.filter((lesson) => lesson.classes.some((id) => id === studentClass?.id && !student.lessons.some((s) => s.id === lesson.id)));

  return (
    <div className={Styles.student_info_container}>

      <div className={Styles.student_info_level}>
        <div style={{background: `radial-gradient(closest-side, #302B33 79%, transparent 80% 100%), conic-gradient(#FFA700 ${(student.xp * 100) / (student.level * 125)}%, #464149 0)`}}>
          <span>{student.level}</span>
          <span>{student.xp} / {student.level * 125}</span>
        </div>
      </div>

      <div className={Styles.student_info_todolessons}>
        <span>{lessons?.length}</span>
        <span>Aulas para fazer</span>
      </div>

      <div className={Styles.student_info_donelessons}>
        <span>{student.lessons.length}</span>
        <span>Aulas finalizadas</span>
      </div>
    </div>
  )
}

export default StudentInfo;