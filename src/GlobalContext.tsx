import React from 'react';
import useUsers, { IInstituition } from './hooks/useUsers';

type GlobalContextProps = {
  auth: boolean,
  setAuth: React.Dispatch<React.SetStateAction<boolean>>,
  myData: IInstituition | undefined,
  setMyData: React.Dispatch<React.SetStateAction<IInstituition | undefined>>,
};

const intialValue = { 
  auth: !!localStorage.getItem('logged'), 
  setAuth: () => !!localStorage.getItem('logged'),
  myData: undefined,
  setMyData: () => undefined,
};

export const GlobalContext = React.createContext<GlobalContextProps>(intialValue);

type GlobalProviderProps = {
  children: React.ReactNode
};

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const users = useUsers();
  const [auth, setAuth] = React.useState(!!localStorage.getItem('logged'));
  const [myData, setMyData] = React.useState<IInstituition | undefined>(users.instituitions.find((f) => f.email === users.loggedUser()))


  return (
    <GlobalContext.Provider value={{ auth, setAuth, myData, setMyData }}>
      { children }
    </GlobalContext.Provider>
  )
};