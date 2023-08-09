import Styles from './StudentData.module.css';
import { Navigate, useParams } from "react-router-dom";
import { IStudent } from "../../../types/Users";
import AboutStudent from './components/about-student';
import DoneLessonsStudent from './components/done-lessons-student';
import TodoLessonsStudent from './components/todo-lessons-student';
import { getUser } from '../../../helpers/user/getUser';
import { getStudentLessons } from '../../../helpers/lesson/getStudentLessons';

const StudentData = () => {
  const { id } = useParams();

  const student = id && getUser(id)?.access === 'student' ? getUser(id) as IStudent : '';
  const lessonsTodo = student ? getStudentLessons(student.id) : [];

  if (!student) return <Navigate to='/painel/alunos' />
  return (
    <section className={Styles.studentdata}>
      <AboutStudent student={student} lessonsTodo={lessonsTodo} />
      <DoneLessonsStudent student={student} />
      <TodoLessonsStudent lessonsTodo={lessonsTodo} />
    </section>
  )
}

export default StudentData;