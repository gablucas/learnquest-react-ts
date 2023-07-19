import React from 'react';
import Container from "../../components/Container";
import { Outlet } from 'react-router-dom';
import StudentMenu from './StudentMenu/StudentMenu';
import { GlobalContext } from '../../GlobalContext';
import useData from '../../hooks/useData';
import ChangeDefaultPassword from '../../components/ChangeDefaultPassword/ChangeDefaultPassword';

const Student = () => {
  const { data } = React.useContext(GlobalContext);
  const { getLoggedUser } = useData();

  return (
    <Container>
      <div>
        <StudentMenu />
        <Outlet />
        {getLoggedUser()?.password == data?.preferences.defaultPassword && (<ChangeDefaultPassword />)}
      </div>
    </Container>
  )
}

export default Student;