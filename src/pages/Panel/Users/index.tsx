import React from 'react';
import Panel from '../Panel.module.css';
import Message from '../../../components/Message/Message';
import HandleUser from './components/handle-user';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import Filter from '../../../components/Filter/Filter';
import { useHelpers } from '../../../hooks/useHelpers';
import FilterIcon from '../../../components/Icons/FilterIcon';
import { GlobalContext } from '../../../GlobalContext';
import { MobileInfoData } from '../../../types/Commom';
import UsersHeaders from './components/users-header';
import UsersList from './components/users-list';

const Users = () => {
  const { data } = React.useContext(GlobalContext);
  const { filter, toggle, setToggle } = React.useContext(GlobalContext);
  const { isArrayEmpty,  isAnyArrayFilled, arrayIncludes, cleanFilter } = useHelpers();
  const [userID, setUserID] = React.useState<string>('');
  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoData[]>([{title: '', description: ''}]);

  let users = data.users;
  if (!isArrayEmpty(filter.access)) users = users.filter((user) => arrayIncludes(filter.access, user.access));
  if (!isArrayEmpty(filter.status)) users = users.filter((user) => arrayIncludes(filter.status, user.status));
  
  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <button onClick={() => setToggle('create')}>Criar usuário +</button>
        <button onClick={() => setToggle('filter')} className={isAnyArrayFilled([filter.access, filter.status]) ? Panel.filter : ''} >Filtrar <FilterIcon /></button>
        {isAnyArrayFilled([filter.access, filter.status]) && (<button onClick={() => cleanFilter()} className={Panel.cleanfilter}>Limpar filtro</button>)}
      </div>

      <div className={`${Panel.info} ${Panel.users}`}>
        <UsersHeaders />
        <UsersList users={users} setUserID={setUserID} setMobileInfo={setMobileInfo} />
      </div>


      {toggle === 'create' && (<HandleUser />)}
      {toggle === 'edit' && (<HandleUser userID={userID} />)}
      {toggle === 'confirm' && <Message />}
      {toggle === 'filter' && <Filter options={{access: true, student: false, subject: false, group: false, createdby: false, status: true}} />}
      {toggle === 'mobile' && mobileInfo && (<MobileInfo info={mobileInfo} />)}
    </section>
  )
}

export default Users;