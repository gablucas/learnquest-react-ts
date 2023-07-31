import React from 'react';
import Styles from './StudentInformations.module.css'
import useData from "../../../hooks/useData";
import { IStudent } from "../../../types/Users";
import { GlobalContext } from '../../../GlobalContext';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import { MobileInfoData } from '../../../types/Commom';
import StudentDashboard from './student-dashboard';
import StudentDoneLessons from './student-done-lessons';

const StudentInformations = () => {
  const { data, toggle } = React.useContext(GlobalContext);
  const { getLoggedUser } = useData();
  const student = getLoggedUser() as IStudent;
  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoData[]>([{title: '', description: ''}]);

  if (data)
  return (
    <div className={Styles.container}>
      <h1>Suas informações</h1>
      <StudentDashboard student={student} />
      <StudentDoneLessons student={student} setMobileInfo={setMobileInfo} />
      {toggle === 'mobile' && (<MobileInfo info={mobileInfo} />)}
    </div>
  )
}

export default StudentInformations;