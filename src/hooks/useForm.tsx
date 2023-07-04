import React, { Dispatch, SetStateAction } from 'react';

export type UseFormType = {
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  value: string,
  validate: () => boolean,
  error: string | null,
  setError: Dispatch<SetStateAction<string | null>>
}

const useForm = (): UseFormType => {
  const [value, setValue] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  function validate(): boolean {
    if (value) {
      setError(null);
      return true;
    } else {
      setError('Campo vazio');
      return false;
    }
  }
  
  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    setValue(e.currentTarget.value);
  }

  return {
    onChange,
    value,
    validate,
    error,
    setError,
  }

}

export default useForm;