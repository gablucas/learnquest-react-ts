import React from 'react';
import Styles from './Student.module.css';
import Container from "../../components/Container";
import { Outlet } from 'react-router-dom';
import StudentMenu from './StudentMenu/StudentMenu';
import { GlobalContext } from '../../GlobalContext';
import useData from '../../hooks/useData';
import ChangePassword from '../../components/ChangePassword/ChangePassword';

const Student = () => {
  const { data } = React.useContext(GlobalContext);
  const { getUser } = useData();

  return (
    <Container>
      <div className={Styles.student_container}>
        <StudentMenu />
        <Outlet />
        {getUser()?.password == data?.preferences.defaultPassword && (<ChangePassword />)}
      </div>
    </Container>
  )
}

export default Student;