import React from 'react';
import { IInstituition } from './types/Users';
import { FilterStateProps } from './types/Filter';
import { createInitialUser } from './helpers/user/createInitialUser';
import { getData } from './helpers/data/getData';

type GlobalContextProps = {
  data: IInstituition,
  setData: React.Dispatch<React.SetStateAction<IInstituition>>,
  user: string | null,
  setUser: React.Dispatch<React.SetStateAction<string | null>>,
  filter: FilterStateProps,
  setFilter: React.Dispatch<React.SetStateAction<FilterStateProps>>,

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
  filter: {access: [], student: [],  subject: [], group: [], createdby: [], status: [],},
  setFilter: () => '',
};

type GlobalProviderProps = {
  children: React.ReactNode
};

export const GlobalContext = React.createContext<GlobalContextProps>(intialValue);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  createInitialUser();

  const [data, setData] = React.useState(getData);
  const [user, setUser] = React.useState(localStorage.getItem('logged'));
  const [filter, setFilter] = React.useState<FilterStateProps>({access: [], student: [], subject: [], group: [], createdby: [], status: []})

  const value = {
    data,
    setData,
    user,
    setUser,
    confirm,
    filter,
    setFilter,
  }

  return (
    <GlobalContext.Provider value={value}>
      { children }
    </GlobalContext.Provider>
  )
};