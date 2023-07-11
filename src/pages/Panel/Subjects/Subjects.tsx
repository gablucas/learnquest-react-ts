import React from 'react';
import Styles from '../Panel.module.css';
import Newsubject from "./Newsubject";
import useData from '../../../hooks/useData';
import { GlobalContext } from '../../../GlobalContext';
import Confirm from '../../../components/Confirm/Confirm';

const Subjects = () => {
  const { data, confirm, setConfirm } = React.useContext(GlobalContext)
  const [toggle, setToggle] = React.useState<boolean>(false);
  const { removeSubject } = useData();

  function handleRemoveSubject(id: string): void {
    removeSubject(id);
  }

  return (
    <section className={Styles.subjects_container}>

      <div className={Styles.subjects_options}>
        <button onClick={() => setToggle(!toggle)}>Criar matéria +</button>
      </div>

      <div className={Styles.subjects}>

        <div>
          <span>Nome</span>
          <span>Aulas</span>
          <span>Estado</span>
          <span>Editar</span>
          <span>Excluir</span>
        </div>

        {data?.subjects.map((m) => (
          <div key={m.id} className={Styles.subject}>
            <span>{m.name}</span>
            <span>{data.lessons.map((lesson) => lesson.subject === m.id).length}</span>
            <span>{m.status ? 'Ativado' : 'Desativado'}</span>
            <button>Editar</button>
            <button onClick={() => setConfirm({toggle: true, text: 'Deseja realmente excluir está matéria?', action: () => handleRemoveSubject(m.id)})}>Excluir</button>
          </div>
        ))}
      </div>


      {toggle && <Newsubject setToggle={setToggle} />}
      {confirm.toggle && <Confirm />}
    </section>
  )
}

export default Subjects;