import React from 'react';
import Styles from '../Panel.module.css';
import useData from '../../../hooks/useData';
import { GlobalContext } from '../../../GlobalContext';
import Message from '../../../components/Message/Message';
import HandleUser from './HandleUser';

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
    <section className={Styles.users_container}>

      <div className={Styles.users_options}>
        <button onClick={() => setToggle(true)}>Criar usuário +</button>
      </div>

      <div className={Styles.users}>

        <div>
          <span>Nome</span>
          <span>Email</span>
          <span>Acesso</span>
          <span>Estado</span>
          <span>Editar</span>
          <span>Excluir</span>
        </div>

        {data?.users.map((m, index) => (
          <div key={m.id} className={Styles.user}>
            <span>{m.name}</span>
            <span>{m.email}</span>
            <span>{m.access}</span>
            <span>{m.status ? 'Ativado' : 'Desativado'}</span>
            {index !== 0 && (
              <>
                <button onClick={() => handleEdit(m.id)}>Editar</button>
                <button onClick={() => setConfirm({toggle: true, type: 'confirm', text: 'Deseja realmente excluir este usuário?', action: () => handleRemove(m.email)})}>Excluir</button>
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