import React from 'react';
import Panel from '../Panel.module.css';
import useData from '../../../hooks/useData';
import Message from '../../../components/Message/Message';
import HandleUser from './components/HandleUser';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import Filter from '../../../components/Filter/Filter';
import useHelpers from '../../../hooks/useHelpers';
import DeleteIcon from '../../../components/Icons/DeleteIcon';
import EditIcon from '../../../components/Icons/EditIcon';
import MoreInfo from '../../../components/Icons/MoreInfo';
import FilterIcon from '../../../components/Icons/FilterIcon';
import { GlobalContext } from '../../../GlobalContext';
import { MobileInfoData } from '../../../types/Commom';
import { IStudent, IUser } from '../../../types/Users';

const Users = () => {
  const { setConfirm, filter, toggle, setToggle } = React.useContext(GlobalContext);
  const { isArrayEmpty,  isAnyArrayFilled, arrayIncludes, cleanFilter } = useHelpers();

  const [userID, setUserID] = React.useState<string>('');
  const { data } = React.useContext(GlobalContext);
  const { removeUser } = useData();

  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoData[]>([{title: '', description: ''}]);

  let users = data.users;
  if (!isArrayEmpty(filter.access)) users = users.filter((user) => arrayIncludes(filter.access, user.access));
  if (!isArrayEmpty(filter.status)) users = users.filter((user) => arrayIncludes(filter.status, user.status));
  
  function handleEdit(userid: string): void {
    setUserID(userid);
    setToggle('edit');
  }

  function handleRemove(email: string): void {
    removeUser(email);
  }

  function handleMobileInfo(user: IUser | IStudent): void {
    const email = {title: 'Email', description: user.email};
    const access = {title: 'Acesso', description: user.access};
    const status = {title: 'Estado', description: user.status ? 'Ativado' : 'Desativado'};

    setMobileInfo([email, access, status]);
    setToggle('edit');
  }

  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <button onClick={() => setToggle('create')}>Criar usuário +</button>
        <button onClick={() => setToggle('filter')} className={isAnyArrayFilled([filter.access, filter.status]) ? Panel.filter : ''} >Filtrar <FilterIcon /></button>
        {isAnyArrayFilled([filter.access, filter.status]) && (<button onClick={() => cleanFilter()} className={Panel.cleanfilter}>Limpar filtro</button>)}
      </div>

      <div className={`${Panel.info} ${Panel.users}`}>

        <div>
          <span>Nome</span>
          <span>Email</span>
          <span>Acesso</span>
          <span>Estado</span>
          <span className={Panel.mobile}>Informações</span>
          <span>Editar</span>
          <span>Excluir</span>
        </div>

        {users.map((m) => (
          <div key={m.id} className={Panel.user}>
            <span>{m.name}</span>
            <span>{m.email}</span>
            <span>{m.access === 'admin' ? 'Admin' : m.access === 'teacher' ? 'Professor' : 'Aluno'}</span>
            <span>{m.status === 'active' ? 'Ativado' : 'Desativado'}</span>
            <button className={Panel.mobile} onClick={() => handleMobileInfo(m)} ><MoreInfo /></button>
            {m.id !== 'U1' && (
              <>
                <button onClick={() => handleEdit(m.id)}><EditIcon /></button>
                <button onClick={() => setConfirm({type: 'confirm', text: 'Deseja realmente excluir este usuário?', action: () => handleRemove(m.email)})}><DeleteIcon /></button>
              </>
            )}
          </div>
        ))}
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