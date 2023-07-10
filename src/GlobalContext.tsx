import React from 'react';
import useData from './hooks/useData';
import { IInstituition } from './types/Users';

type GlobalContextProps = {
  data: IInstituition,
  setData: React.Dispatch<React.SetStateAction<IInstituition>>,
  user: string | null,
  setUser: React.Dispatch<React.SetStateAction<string | null>>,
};

const intialValue: GlobalContextProps = { 
  data: {
    id: '',
    nome: '',
    email: '',
    users: [],
    groups: [],
    lessons: [],
    subjects: [],
    preferences: {
      defaultPassword: '',
    }
  },
  setData: () => null,
  user: null,
  setUser: () => null,
};

type GlobalProviderProps = {
  children: React.ReactNode
};


export const GlobalContext = React.createContext<GlobalContextProps>(intialValue);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const { createInitialUser, getData } = useData();
  createInitialUser();

  const [data, setData] = React.useState(getData);
  const [user, setUser] = React.useState(localStorage.getItem('logged'));

  return (
    <GlobalContext.Provider value={{ data, setData, user, setUser }}>
      { children }
    </GlobalContext.Provider>
  )
};