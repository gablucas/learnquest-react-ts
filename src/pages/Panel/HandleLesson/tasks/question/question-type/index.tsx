import { Task } from '../../../../../../types/Lessons';
import { generateRandomID } from '../../../../../../utils/generateRandomID';
import Styles from '../../../HandleLesson.module.css';

interface IQuestionType {
  index: number,
  task: Task[],
  setTask: React.Dispatch<React.SetStateAction<Task[]>>,
}

const QuestionType = ({ index, task, setTask }: IQuestionType) => {

  function changeTaskType(e: React.ChangeEvent<HTMLInputElement>, index: number): void {
    const type = e.target.value;
    const updateTask = [...task];

    if (type === `open${index}`) {
      updateTask[index].type = 'open';
      delete updateTask[index].options;
    } else if (type === `alternatives${index}`) {
      updateTask[index].type = 'alternatives';
      updateTask[index].options = [{id: `O${generateRandomID()}`, option: ''}, {id: `O${generateRandomID()}`, option: ''}];
    }

    setTask(updateTask);
  }

  return (
    <div className={Styles.questiontype}>
          
      <div>
        <input type="radio" name={`question${index}`} id={`open${index}`} value={`open${index}`} defaultChecked onChange={(e) => changeTaskType(e, index)}/>
        <label htmlFor='open'>Questão aberta</label>
      </div>

      <div>
        <input type="radio" name={`question${index}`} id={`alternatives${index}`}  value={`alternatives${index}`}  onChange={(e) => changeTaskType(e, index)}/>
        <label htmlFor='alternatives'>Questão com alternativas</label>
      </div>
    </div>
  )
}

export default QuestionType;