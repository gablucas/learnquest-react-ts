import React from 'react';
import Panel from '../Panel.module.css';
import { GlobalContext } from '../../../GlobalContext';
import Message from '../../../components/Message/Message';
import HandleGroup from './components/handle-group/HandleGroup';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import Filter from '../../../components/Filter/Filter';
import useHelpers from '../../../hooks/useHelpers';
import FilterIcon from '../../../components/Icons/FilterIcon';
import GroupHeader from './components/group-header';
import GroupList from './components/group-list';
import { MobileInfoData } from '../../../types/Commom';

const Groups = () => {
  const { filter, toggle, setToggle } = React.useContext(GlobalContext);
  const { isAnyArrayFilled, cleanFilter } = useHelpers();
  const [groupID, setGroupID] = React.useState<string>('');
  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoData[]>([{title: '', description: ''}]);



  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <button onClick={() => setToggle('create')}>Criar turma +</button>
        <button onClick={() => setToggle('filter')} className={isAnyArrayFilled([filter.group, filter.status]) ? Panel.filter : ''} >Filtrar <FilterIcon /></button>
        {isAnyArrayFilled([filter.group, filter.status]) && (<button onClick={() => cleanFilter()} className={Panel.cleanfilter}>Limpar filtro</button>)}
      </div>

      <div className={`${Panel.info} ${Panel.groups}`}>
        <GroupHeader />
        <GroupList setGroupID={setGroupID} setMobileInfo={setMobileInfo} />
      </div>


      {toggle === 'create' && <HandleGroup />}
      {toggle === 'edit' && (<HandleGroup groupID={groupID} />)}
      {toggle === 'confirm' && <Message />}
      {toggle === 'filter' && <Filter options={{access: false, student: false, subject: false, group: true, createdby: false, status: true}} />}
      {toggle === 'mobile' && mobileInfo && (<MobileInfo info={mobileInfo} />)}
    </section>
  )
}

export default Groups;