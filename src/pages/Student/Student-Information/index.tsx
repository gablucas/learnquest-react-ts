import React from 'react';
import Styles from './StudentInformations.module.css'
import { IStudent } from "../../../types/Users";
import { GlobalContext } from '../../../GlobalContext';
import StudentDashboard from './student-dashboard';
import StudentDoneLessons from './student-done-lessons';
import { getLoggedUser } from '../../../helpers/user/getLoggedUser';

const StudentInformations = () => {
  const { data } = React.useContext(GlobalContext);
  const student = getLoggedUser() as IStudent;

  if (data)
  return (
    <div className={Styles.container}>
      <h1>Suas informações</h1>
      <StudentDashboard student={student} />
      <StudentDoneLessons student={student} />
    </div>
  )
}

export default StudentInformations;