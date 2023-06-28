import React from 'react';
import Styles from '../Panel.module.css';
import Newuser from "./Newuser";
import useData from '../../../hooks/useData';
import { GlobalContext } from '../../../GlobalContext';

const Users = () => {
  const { removeUser } = useData();
  const [toggle, setToggle] = React.useState<boolean>(false);
  const { myData } = React.useContext(GlobalContext)

  function handleDelete(email: string) {
    removeUser(email);
  }
  
  return (
    <section className={Styles.userpanel}>
      <button onClick={() => setToggle(!toggle)}>Criar usuário</button>


      <div className={Styles.users}>
        <div>
          <span>Nome</span>
          <span>Email</span>
          <span>Estado</span>
          <span>Editar</span>
          <span>Excluir</span>
          </div>

        {myData && myData.users.map((m) => (
          <div key={m.id} className={Styles.user}>
            <span>{m.nome}</span>
            <span>{m.email}</span>
            <span>{m.status === 'active' ? 'Ativado' : 'Desativado'}</span>
            <button>Editar</button>
            <button onClick={() => handleDelete(m.email)}>Excluir</button>
          </div>
        ))}
      </div>


      {toggle && <Newuser setToggle={setToggle} />}
    </section>
  )
}

export default Users;