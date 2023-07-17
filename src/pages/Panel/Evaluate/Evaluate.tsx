import React from 'react';
import { Link } from 'react-router-dom';
import Styles from '../Panel.module.css';
import { GlobalContext } from '../../../GlobalContext';
import useData from '../../../hooks/useData';

const Evaluate = () => {
  const { data } = React.useContext(GlobalContext);
  const { getLoggedUser, getUser } = useData();
  const loggedUser = getLoggedUser();
  const evaluate = loggedUser?.access === 'admin' ? data.evaluate : data.evaluate.filter((e) => e.createdBy === loggedUser?.id);

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

     {evaluate.map((lesson, index) => (
      <div key={index}>
        <span>{data.lessons.find((l) => l.id === lesson.id)?.title}</span>
        <span>{getUser(lesson.student)?.name}</span>
        <span>{getUser(lesson.createdBy)?.name}</span>
        <span>{data.subjects.find((s) => s.id === lesson.subject)?.name}</span>
        <Link to={`/painel/avaliar/${lesson.evaluateID}`}>Avaliar</Link>
      </div>
     ))}
    </div>

  
  </section>
  )
}

export default Evaluate;