import React from 'react';
import Styles from '../EvaluateTasks.module.css';
import { TaskStudent } from "../../../../types/Lessons";
import useValidate from '../../../../hooks/useValidate';
import useDataEvaluate from '../hooks/useDataEvaluate';
import useData from '../../../../hooks/useData';
import { GlobalContext } from '../../../../GlobalContext';
import { useParams } from 'react-router-dom';
import Question from './question';

interface IQuestionsToEvaluate {
  setToggleDoneEvaluate: React.Dispatch<React.SetStateAction<boolean>>,
}

const QuestionsToEvaluate = ({ setToggleDoneEvaluate}: IQuestionsToEvaluate) => {
  const { data } = React.useContext(GlobalContext);
  const { id } = useParams();
  const { evaluateLesson } = useData();
  const { isEmpty } = useValidate();
  const { lessonToEvaluate, lessonInfo, studentInfo } = useDataEvaluate(id);

  const [task, setTask] = React.useState<TaskStudent>(lessonToEvaluate ? {id: lessonToEvaluate.lessonID, answers: [...lessonToEvaluate.answers]} : {id: '', answers: []});

  function handleDoneEvaluate(): void {
    if (task?.answers.every((answer, index) => isEmpty(`answer${index}` ,answer.isCorrect)) && studentInfo && id) {
      evaluateLesson(id, studentInfo.id, task);
      setToggleDoneEvaluate(true);
    }
  }

  if (lessonToEvaluate && lessonInfo && studentInfo)
  return (
    <div className={Styles.container}>
      <h1>{lessonInfo.title}</h1>
      <span>{studentInfo.name} - {data.groups.find((group) => group.students.some((student) => student === studentInfo.id))?.name}</span>

      <div className={Styles.questions}>
        {lessonInfo.task.map((question, index) => (
          <Question key={index} index={index} question={question} task={task} setTask={setTask} />
        ))}
      </div>
      
      <button className={Styles.btn_donevaluate} onClick={handleDoneEvaluate}>Finalizar avaliação</button>
    </div>
  )
}

export default QuestionsToEvaluate;