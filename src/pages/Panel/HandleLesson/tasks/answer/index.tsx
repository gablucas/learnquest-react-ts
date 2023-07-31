import React from 'react';
import Styles from '../../HandleLesson.module.css';
import Error from "../../../../../components/Helper/Error";
import useValidate from "../../../../../hooks/useValidate";
import { Task } from '../../../../../types/Lessons';

interface IAnswer {
  index: number,
  question: Task,
  handleTask: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, propertie: string, index?: number) => void,
}

const Answer = ({ index, question, handleTask }: IAnswer) => {
  const { error } = useValidate();

  return (
    <div className={Styles.answers}>
      <label>Resposta <span>(Para comparar com a resposta do aluno ao avaliar)</span></label>
      <textarea rows={5} value={question.answer} onChange={(e) => handleTask(e, 'answer', index)}/>
      {error === `answer${index}` && (<Error>Campo vazio</Error>)}
    </div>
  )
}

export default Answer;