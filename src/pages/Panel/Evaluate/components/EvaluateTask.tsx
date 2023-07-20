import React from 'react';
import Styles from '../EvaluateTasks.module.css';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from '../../../../GlobalContext';
import { TaskStudent } from '../../../../types/Lessons';
import useData from '../../../../hooks/useData';
import useValidate from '../../../../hooks/useValidate';
import Error from '../../../../components/Helper/Error';

const EvaluateTask = () => {
  const { data } = React.useContext(GlobalContext);
  const { id } = useParams();
  const { getLoggedUser, evaluateLesson } = useData();
  const [task, setTask] = React.useState<TaskStudent>();
  const navigate = useNavigate();
  const loggedUser = getLoggedUser();
  const { isEmpty, error } = useValidate();


  const lessonToEvaluate = data.evaluate.find((lesson) => lesson.id === id);
  const lessonInfo = data.lessons.find((lesson) => lesson.id === lessonToEvaluate?.lessonID);
  const userInfo =  data.users.find((user) => user.id === lessonToEvaluate?.student);

  React.useEffect(() => {
    if (lessonToEvaluate) {
      setTask({id: lessonToEvaluate.lessonID, answers: [...lessonToEvaluate.answers]})
    }
  }, [lessonToEvaluate])


  function handleEvaluate(index: number, isCorrect: boolean): void {

    if (task && lessonInfo) {
      setTask({...task, answers: task.answers.map((answer, indexMap) => {
        if (indexMap === index) {
          return {...answer, isCorrect, xp: isCorrect ? lessonInfo.task[index].xp : 0}
        }

        return answer;
      })})
    }
  }
  
  function handleDoneEvaluate(): void {
    if (task?.answers.every((answer, index) => isEmpty(`answer${index}` ,answer.isCorrect)) && userInfo && id) {
      evaluateLesson(id, userInfo.id, task);
      navigate('/painel/avaliar');
    }
  }

  if (loggedUser?.access !== 'admin' && loggedUser?.id !== lessonToEvaluate?.createdBy)
  return <Navigate to='/painel/avaliar' />

  if (lessonToEvaluate && lessonInfo && userInfo)
  return (
    <div className={Styles.evaluatelesson}>
      <h1>{lessonInfo.title}</h1>
      <h2>Avaliação feita por: {userInfo?.name} - {data.groups.find((group) => group.students.some((student) => student === userInfo.id))?.name}</h2>

      <div>
        {lessonInfo.task.map((question, index) => (
          <div key={question.id} className={`${Styles.question_wrapper} ${task?.answers[index].isCorrect === true ? Styles.correct : task?.answers[index].isCorrect === false ? Styles.wrong : ' '}`}>

            <div>
              <span>Questão {index + 1}</span>
              <span>{question.question}</span>
            </div>

            <div>
              <span>Reposta do aluno</span>
              <span>{lessonToEvaluate.answers[index].value}</span>
            </div>

            <div>
              <span>Sua resposta</span>
              <span>{question.answer}</span>
            </div>

            <div className={Styles.buttons}>
              <button onClick={() => handleEvaluate(index, true)}>Correto</button>
              <button onClick={() => handleEvaluate(index, false)}>Errado</button>
            </div>

            {error === `answer${index}` && (<Error>Essa questão precisa ser avaliada</Error>)}
          </div>
        ))}
      </div>

      <button className={Styles.btn_donevaluate} onClick={handleDoneEvaluate}>Finalizar avaliação</button>

    </div>
  )
}

export default EvaluateTask;