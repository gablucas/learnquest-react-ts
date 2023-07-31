import React from 'react';
import { GlobalContext } from '../../../../../GlobalContext';
import DeleteIcon from '../../../../../components/Icons/DeleteIcon';
import EditIcon from '../../../../../components/Icons/EditIcon';
import MoreInfo from '../../../../../components/Icons/MoreInfo';
import Panel from '../../../Panel.module.css';
import useData from '../../../../../hooks/useData';
import { IStudent, IUser } from '../../../../../types/Users';
import { MobileInfoData } from '../../../../../types/Commom';

interface IUsersListProps {
  users: IUser[] | IStudent[],
  setUserID: React.Dispatch<React.SetStateAction<string>>,
  setMobileInfo: React.Dispatch<React.SetStateAction<MobileInfoData[]>>,
}

const UsersList = ({ users, setUserID, setMobileInfo}: IUsersListProps) => {
  const { setConfirm, setToggle } = React.useContext(GlobalContext);
  const { removeUser } = useData();

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
              <button onClick={() => setConfirm({type: 'confirm', text: 'Deseja realmente excluir este usuário?', action: () => handleRemove(m.email)})}><DeleteIcon /></button>
            </>
          )}
        </div>
      ))}
    </>
  )
}

export default UsersList;