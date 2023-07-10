import React from 'react';
import Styles from '../Panel.module.css';
import { GlobalContext } from '../../../GlobalContext';
import { Link, useNavigate } from "react-router-dom";
import useData from '../../../hooks/useData';
import { IStudent } from '../../../types/Users';
import Confirm from '../../../components/Confirm/Confirm';
import { ConfirmStateProps } from '../../../types/Commom';

const Lessons = () => {
  const [confirm, setConfirm] = React.useState<ConfirmStateProps>({toggle: false, text: '', action: () => ''})
  const { data } = React.useContext(GlobalContext);
  const { removeLesson } = useData();
  const navigate = useNavigate();

  function handleEdit(id: string): void {
    if (data.users.some((user) => user.access === 'student' && (user as IStudent).lessons.some((lesson) => lesson.id === id))) {
      console.log('Barrou')
    } else {
      navigate(`editar/${id}`);
    }
  }

  function handleRemove(id: string): void {
    removeLesson(id);
  }



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
            <button onClick={() => handleEdit(lesson.id)}>Editar</button>
            <button onClick={() => setConfirm({toggle: true, text: 'A exclusão desta aula também removerá de todos os alunos que já a concluíram, incluindo a XP ganha também. Deseja excluir mesmo assim?', action: () => handleRemove(lesson.id)})}>Deletar</button>
          </div>
        ))}
      </div>

      {confirm?.toggle && <Confirm confirm={confirm} setConfirm={setConfirm} />}
      
    </section>
  )
}

export default Lessons;