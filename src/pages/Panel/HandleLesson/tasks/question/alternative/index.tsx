import React from 'react';
import Styles from '../../../HandleLesson.module.css';
import { Task, TaskOptions } from '../../../../../../types/Lessons';
import useRandom from '../../../../../../hooks/useRandom';
import Error from '../../../../../../components/Helper/Error';
import useValidate from '../../../../../../hooks/useValidate';

interface IAlternativeProps {
  questionIndex: number,
  question: Task,
  task: Task[],
  setTask: React.Dispatch<React.SetStateAction<Task[]>>,
}

const Alternative = ({ questionIndex, question, task, setTask }: IAlternativeProps) => {
  const { error } = useValidate();
  const { getRandomID } = useRandom();

  function handleAddAlternative(e: React.MouseEvent<HTMLButtonElement> ,index: number): void {
    e.preventDefault();
    const updateTask = [...task];
    updateTask[index].options?.push({id: `O${getRandomID()}`, option: ''});
    setTask(updateTask);
  }

  function handleTaskAlternative(e: React.ChangeEvent<HTMLInputElement>, index: number, optionIndex: number): void {
    const updateTask = [...task];

    (updateTask[index].options as TaskOptions[])[optionIndex].option = e.target.value;
    setTask(updateTask);
  }


  return (
    <div className={Styles.alternatives}>
    {question.options?.map((option, optionIndex) => (
      <div key={option.id}>
        <label htmlFor="">Alternativa {optionIndex + 1}</label>
        <input type='text' value={option.option} onChange={(e) => handleTaskAlternative(e, questionIndex, optionIndex)}/>
        {error === `alternative-t${questionIndex}-o${optionIndex}` && (<Error>Campo vazio</Error>)}
      </div>
    ))}
    <button className={Styles.newalternative} onClick={(e) => handleAddAlternative(e, questionIndex)}>Adicionar alternativa</button>
  </div>
  )
}

export default Alternative