import React from 'react';
import useData from './hooks/useData';
import { IInstituition } from './types/Users';
import { ConfirmStateProps, Toggle } from './types/Commom';
import { FilterStateProps } from './types/Filter';

type GlobalContextProps = {
  data: IInstituition,
  setData: React.Dispatch<React.SetStateAction<IInstituition>>,
  user: string | null,
  setUser: React.Dispatch<React.SetStateAction<string | null>>,
  confirm: ConfirmStateProps,
  setConfirm: React.Dispatch<React.SetStateAction<ConfirmStateProps>>,
  filter: FilterStateProps,
  setFilter: React.Dispatch<React.SetStateAction<FilterStateProps>>,
  toggle: Toggle,
  setToggle: React.Dispatch<React.SetStateAction<Toggle>>,
};

const intialValue: GlobalContextProps = { 
  data: {
    id: '',
    name: '',
    email: '',
    users: [],
    groups: [],
    lessons: [],
    subjects: [],
    evaluate: [],
    preferences: {
      defaultPassword: '',
    }
  },
  setData: () => null,
  user: null,
  setUser: () => null,
  confirm: {type: 'message', text: '', action: () => ''},
  setConfirm: () => '',
  filter: {access: [], student: [],  subject: [], group: [], createdby: [], status: [],},
  setFilter: () => '',
  toggle: 'none',
  setToggle: () => '',
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
  const [confirm, setConfirm] = React.useState<ConfirmStateProps>({type: 'message', text: '', action: () => ''});
  const [filter, setFilter] = React.useState<FilterStateProps>({access: [], student: [], subject: [], group: [], createdby: [], status: []})
  const [toggle, setToggle] = React.useState<Toggle>('none');

  return (
    <GlobalContext.Provider value={{ data, setData, user, setUser, confirm, setConfirm, filter, setFilter, toggle, setToggle }}>
      { children }
    </GlobalContext.Provider>
  )
};