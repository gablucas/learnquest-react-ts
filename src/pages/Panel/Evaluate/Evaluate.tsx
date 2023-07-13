import React from 'react';
import { Link } from 'react-router-dom';
import Styles from '../Panel.module.css';
import { GlobalContext } from '../../../GlobalContext';

const Evaluate = () => {
  const { data } = React.useContext(GlobalContext);

  return (
    <section className={Styles.evaluate_container}>

    <div className={Styles.evaluate_options}>
      <Link to='criar'>Criar aula +</Link>
    </div>

    <div className={Styles.evaluate}>
      <div>
        <span>Título</span>
        <span>Aluno</span>
        <span>Criada por</span>
        <span>Matéria</span>
        <span>Avaliar</span>
      </div>

     {data.evaluate.map((lesson, index) => (
      <div key={index}>
        <span>{data.lessons.find((l) => l.id === lesson.id)?.title}</span>
        <span>{data.users.find((u) => u.id === lesson.student)?.nome}</span>
        <span>{data.lessons.find((l) => l.id === lesson.id)?.createdBy}</span>
        <span>{data.subjects.find((s) => s.id === lesson.subject)?.name}</span>
        <Link to={`/painel/avaliar/${lesson.evaluateID}`}>Avaliar</Link>
      </div>
     ))}
    </div>

  
  </section>
  )
}

export default Evaluate;