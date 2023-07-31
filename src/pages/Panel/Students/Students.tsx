import React from 'react';
import Panel from '../Panel.module.css';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import Filter from '../../../components/Filter/Filter';
import FilterIcon from '../../../components/Icons/FilterIcon';
import useHelpers from '../../../hooks/useHelpers';
import useData from '../../../hooks/useData';
import { GlobalContext } from '../../../GlobalContext';
import { MobileInfoData } from '../../../types/Commom';
import { IStudent, IUser } from '../../../types/Users';
import { Group } from '../../../types/Group';
import StudentsHeader from './components/students-header';
import StudentsList from './components/students-list';

const Students = () => {
  const { filter, toggle, setToggle } = React.useContext(GlobalContext);
  const { isArrayEmpty, arrayIncludes, isAnyArrayFilled, cleanFilter } = useHelpers();
  const { getUsersByAcess, getLoggedUser, getStudentGroup, getStudentsByTeacher } = useData();

  const loggedUser = getLoggedUser() as IUser;
  let students = loggedUser.access === 'admin' ? getUsersByAcess('student') as IStudent[] : getStudentsByTeacher(loggedUser.id);
  if (!isArrayEmpty(filter.group)) students = students.filter((student) => arrayIncludes(filter.group, (getStudentGroup(student.id) as Group).id));
  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoData[]>([{title: '', description: ''}]);

  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <button onClick={() => setToggle('filter')} className={isAnyArrayFilled([filter.access, filter.status]) ? Panel.filter : ''} >Filtrar <FilterIcon /></button>
        {isAnyArrayFilled([filter.access, filter.status]) && (<button onClick={() => cleanFilter()} className={Panel.cleanfilter}>Limpar filtro</button>)}
      </div>

      <div className={`${Panel.info} ${Panel.students}`}>
        <StudentsHeader />
        <StudentsList students={students} setMobileInfo={setMobileInfo} />
      </div>

      {toggle === 'filter' && <Filter options={{access: false, student: false, subject: false, group: true, createdby: false, status: false}} />}
      {toggle === 'mobile' && mobileInfo && (<MobileInfo info={mobileInfo} />)}
    </section>
  )
}

export default Students;