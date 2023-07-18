import Styles from './Inputs.module.css';

type InputProps = {
  label: string,
  type: string,
}

const NewInput = ({ label, type }: InputProps) => {

  function handleChange(): void {

  }
  
  return (
    <div className={Styles.inputs}>
      <label>{label}</label>
      <input type={type} value={value} onChange={handleChange}/>
      {error && <span>{error}</span>}
    </div>
  )
}

export default NewInput;