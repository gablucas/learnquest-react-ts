import React from 'react';
import Styles from '../HandleLesson.module.css';
import { Task } from '../../../../types/Lessons';
import Question from './question';
import Answer from './answer';
import useRandom from '../../../../hooks/useRandom';
import SelectXP from './selectxp';

interface ITasksProps {
  task: Task[],
  setTask: React.Dispatch<React.SetStateAction<Task[]>>,
}

const Tasks = ({ task, setTask }: ITasksProps) => {
  const { getRandomID } = useRandom();

  function handleCreateQuestion(e: React.MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();
    const addNewQuestion = [...task];
    addNewQuestion.push({id: `T${getRandomID()}`, type: 'open', question: '', answer: '', xp: 25});
    setTask(addNewQuestion);
  }

  function handleTask(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, propertie: string, index?: number): void {
    const updateTask = [...task];

    switch (propertie) {
      case 'question':
        updateTask[index as number].question = e.target.value;
        break;
      case 'answer':
        updateTask[index as number].answer = e.target.value;
        break;
      case 'xp':
        updateTask[index as number].xp = Number(e.target.value);
        break;
    }
    setTask([...updateTask]);
  }

  return (
    <div>
      <h2>Tarefa</h2>
      {task.map((question, questionIndex) => (
        <div key={question.id} className={Styles.questions}>
          <Question index={questionIndex} task={task} setTask={setTask} question={question} handleTask={handleTask} />
          <Answer index={questionIndex} question={question} handleTask={handleTask} />
          <SelectXP index={questionIndex} question={question} handleTask={handleTask} />
        </div>
      ))}
      <button className={Styles.newquestion} onClick={handleCreateQuestion}>Criar nova questão</button>
  </div>
  )
}

export default Tasks