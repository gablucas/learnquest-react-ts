import React from 'react';
import Styles from '../Panel.module.css';
import Newuser from "./Newuser";
import useData from '../../../hooks/useData';
import { GlobalContext } from '../../../GlobalContext';

const Users = () => {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const { data } = React.useContext(GlobalContext)
  const { removeUser } = useData();

  return (
    <section className={Styles.users_container}>

      <div className={Styles.users_options}>
        <button onClick={() => setToggle(!toggle)}>Criar usuário +</button>
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
                <button>Editar</button>
                <button onClick={() => removeUser(m.email)}>Excluir</button>
              </>
            )}
          </div>
        ))}
      </div>


      {toggle && <Newuser setToggle={setToggle} />}
    </section>
  )
}

export default Users;