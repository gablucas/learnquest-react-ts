import React from 'react';
import Styles from './StudentData.module.css';
import { Navigate, useParams } from "react-router-dom";
import useData from "../../../hooks/useData";
import { IStudent } from "../../../types/Users";
import { GlobalContext } from "../../../GlobalContext";
import { MobileInfoData } from '../../../types/Commom';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import AboutStudent from './components/about-student';
import DoneLessonsStudent from './components/done-lessons-student';
import TodoLessonsStudent from './components/todo-lessons-student';

const StudentData = () => {
  const { id } = useParams();
  const { toggle } = React.useContext(GlobalContext);
  const { getUser, getStudentLessons } = useData();
  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoData[]>([{title: '', description: ''}]);

  const student = id && getUser(id)?.access === 'student' ? getUser(id) as IStudent : '';
  const lessonsTodo = student ? getStudentLessons(student.id) : [];

  if (!student) return <Navigate to='/painel/alunos' />
  return (
    <section className={Styles.studentdata}>
      <AboutStudent student={student} lessonsTodo={lessonsTodo} />
      <DoneLessonsStudent student={student} setMobileInfo={setMobileInfo} />
      <TodoLessonsStudent lessonsTodo={lessonsTodo} setMobileInfo={setMobileInfo} />
      {toggle === 'mobile' && mobileInfo && (<MobileInfo info={mobileInfo} />)}
    </section>
  )
}

export default StudentData;