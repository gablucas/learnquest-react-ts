import React from 'react';
import Container from "../../components/Container";
import { Outlet } from 'react-router-dom';
import StudentMenu from './StudentMenu';
import { GlobalContext } from '../../GlobalContext';
import ChangeDefaultPassword from '../../components/ChangeDefaultPassword/ChangeDefaultPassword';
import { getLoggedUser } from '../../helpers/user/getLoggedUser';

const Student = () => {
  const { data } = React.useContext(GlobalContext);

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