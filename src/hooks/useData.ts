import React from 'react';
import { GlobalContext } from "../GlobalContext";
import { getData } from '../helpers/data/getData';

type UseDataReturn = {
  editDefaultPassword: (password: string) => void,
}

const useData = (): UseDataReturn => {
  const { setData } = React.useContext(GlobalContext);

  function editDefaultPassword(password: string): void {
    const updateData = getData();
    updateData.preferences.defaultPassword = password;
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  return {
    editDefaultPassword,
  }
}

export default useData;