import React from 'react';
import Panel from '../../../Panel.module.css';
import StudentDataIcon from '../../../../../components/Icons/StudentDataIcon';
import { Link } from 'react-router-dom';
import { IStudent, IUser } from "../../../../../types/Users";
import { ButtonMobileInfo } from '../../../../../components/button-mobile-info';
import { getStudentGroup } from '../../../../../helpers/group/getStudentGroup';
import { GlobalContext } from '../../../../../GlobalContext';
import { useHelpers } from '../../../../../hooks/useHelpers';
import { getLoggedUser } from '../../../../../helpers/user/getLoggedUser';
import { getUsersByAccess } from '../../../../../helpers/user/getUsersByAccess';
import { getStudentsByTeacher } from '../../../../../helpers/group/getStudentsByGroup';
import { Group } from '../../../../../types/Group';



const StudentsList = () => {
  const { filter } = React.useContext(GlobalContext);
  const { isArrayEmpty, arrayIncludes } = useHelpers();

  const loggedUser = getLoggedUser() as IUser;
  let students = loggedUser.access === 'admin' ? getUsersByAccess('student') as IStudent[] : getStudentsByTeacher(loggedUser.id);
  if (!isArrayEmpty(filter.group)) students = students.filter((student) => arrayIncludes(filter.group, (getStudentGroup(student.id) as Group).id));

  return (
    <>
    {students.map((student) => (
      <div key={student.id} className={Panel.students}>
        <span>{student.name}</span>
        <span>{getStudentGroup(student.id)?.name}</span>
        <span>{student.level}</span>
        <ButtonMobileInfo info={[['Nome', student.name], ['Turma', getStudentGroup(student.id)?.name || 'Sem turma'] , ['Level', student.level]]} />
        <Link to={`/painel/aluno/${student.id}`}><StudentDataIcon /></Link>
      </div>
    ))}
    </>
  )
}

export default StudentsList;