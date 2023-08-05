import React from 'react';
import { GlobalContext } from '../../../../../GlobalContext';
import DeleteIcon from '../../../../../components/Icons/DeleteIcon';
import EditIcon from '../../../../../components/Icons/EditIcon';
import MoreInfo from '../../../../../components/Icons/MoreInfo';
import Panel from '../../../Panel.module.css';
import { IStudent, IUser } from '../../../../../types/Users';
import { MobileInfoData } from '../../../../../types/Commom';
import { useUser } from '../../../../../hooks/useUser';

interface IUsersListProps {
  users: IUser[] | IStudent[],
  setUserID: React.Dispatch<React.SetStateAction<string>>,
  setMobileInfo: React.Dispatch<React.SetStateAction<MobileInfoData[]>>,
}

const UsersList = ({ users, setUserID, setMobileInfo}: IUsersListProps) => {
  const { setConfirm, setToggle } = React.useContext(GlobalContext);
  const { deleteUser } = useUser();

  function handleEdit(userid: string): void {
    setUserID(userid);
    setToggle('edit');
  }

  function handleRemove(email: string): void {
    setToggle('confirm')
    setConfirm({type: 'confirm', text: 'Deseja realmente excluir este usuário?', action: () => deleteUser(email)})
  }

  function handleMobileInfo(user: IUser | IStudent): void {
    const name = {title: 'Nome', description: user.name};
    const email = {title: 'Email', description: user.email};
    const access = {title: 'Acesso', description: user.access};
    const status = {title: 'Estado', description: user.status ? 'Ativado' : 'Desativado'};

    setMobileInfo([name, email, access, status]);
    setToggle('mobile');
  }

  return (
    <>
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
              <button onClick={() => handleRemove(m.email)}><DeleteIcon /></button>
            </>
          )}
        </div>
      ))}
    </>
  )
}

export default UsersList;