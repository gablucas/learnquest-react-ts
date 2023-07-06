import React from 'react';
import Styles from '../Panel.module.css';
import { GlobalContext } from '../../../GlobalContext';
import { Link } from "react-router-dom";
import useData from '../../../hooks/useData';

const Lessons = () => {
  const { data } = React.useContext(GlobalContext);
  const { removeLesson } = useData();

  return (
    <section className={Styles.lessons_container}>

      <div className={Styles.lessons_options}>
        <Link to='criar'>Criar aula +</Link>
      </div>

      <div className={Styles.lessons}>
        <div>
          <span>Título</span>
          <span>Criada por</span>
          <span>Matéria</span>
          <span>Questões</span>
          <span>Editar</span>
          <span>Excluir</span>
        </div>

        {data?.lessons.map((lesson) => (
          <div key={lesson.id} className={Styles.lesson}>
            <span>{lesson.title}</span>
            <span>{lesson.createdBy}</span>
            <span>{lesson.subject}</span>
            <span>{lesson.questions.length}</span>
            <button>Editar</button>
            <button onClick={() => removeLesson(lesson.id)}>Deletar</button>
          </div>
        ))}
      </div>
      
    </section>
  )
}

export default Lessons;