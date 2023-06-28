import React from 'react';
import useUsers, { IInstituition } from "./useUsers";
import { GlobalContext } from '../GlobalContext';

interface IStudent {
  id: string,
  access: string,
  nome: string,
  email: string,
  instituition: string,
  password: string | number,
  status: 'active' | 'disabled',
}

interface ITeacher {
  id: string,
  access: string,
  nome: string,
  email: string,
  instituition: string,
  password: string | number,
  status: 'active' | 'disabled',
}

type UseDataReturn = {
  createUser: (user: IStudent | ITeacher) => void,
  removeUser: (email: string) => void,
}

const useData = (): UseDataReturn => {
  const { setMyData } = React.useContext(GlobalContext);
  const users = useUsers();
  const data: IInstituition[] = JSON.parse(localStorage.getItem('instituitions') as string);
  const index = data.findIndex((fi) => fi.email === users.loggedUser());

  function createUser(user: IStudent | ITeacher): void {
    data[index].users.push(user);
    localStorage.setItem('instituitions', JSON.stringify(data));
    setMyData(data[index]);
  }
  
  
  function removeUser(email: string): void {
    const indexUser = data[index].users.findIndex((fi) => fi.email === email);
    data[index].users.splice(indexUser, 1)
    localStorage.setItem('instituitions', JSON.stringify(data));
    setMyData(data[index]);
  }

  return {
    createUser,
    removeUser,
  }
  
}

export default useData;