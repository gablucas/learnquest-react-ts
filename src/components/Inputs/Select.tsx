import Styles from './Inputs.module.css';
import { UseFormType } from '../../hooks/useForm';

type SelectProps = {
  options: {option: string, label: string}[],
}

const Select = ({ options, error, value, onChange }: SelectProps & UseFormType) => {

  return (
    <div className={Styles.inputs}>
      <select onChange={onChange} value={value}>
        <option value=''>Escolha um acesso</option>
        {options.map((o) => (
          <option key={o.option} value={o.option}>{o.label}</option>
        ))}
      </select>
      {error && <span>{error}</span>}
    </div>
  )
}

export default Select;