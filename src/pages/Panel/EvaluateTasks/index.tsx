import React from 'react';
import QuestionsToEvaluate from './components/questions-to-evaluate';

import PageNotFound from '../../../components/PageNotFount';
import { Navigate, useParams } from "react-router-dom";
import { getLoggedUser } from '../../../helpers/user/getLoggedUser';
import { checkEvaluateLesson } from '../../../helpers/lesson/checkEvaluateLesson';

const EvaluateTask = () => {
  const loggedUser = getLoggedUser();
  const [toggleDoneEvaluate, setToggleDoneEvaluate] = React.useState<boolean>(false);
  const { id } = useParams();
  const { lessonInfo } = checkEvaluateLesson(id)

  if (toggleDoneEvaluate) return (<PageNotFound title='Tarefa avaliada com sucesso' path='/painel/avaliar' />)
  else if (!lessonInfo) return (<PageNotFound title='Esta tarefa não existe' path='/painel/avaliar' />)
  else if (loggedUser?.access !== 'admin' && loggedUser?.id !== lessonInfo.createdby) return <Navigate to='/painel/avaliar' />
  else return (<QuestionsToEvaluate setToggleDoneEvaluate={setToggleDoneEvaluate} />)
}

export default EvaluateTask;