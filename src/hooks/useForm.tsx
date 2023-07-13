import React, { Dispatch, SetStateAction } from 'react';
import useData from './useData';

export type UseFormType = {
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  validate: () => boolean,
  error: string | null,
  setError: Dispatch<SetStateAction<string | null>>
}

type UseFormProps = {
  type: string,
  initialValue: string,
}

const useForm = ({type, initialValue}: UseFormProps): UseFormType => {
  const [value, setValue] = React.useState<string>(initialValue);
  const [error, setError] = React.useState<string | null>(null);
  const { checkUser } = useData();

  function validate(): boolean {

    if (value.length === 0) {
      setError('Campo vazio');
      return false;
    } else if ((type === 'login' || type === 'email') && checkUser(type, value)) {
      setError(`Já existe um ${type} registrado`)
      return false;
    } else {
      setError(null);
      return true;
    }
  }
  
  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    setValue(e.currentTarget.value);
  }

  return {
    onChange,
    value,
    setValue,
    validate,
    error,
    setError,
  }

}

export default useForm;