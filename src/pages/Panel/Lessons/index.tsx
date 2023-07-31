import React from 'react';
import Panel from '../Panel.module.css';
import Message from '../../../components/Message/Message';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import Filter from '../../../components/Filter/Filter';
import useHelpers from '../../../hooks/useHelpers';
import FilterIcon from '../../../components/Icons/FilterIcon';
import LessonsHeader from './components/lessons-header';
import LessonsList from './components/lessons-list';
import { GlobalContext } from '../../../GlobalContext';
import { Link } from "react-router-dom";
import { MobileInfoData } from '../../../types/Commom';

const Lessons = () => {
  const { filter, toggle, setToggle } = React.useContext(GlobalContext);
  const { isAnyArrayFilled, cleanFilter } = useHelpers();

  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoData[]>([{title: '', description: ''}]);
  const checkfilter = [filter.subject, filter.createdby, filter.status];

  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <Link to='criar'>Criar aula +</Link>
        <button onClick={() => setToggle('filter')} className={isAnyArrayFilled(checkfilter) ? Panel.filter : ''} >Filtrar <FilterIcon /></button>
        {isAnyArrayFilled(checkfilter) && (<button onClick={() => cleanFilter()} className={Panel.cleanfilter}>Limpar filtro</button>)}
      </div>

      <div className={`${Panel.info} ${Panel.lessons}`}>
        <LessonsHeader />
        <LessonsList setMobileInfo={setMobileInfo} />
      </div>

      {toggle === 'confirm' && <Message />}
      {toggle === 'filter' && <Filter options={{access: false, student: false, subject: true, group: false, createdby: true, status: false}} />}
      {toggle === 'mobile' && mobileInfo && (<MobileInfo info={mobileInfo} />)}
      
    </section>
  )
}

export default Lessons;