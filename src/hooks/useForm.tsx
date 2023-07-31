import React, { Dispatch, SetStateAction } from 'react';
import useData from './useData';

export type UseFormType = {
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
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
  const { someUserHasInfo } = useData();

  function validate(): boolean {

    if (value.length === 0) {
      setError('Campo vazio');
      return false;
    } else if ((type === 'login' || type === 'email') && someUserHasInfo(type, value)) {
      setError(`Já existe um ${type} registrado`)
      return false;
    } else {
      setError(null);
      return true;
    }
  }
  
  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void {
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