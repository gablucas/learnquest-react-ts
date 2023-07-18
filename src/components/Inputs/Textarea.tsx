import { UseFormType } from '../../hooks/useForm';
import Styles from './Inputs.module.css';

type TextareaProps = {
  label: string,
  rows: number,
}

const Textarea = ({ label, rows, error, value, onChange }: TextareaProps & UseFormType) => {
  
  return (
    <div className={Styles.inputs}>
      <label>{label}</label>
      <textarea value={value} onChange={onChange} rows={rows}/>
      {error && <span>{error}</span>}
    </div>
  )
}

export default Textarea;