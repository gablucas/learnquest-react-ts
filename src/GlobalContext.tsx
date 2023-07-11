import React from 'react';
import useData from './hooks/useData';
import { IInstituition } from './types/Users';
import { ConfirmStateProps } from './types/Commom';

type GlobalContextProps = {
  data: IInstituition,
  setData: React.Dispatch<React.SetStateAction<IInstituition>>,
  user: string | null,
  setUser: React.Dispatch<React.SetStateAction<string | null>>,
  confirm: ConfirmStateProps,
  setConfirm: React.Dispatch<React.SetStateAction<ConfirmStateProps>>,
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
  confirm: {toggle: false, text: '', action: () => ''},
  setConfirm: () => '',
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
  const [confirm, setConfirm] = React.useState<ConfirmStateProps>({toggle: false, text: '', action: () => ''});

  return (
    <GlobalContext.Provider value={{ data, setData, user, setUser, confirm, setConfirm }}>
      { children }
    </GlobalContext.Provider>
  )
};