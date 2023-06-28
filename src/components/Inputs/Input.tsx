import { UseFormType } from '../../hooks/useForm';
import Styles from './Inputs.module.css';

type InputProps = {
  label: string,
  type: string,
}

const Input = ({ label, type, error, value, onChange }: InputProps & UseFormType) => {
  
  return (
    <div className={Styles.inputs}>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange}/>
      {error && <span>{error}</span>}
    </div>
  )
}

export default Input