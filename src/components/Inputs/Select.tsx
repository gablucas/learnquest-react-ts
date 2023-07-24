import Styles from './Inputs.module.css';
import { UseFormType } from '../../hooks/useForm';

type SelectProps = {
  label: string,
  options: {name: string, value: string}[],
}

const Select = ({ label, options, error, value, onChange }: SelectProps & UseFormType) => {

  return (
    <div className={Styles.inputs}>
      <label>{label}</label>
      <select onChange={onChange} value={value}>
        <option value=''>Selecione uma opção</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.name}</option>
        ))}
      </select>
      {error && <span>{error}</span>}
    </div>
  )
}

export default Select;