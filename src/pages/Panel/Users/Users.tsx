import React from 'react';
import Panel from '../Panel.module.css';
import useData from '../../../hooks/useData';
import { GlobalContext } from '../../../GlobalContext';
import Message from '../../../components/Message/Message';
import HandleUser from './HandleUser';
import DeleteIcon from '../../../components/Icons/DeleteIcon';
import EditIcon from '../../../components/Icons/EditIcon';
import MoreInfo from '../../../components/Icons/MoreInfo';
import { MobileInfoData } from '../../../types/Commom';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import { IStudent, IUser } from '../../../types/Users';
import Filter from '../../../components/Filter/Filter';
import FilterIcon from '../../../components/Icons/FilterIcon';
import useHelpers from '../../../hooks/useHelpers';

const Users = () => {
  const { confirm, setConfirm, filter, setFilter } = React.useContext(GlobalContext);
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [toggleEdit, setToggleEdit] = React.useState<boolean>(false);
  const [toggleFilter, setToggleFilter] = React.useState<boolean>(false);
  const { isArrayEmpty, arrayIncludes } = useHelpers();

  const [userID, setUserID] = React.useState<string>('');
  const { data } = React.useContext(GlobalContext);
  const { removeUser } = useData();

  const [toggleMobile, setToggleMobile] = React.useState(false);
  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoData[]>([{title: '', description: ''}]);

  let users = data.users;
  if (!isArrayEmpty(filter.access)) users = users.filter((user) => arrayIncludes(filter.access, user.access));
  if (!isArrayEmpty(filter.status)) users = users.filter((user) => arrayIncludes(filter.status, user.status));
  
  function handleEdit(userid: string): void {
    setUserID(userid);
    setToggleEdit(true);
  }

  function handleRemove(email: string): void {
    removeUser(email);
  }

  function handleMobileInfo(user: IUser | IStudent): void {
    const email = {title: 'Email', description: user.email};
    const access = {title: 'Acesso', description: user.access};
    const status = {title: 'Estado', description: user.status ? 'Ativado' : 'Desativado'};

    setMobileInfo([email, access, status]);
    setToggleMobile(true);
  }

  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <button onClick={() => setToggle(true)}>Criar usuário +</button>
        <button onClick={() => setToggleFilter(true)} className={!isArrayEmpty(filter.access) || !isArrayEmpty(filter.status) ? Panel.filter : ''} >Filtrar <FilterIcon /></button>
        {(!isArrayEmpty(filter.access) || !isArrayEmpty(filter.status)) && (<button onClick={() => setFilter({...filter, access: [], status: []})} className={Panel.cleanfilter}>Limpar filtro</button>)}
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
                <button onClick={() => setConfirm({toggle: true, type: 'confirm', text: 'Deseja realmente excluir este usuário?', action: () => handleRemove(m.email)})}><DeleteIcon /></button>
              </>
            )}
          </div>
        ))}
      </div>


      {toggle && (<HandleUser setToggle={setToggle} />)}
      {toggleEdit && (<HandleUser setToggle={setToggleEdit} userID={userID} />)}
      {confirm.toggle && <Message />}
      {toggleFilter && <Filter options={{access: true, student: false, subject: false, group: false, createdby: false, status: true}} setToggle={setToggleFilter} />}
      {toggleMobile && mobileInfo && (<MobileInfo info={mobileInfo} setToggle={setToggleMobile} />)}
    </section>
  )
}

export default Users;