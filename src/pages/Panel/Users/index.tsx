import React from 'react';
import Panel from '../Panel.module.css';
import UsersHeaders from './components/users-header';
import UsersList from './components/users-list';
import { GlobalContext } from '../../../GlobalContext';
import { useHelpers } from '../../../hooks/useHelpers';
import { ButtonCreateUser } from './components/button-create-user';
import { ButtonFilterUser } from './components/button-filter-user';
import { ButtonCleanFilter } from '../../../components/button-clean-filter';

const Users = () => {
  const { data } = React.useContext(GlobalContext);
  const { filter } = React.useContext(GlobalContext);
  const { isArrayEmpty, arrayIncludes } = useHelpers();

  let users = data.users;
  if (!isArrayEmpty(filter.access)) users = users.filter((user) => arrayIncludes(filter.access, user.access));
  if (!isArrayEmpty(filter.status)) users = users.filter((user) => arrayIncludes(filter.status, user.status));

  console.log('Users Renderizou')
  
  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <ButtonCreateUser />
        <ButtonFilterUser />
        <ButtonCleanFilter isFiltered={['access', 'status']} />
      </div>

      <div className={`${Panel.info} ${Panel.users}`}>
        <UsersHeaders />
        <UsersList users={users} />
      </div>
    </section>
  )
}

export default Users;