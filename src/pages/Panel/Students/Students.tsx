import React from 'react';
import Panel from '../Panel.module.css';
import MoreInfo from '../../../components/Icons/MoreInfo';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import Filter from '../../../components/Filter/Filter';
import FilterIcon from '../../../components/Icons/FilterIcon';
import useHelpers from '../../../hooks/useHelpers';
import StudentDataIcon from '../../../components/Icons/StudentDataIcon';
import useData from '../../../hooks/useData';
import { GlobalContext } from '../../../GlobalContext';
import { MobileInfoData } from '../../../types/Commom';
import { IStudent, IUser } from '../../../types/Users';
import { Link } from 'react-router-dom';
import { Group } from '../../../types/Group';

const Students = () => {
  const { data, filter, toggle, setToggle } = React.useContext(GlobalContext);
  const { isArrayEmpty, arrayIncludes, isAnyArrayFilled, cleanFilter } = useHelpers();
  const { getUsersByAcess, getLoggedUser, getStudentGroup, getStudentsByTeacher } = useData();

  const loggedUser = getLoggedUser() as IUser;
  let students = loggedUser.access === 'admin' ? getUsersByAcess('student') as IStudent[] : getStudentsByTeacher(loggedUser.id);
  if (!isArrayEmpty(filter.group)) students = students.filter((student) => arrayIncludes(filter.group, (getStudentGroup(student.id) as Group).id));


  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoData[]>([{title: '', description: ''}]);

  function handleMobileInfo(user: IStudent): void {
    const group = {title: 'Turma', description: data.groups.find((group) => group.students.some((studentID) => user.id === studentID))?.name || ''};
    const level = {title: 'Level', description: user.level};

    setMobileInfo([group, level]);
    setToggle('mobile');
  }

  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <button onClick={() => setToggle('filter')} className={isAnyArrayFilled([filter.access, filter.status]) ? Panel.filter : ''} >Filtrar <FilterIcon /></button>
        {isAnyArrayFilled([filter.access, filter.status]) && (<button onClick={() => cleanFilter()} className={Panel.cleanfilter}>Limpar filtro</button>)}
      </div>

      <div className={`${Panel.info} ${Panel.students}`}>

        <div>
          <span>Nome</span>
          <span>Turma</span>
          <span>Level</span>
          <span className={Panel.mobile}>Informações</span>
          <span>Dados</span>
        </div>

        {students.map((m) => (
          <div key={m.id} className={Panel.students}>
            <span>{m.name}</span>
            <span>{data.groups.find((group) => group.students.some((studentID) => m.id === studentID))?.name}</span>
            <span>{m.level}</span>
            <button className={Panel.mobile} onClick={() => handleMobileInfo(m)} ><MoreInfo /></button>
            <Link to={`/painel/aluno/${m.id}`}><StudentDataIcon /></Link>
          </div>
        ))}
      </div>

      {toggle === 'filter' && <Filter options={{access: false, student: false, subject: false, group: true, createdby: false, status: false}} />}
      {toggle === 'mobile' && mobileInfo && (<MobileInfo info={mobileInfo} />)}
    </section>
  )
}

export default Students;