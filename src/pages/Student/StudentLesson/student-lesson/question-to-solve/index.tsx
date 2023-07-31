import Styles from '../../StudentLesson.module.css';
import { IEvaluateTask, ILesson, Task } from "../../../../../types/Lessons";
import useValidate from '../../../../../hooks/useValidate';
import Error from '../../../../../components/Helper/Error';

interface IQuestionToSolveProps {
  index: number,
  question: Task,
  lesson: ILesson | undefined,
  answer: IEvaluateTask | undefined,
  setAnswer: React.Dispatch<React.SetStateAction<IEvaluateTask | undefined>>,
}

const QuestionToSolve = ({ index, question, lesson, answer, setAnswer }: IQuestionToSolveProps) => {
  const { error } = useValidate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void {
    if (answer) {
      const newAnswer = {...answer};
      newAnswer.answers[index].value = e.target.value;
      setAnswer(newAnswer);
    }
  }

  if (lesson && answer)
    return (
      <div key={question.id}>

        <span>{question.question}</span>
        {question.type === 'alternatives' ? 
          (
            <>
              {question.options?.map((alternatives) => (
                <div key={alternatives.id} className={Styles.task_alternatives}>
                  <input type='radio' id={alternatives.id} name={question.id} value={alternatives.option} onChange={(e) => handleChange(e, index)} />
                  <label htmlFor={alternatives.id}>{alternatives.option}</label>
                </div>
              ))}
            </>
          ) : question.type === 'open' ? (
            <>
              <textarea rows={5} value={answer.answers[index].value} onChange={(e) => handleChange(e, index)}/>
            </>
          ) : (
            <></>
          )
        }
        
        {error === `answer${index}` && (<Error>{lesson.task[index].type === 'open' ? 'Campo vazio' : 'Selecione uma opção'}</Error>)}
      </div>
    )
}

export default QuestionToSolve;