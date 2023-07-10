import React from 'react';
import Styles from '../Panel.module.css';
import Newsubject from "./Newsubject";
import useData from '../../../hooks/useData';
import { GlobalContext } from '../../../GlobalContext';

const Subjects = () => {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const { data } = React.useContext(GlobalContext)
  const { removeSubject } = useData();

  return (
    <section className={Styles.subjects_container}>

      <div className={Styles.subjects_options}>
        <button onClick={() => setToggle(!toggle)}>Criar matéria +</button>
      </div>

      <div className={Styles.subjects}>

        <div>
          <span>Nome</span>
          <span>Estado</span>
          <span>Editar</span>
          <span>Excluir</span>
          <span>Aulas</span>
        </div>

        {data?.subjects.map((m) => (
          <div key={m.id} className={Styles.subject}>
            <span>{m.name}</span>
            <span>{m.status ? 'Ativado' : 'Desativado'}</span>
            <button>Editar</button>
            <button onClick={() => removeSubject(m.id)}>Excluir</button>
            <span>{data.lessons.map((lesson) => lesson.subject === m.id).length}</span>
          </div>
        ))}
      </div>


      {toggle && <Newsubject setToggle={setToggle} />}
    </section>
  )
}

export default Subjects;