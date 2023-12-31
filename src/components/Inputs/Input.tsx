import { UseFormType } from '../../hooks/useForm';
import Styles from './Inputs.module.css';
import Error from '../Helper/Error';

type InputProps = {
  id: string,
  label: string,
  type: string,
}

const Input = ({ id, label, type, error, value, onChange }: InputProps & UseFormType) => {
  
  return (
    <div className={Styles.inputs}>
      <label htmlFor={id}>{label}</label>
      <input type={type} value={value} id={id} onChange={onChange}/>
      {error && <Error>{error}</Error>}
    </div>
  )
}

export default Input