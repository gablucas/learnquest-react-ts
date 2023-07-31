import React from 'react';
import { GlobalContext } from '../../../../GlobalContext';
import useData from '../../../../hooks/useData';
import { IStudent } from '../../../../types/Users';
import Styles from '../StudentInformations.module.css';

interface IStudentDashboardProps {
  student: IStudent,
}

const StudentDashboard = ({ student }: IStudentDashboardProps) => {
  const { data } = React.useContext(GlobalContext);
  const { getStudentLessons } = useData();

  return (
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
  )
}

export default StudentDashboard;