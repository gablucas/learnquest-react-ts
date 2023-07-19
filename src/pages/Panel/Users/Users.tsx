import React from 'react';
import Panel from '../Panel.module.css';
import useData from '../../../hooks/useData';
import { GlobalContext } from '../../../GlobalContext';
import Message from '../../../components/Message/Message';
import HandleUser from './HandleUser';
import DeleteIcon from '../../../components/Icons/DeleteIcon';
import EditIcon from '../../../components/Icons/EditIcon';

const Users = () => {
  const { confirm, setConfirm } = React.useContext(GlobalContext);
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [toggleEdit, setToggleEdit] = React.useState<boolean>(false);
  
  const [userID, setUserID] = React.useState<string>('');
  const { data } = React.useContext(GlobalContext);
  const { removeUser } = useData();

  function handleEdit(userid: string): void {
    setUserID(userid);
    setToggleEdit(true);
  }

  function handleRemove(email: string): void {
    removeUser(email);
  }

  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <button onClick={() => setToggle(true)}>Criar usuário +</button>
      </div>

      <div className={`${Panel.info} ${Panel.users}`}>

        <div>
          <span>Nome</span>
          <span>Email</span>
          <span>Acesso</span>
          <span>Estado</span>
          <span>Editar</span>
          <span>Excluir</span>
        </div>

        {data?.users.map((m, index) => (
          <div key={m.id} className={Panel.user}>
            <span>{m.name}</span>
            <span>{m.email}</span>
            <span>{m.access}</span>
            <span>{m.status ? 'Ativado' : 'Desativado'}</span>
            {index !== 0 && (
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
    </section>
  )
}

export default Users;