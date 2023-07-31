

import { useParams } from 'react-router-dom';
import { Task, TaskStudent } from '../../../../../../types/Lessons';
import Styles from '../../../EvaluateTasks.module.css';
import useDataEvaluate from '../../../hooks/useDataEvaluate';
import Error from '../../../../../../components/Helper/Error';
import useValidate from '../../../../../../hooks/useValidate';

interface IQuestionProps {
  index: number,
  question: Task,
  task: TaskStudent,
  setTask: React.Dispatch<React.SetStateAction<TaskStudent>>,
}

const Question = ({ index, question, task, setTask }: IQuestionProps) => {
  const { id } = useParams();
  const { error } = useValidate();
  const { lessonToEvaluate, lessonInfo } = useDataEvaluate(id);

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

  return (
    <div key={question.id} className={`${Styles.question_wrapper} ${task?.answers[index].isCorrect === true ? Styles.correct : task?.answers[index].isCorrect === false ? Styles.wrong : ' '}`}>

      <div>
        <span>Questão {index + 1}</span>
        <span>{question.question}</span>
      </div>

      <div>
        <span>Reposta do aluno</span>
        <span>{lessonToEvaluate?.answers[index].value}</span>
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
  )
}

export default Question;