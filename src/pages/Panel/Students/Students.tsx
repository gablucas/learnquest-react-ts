import React from 'react';
import Panel from '../Panel.module.css';
import { useHelpers } from '../../../hooks/useHelpers';
import { GlobalContext } from '../../../GlobalContext';
import { IStudent, IUser } from '../../../types/Users';
import { Group } from '../../../types/Group';
import StudentsHeader from './components/students-header';
import StudentsList from './components/students-list';
import { getUsersByAccess } from '../../../helpers/user/getUsersByAccess';
import { getLoggedUser } from '../../../helpers/user/getLoggedUser';
import { getStudentsByTeacher } from '../../../helpers/group/getStudentsByGroup';
import { getStudentGroup } from '../../../helpers/group/getStudentGroup';
import { ButtonCleanFilter } from '../../../components/button-clean-filter';
import { ButtonFilterStudent } from './components/button-filter-student';

const Students = () => {
  const { filter } = React.useContext(GlobalContext);
  const { isArrayEmpty, arrayIncludes } = useHelpers();

  const loggedUser = getLoggedUser() as IUser;
  let students = loggedUser.access === 'admin' ? getUsersByAccess('student') as IStudent[] : getStudentsByTeacher(loggedUser.id);
  if (!isArrayEmpty(filter.group)) students = students.filter((student) => arrayIncludes(filter.group, (getStudentGroup(student.id) as Group).id));

  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <ButtonFilterStudent isFiltered={['access', 'status']} />
        <ButtonCleanFilter isFiltered={['access', 'status']} />
      </div>

      <div className={`${Panel.info} ${Panel.students}`}>
        <StudentsHeader />
        <StudentsList students={students} />
      </div>

    </section>
  )
}

export default Students;