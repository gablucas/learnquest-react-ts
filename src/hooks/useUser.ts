import React from 'react';
import { GlobalContext } from "../GlobalContext";
import { IStudent, IUser } from '../types/Users';
import { getData } from '../helpers/data/getData';
import { Status } from '../types/Commom';
import { getLoggedUser } from '../helpers/user/getLoggedUser';

const useUser = () => {
  const { setData } = React.useContext(GlobalContext);

  function createUser(user: IUser | IStudent): void {
    const updateData = getData();
    updateData.users.push(user);
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function deleteUser(id: string): void {
    let updateData = getData();
    updateData = {...updateData, users: updateData.users.filter((user) => user.id !== id)};
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function editUser(id: string, name: string, login: string, email: string, password: string, status: Status): void {
    const updateData = getData();
    updateData.users = updateData.users.map((user) => {
      if (user.id === id) {
        return {...user, name, login, email, password, status}
      }

      return user;
    })

    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function changeUserPassword(password: string): void {
    const updateData = getData();
    const updateUser = getLoggedUser();

    updateData.users = updateData.users.map((user) => {
      if (user.id === updateUser?.id) {
        return {...user, password}
      }

      return user;
    })
    
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  return {
    createUser,
    deleteUser,
    editUser,
    changeUserPassword,
  }

}

export { useUser };