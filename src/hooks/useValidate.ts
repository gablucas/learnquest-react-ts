import React from 'react';

type ValidateReturn<T> = {
  isEmpty: (name: string, value: T | T[]) => boolean,
  error: string,
}

const useValidate = <T,>(): ValidateReturn<T> => {
  const [error, setError] = React.useState<string>('')

  function isEmpty<T>(name: string, value: T | T[]): boolean {
    if (value === '') {
      setError(name);
      return false;
    } else if (Array.isArray(value) && value.length === 0) {
      setError(name);
      return false;
    } else if (value === undefined) {
      setError(name)
      return false;
    } else {
      setError('')
      return true; 
    }
  }
  
  return {
    isEmpty,
    error,
  }

}

export default useValidate;