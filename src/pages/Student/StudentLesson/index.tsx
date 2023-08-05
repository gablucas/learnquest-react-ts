import React from 'react';
import { GlobalContext } from '../../../GlobalContext';
import { useParams } from 'react-router-dom';
import { IStudent } from '../../../types/Users';
import PageNotFound from '../../../components/PageNotFount';
import StudentLesson from './student-lesson';
import useToggle from '../../../hooks/useToggle';
import { getLoggedUser } from '../../../helpers/user/getLoggedUser';
import { getLesson } from '../../../helpers/lesson/getLesson';

const StudentHandleLesson = () => {
  const { data } = React.useContext(GlobalContext);
  const { id } = useParams();
  const doneLesson = useToggle();
  const student = getLoggedUser() as IStudent;


  if (doneLesson.toggle) 
    return <PageNotFound title='Aula finalizada com sucesso' message='A tarefa entrou na fila para ser avaliada' path='/estudante/aulas' />

  else if (student.lessons.some((student) => student.id === id) || data.evaluate.some((evaluate) => evaluate.lessonID === id && evaluate.student === student.id)) 
    return (<PageNotFound title='Você ja fez essa aula' message='Verifique em "Minhas informações" em "Aulas finalizadas" ou com um responsável pela aula' path='/estudante/aulas' />)

  else if (!doneLesson.toggle && id && getLesson(id)) 
    return (<StudentLesson student={student} toggleDoneLesson={doneLesson.handleToggle} />)
    
  else 
    return (<PageNotFound title='Essa aula não existe' message='Verifique com um responsável' path='/estudante/aulas' />) 
  }

export default StudentHandleLesson;