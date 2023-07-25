import React from 'react';
import Panel from '../Panel.module.css';
import { GlobalContext } from '../../../GlobalContext';
import MoreInfo from '../../../components/Icons/MoreInfo';
import { MobileInfoData } from '../../../types/Commom';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import { IStudent } from '../../../types/Users';
import Filter from '../../../components/Filter/Filter';
import FilterIcon from '../../../components/Icons/FilterIcon';
import useHelpers from '../../../hooks/useHelpers';
import { Link } from 'react-router-dom';
import StudentDataIcon from '../../../components/Icons/StudentDataIcon';

const Students = () => {
  const { data, filter, toggle, setToggle } = React.useContext(GlobalContext);
  const { isAnyArrayFilled, cleanFilter } = useHelpers();

  const students = data.users.filter((user) => user.access === 'student') as IStudent[];
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