import React from 'react';
import QuestionsToEvaluate from './components/questions-to-evaluate';
import useData from '../../../hooks/useData';
import useDataEvaluate from './hooks/useDataEvaluate';
import PageNotFound from '../../../components/PageNotFount';
import { Navigate, useParams } from "react-router-dom";

const EvaluateTask = () => {
  const { getLoggedUser } = useData();
  const loggedUser = getLoggedUser();
  const [toggleDoneEvaluate, setToggleDoneEvaluate] = React.useState<boolean>(false);
  const { id } = useParams();
  const { lessonInfo } = useDataEvaluate(id)

  if (!lessonInfo) return (<PageNotFound title='Esta tarefa não existe' path='/painel/avaliar' />)
  else if (loggedUser?.access !== 'admin' && loggedUser?.id !== lessonInfo.createdby) return <Navigate to='/painel/avaliar' />
  else if (toggleDoneEvaluate) return (<PageNotFound title='Tarefa avaliada com sucesso' path='/painel/avaliar' />)
  else return (<QuestionsToEvaluate setToggleDoneEvaluate={setToggleDoneEvaluate} />)
}

export default EvaluateTask;