import React from 'react';
import Styles from '../Panel.module.css';
import { GlobalContext } from '../../../GlobalContext';
import Newclass from './components/Newclass';
import useData from '../../../hooks/useData';

const Classes = () => {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const { data } = React.useContext(GlobalContext)
  const { removeClass } = useData();

  return (
    <section className={Styles.classes_container}>

      <div className={Styles.classes_options}>
        <button onClick={() => setToggle(!toggle)}>Criar turma +</button>
      </div>

      <div className={Styles.classes}>

        <div>
          <span>Nome</span>
          <span>Alunos</span>
          <span>Estado</span>
          <span>Editar</span>
          <span>Excluir</span>
        </div>

        {data?.classes.map((m) => (
          <div key={m.id} className={Styles.class}>
            <span>{m.name}</span>
            <span>{m.students.length}</span>
            <span>{m.status === 'active' ? 'Ativado' : 'Desativado'}</span>
            <button>Editar</button>
            <button onClick={() => removeClass(m.id)}>Excluir</button>
          </div>
        ))}
      </div>

      {toggle && <Newclass setToggle={setToggle} />}
    </section>
  )
}

export default Classes;