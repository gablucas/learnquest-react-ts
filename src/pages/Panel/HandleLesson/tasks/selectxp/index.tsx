import { Task } from "../../../../../types/Lessons";

interface ISelectXPProps {
  index: number,
  question: Task,
  handleTask: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, propertie: string, index?: number) => void,
}

const SelectXP = ({ index, question, handleTask }: ISelectXPProps) => {

  return (
    <div>
      <label>XP</label>
      <select name='xp' value={question.xp} onChange={(e)=> handleTask(e, 'xp', index)}>
        <option value="25">25 XP</option>
        <option value="50">50 XP</option>
        <option value="75">75 XP</option>
        <option value="100">100 XP</option>
      </select>
    </div>
  )
}

export default SelectXP;