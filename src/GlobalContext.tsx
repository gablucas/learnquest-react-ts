import React from 'react';
import useData, { IInstituition } from './hooks/useData';


type GlobalContextProps = {
  data: IInstituition,
  setData: React.Dispatch<React.SetStateAction<IInstituition>>,
};

const intialValue: GlobalContextProps = { 
  data: {
    id: '',
    email: '',
    nome: '',
    users: [],
    preferences: {
      defaultPassword: '',
    }
  },
  setData: () => null,
};

type GlobalProviderProps = {
  children: React.ReactNode
};


export const GlobalContext = React.createContext<GlobalContextProps>(intialValue);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const { createInitialUser, getData } = useData();
  createInitialUser();

  const [data, setData] = React.useState(getData);

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      { children }
    </GlobalContext.Provider>
  )
};