import React from 'react';
import Styles from '../../HandleLesson.module.css';
import { Task } from "../../../../../types/Lessons";
import Error from '../../../../../components/Helper/Error';
import useValidate from '../../../../../hooks/useValidate';
import Alternative from './alternative';
import QuestionType from './question-type';

interface QuestionProps {
  index: number,
  question: Task,
  task: Task[],
  setTask: React.Dispatch<React.SetStateAction<Task[]>>,
  handleTask: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, propertie: string, index?: number) => void
}

const Question = ({ index, question, task, setTask, handleTask }: QuestionProps) => {
  const { error } = useValidate();

  return (
    <div className={Styles.question}>

      <QuestionType index={index} task={task} setTask={setTask} />

      <label>Questão {index + 1}</label>
      <textarea rows={5} value={question.question} onChange={(e) => handleTask(e, 'question', index)}/>
      {error === `question${index}` && (<Error>Campo vazio</Error>)}

      {question.type === 'alternatives' && 
        (
          <Alternative questionIndex={index} question={question} task={task} setTask={setTask} />
        )}
    </div>

  )
}

export default Question;