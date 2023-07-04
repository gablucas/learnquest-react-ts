import React from 'react';
import useData, { IInstituition } from './hooks/useData';

type GlobalContextProps = {
  data: IInstituition | null,
  setData: React.Dispatch<React.SetStateAction<IInstituition>>,
  user: string | null,
  setUser: React.Dispatch<React.SetStateAction<string | null>>,
};

const intialValue: GlobalContextProps = { 
  data: null,
  setData: () => null,
  user: null,
  setUser: () => null,
};

type GlobalProviderProps = {
  children: React.ReactNode
};


export const GlobalContext = React.createContext<GlobalContextProps>(intialValue);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const { createInitialUser, getData, getUser } = useData();
  createInitialUser();

  const [data, setData] = React.useState(getData);
  const [user, setUser] = React.useState(localStorage.getItem('logged'));
  console.log(getUser())

  return (
    <GlobalContext.Provider value={{ data, setData, user, setUser }}>
      { children }
    </GlobalContext.Provider>
  )
};