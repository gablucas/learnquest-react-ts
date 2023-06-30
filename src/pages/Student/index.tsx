import Styles from './Student.module.css';
import Container from "../../components/Container";
import { Outlet } from 'react-router-dom';
import StudentMenu from './components/StudentMenu';

const Student = () => {

  return (
    <Container>
      <div className={Styles.student_container}>
        <StudentMenu />
        <Outlet />
      </div>
    </Container>
  )
}

export default Student;