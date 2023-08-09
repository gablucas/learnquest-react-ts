import React from 'react';
import Panel from '../../../Panel.module.css';
import { ButtonEditUser } from '../button-edit-user';
import { ButtonMobileInfo } from '../../../../../components/button-mobile-info';
import { ButtonDeleteUser } from '../button-delete-user';
import { GlobalContext } from '../../../../../GlobalContext';
import { useHelpers } from '../../../../../hooks/useHelpers';

const UsersList = () => {
  const { data } = React.useContext(GlobalContext);
  const { filter } = React.useContext(GlobalContext);
  const { isArrayEmpty, arrayIncludes } = useHelpers();

  let users = data.users;
  if (!isArrayEmpty(filter.access)) users = users.filter((user) => arrayIncludes(filter.access, user.access));
  if (!isArrayEmpty(filter.status)) users = users.filter((user) => arrayIncludes(filter.status, user.status));

  console.log('List Users Renderizou')

  return (
    <>
      {users.map((user) => (
        <div key={user.id} className={Panel.user}>
          <span>{user.name}</span>
          <span>{user.email}</span>
          <span>{user.access === 'admin' ? 'Admin' : user.access === 'teacher' ? 'Professor' : 'Aluno'}</span>
          <span>{user.status === 'active' ? 'Ativado' : 'Desativado'}</span>
          <ButtonMobileInfo info={[['Nome', user.name], ['Email', user.email], ['Acesso', user.access], ['Estado', user.status ? 'Ativado' : 'Desativado']]} />
          {user.id !== 'U1' && (
            <>
              <ButtonEditUser userID={user.id} />
              <ButtonDeleteUser userID={user.id} />
            </>
          )}
        </div>
      ))}
    </>
  )
}

export default UsersList;