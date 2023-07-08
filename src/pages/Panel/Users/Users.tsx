import React from 'react';
import Styles from '../Panel.module.css';
import Newuser from "./Newuser";
import useData from '../../../hooks/useData';
import { GlobalContext } from '../../../GlobalContext';
import EditUser from './EditUser';

const Users = () => {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [toggleEdit, setToggleEdit] = React.useState<boolean>(false);
  const [userID, setUserID] = React.useState<string>('');
  const { data } = React.useContext(GlobalContext)
  const { removeUser } = useData();

  function handleEdit(userid: string): void {
    setUserID(userid);
    setToggleEdit(true);
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
            <span>{m.nome}</span>
            <span>{m.email}</span>
            <span>{m.access}</span>
            <span>{m.status === 'active' ? 'Ativado' : 'Desativado'}</span>
            {index !== 0 && (
              <>
                <button onClick={() => handleEdit(m.id)}>Editar</button>
                <button onClick={() => removeUser(m.email)}>Excluir</button>
              </>
            )}
          </div>
        ))}
      </div>


      {toggle && (<Newuser setToggle={setToggle} />)}
      {toggleEdit && (<EditUser setToggle={setToggleEdit} userID={userID} />)}
    </section>
  )
}

export default Users;