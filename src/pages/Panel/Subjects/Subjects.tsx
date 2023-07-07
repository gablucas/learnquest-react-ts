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
    <section className={Styles.users_container}>

      <div className={Styles.users_options}>
        <button onClick={() => setToggle(!toggle)}>Criar matéria +</button>
      </div>

      <div className={Styles.users}>

        <div>
          <span>Nome</span>
          <span>Editar</span>
          <span>Excluir</span>
          <span>Aulas</span>
        </div>

        {data?.subjects.map((m) => (
          <div key={m} className={Styles.user}>
            <span>{m}</span>
            <button>Editar</button>
            <button onClick={() => removeSubject(m)}>Excluir</button>
            <span>{data.lessons.map((lesson) => lesson.subject === m).length}</span>
          </div>
        ))}
      </div>


      {toggle && <Newsubject setToggle={setToggle} />}
    </section>
  )
}

export default Subjects;