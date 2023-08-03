import React from 'react';
import Panel from '../../../Panel.module.css';
import StudentDataIcon from '../../../../../components/Icons/StudentDataIcon';
import MoreInfo from '../../../../../components/Icons/MoreInfo';
import { MobileInfoData } from '../../../../../types/Commom';
import { Link } from 'react-router-dom';
import { IStudent } from "../../../../../types/Users";
import { GlobalContext } from '../../../../../GlobalContext';

interface IStudentsList {
  students: IStudent[],
  setMobileInfo: React.Dispatch<React.SetStateAction<MobileInfoData[]>>,
}

const StudentsList = ({ students, setMobileInfo }: IStudentsList) => {
  const { data, setToggle } = React.useContext(GlobalContext);

  function handleMobileInfo(user: IStudent): void {
    const name = {title: 'Nome', description: user.name};
    const group = {title: 'Turma', description: data.groups.find((group) => group.students.some((studentID) => user.id === studentID))?.name || ''};
    const level = {title: 'Level', description: user.level};

    setMobileInfo([name, group, level]);
    setToggle('mobile');
  }

  return (
    <>
    {students.map((m) => (
      <div key={m.id} className={Panel.students}>
        <span>{m.name}</span>
        <span>{data.groups.find((group) => group.students.some((studentID) => m.id === studentID))?.name}</span>
        <span>{m.level}</span>
        <button className={Panel.mobile} onClick={() => handleMobileInfo(m)} ><MoreInfo /></button>
        <Link to={`/painel/aluno/${m.id}`}><StudentDataIcon /></Link>
      </div>
    ))}
    </>
  )
}

export default StudentsList;