import React from 'react';
import { GlobalContext } from "../GlobalContext";

export interface IInstituition {
  id: string,
  nome: string,
  email: string,
  users: IUser[],
  lessons: ILesson[],
  preferences: {
    defaultPassword: string,
  }
}

interface IUser {
  id: string,
  access: 'admin' | 'teacher' | 'student',
  nome: string,
  login: string,
  email: string,
  password: string,
  status: 'active' | 'disabled',
}

type Questions = {
  id: string,
  question: string,
  answer: string,
  xp: number,
  needEvaluation: boolean,
}

export interface ILesson {
  id: string,
  createdBy: string,
  title: string,
  video: string,
  text: string,
  questions: Questions[],
}

type UseDataReturn = {
  getData: () => IInstituition,
  createInitialUser: () => void,
  createUser: (user: IUser) => void,
  removeUser: (email: string) => void,
  getUser: () => IUser | undefined,
  createLesson: (lesson: ILesson) => void,
  removeLesson: (id: string) => void,
}

const useData = (): UseDataReturn => {
  const { setData } = React.useContext(GlobalContext)

  function createInitialUser(): void {
    if (!localStorage.getItem('data')) {
      const data: IInstituition = {
        id: '1',
        nome: 'Instituição',
        email: 'instituicao@edu.com.br',
        users: [{
          id: '1',
          access: 'admin',
          nome: 'Admnistrador',
          login: 'admin',
          email: 'instituicao@edu.com.br',
          password: '123',
          status: 'active' 
        }],
        lessons: [],
        preferences: {
          defaultPassword: '123',
        }
      }

      localStorage.setItem('data', JSON.stringify(data));
    }
  }

  function getData(): IInstituition {
    return JSON.parse(localStorage.getItem('data') as string);
  }

  function createUser(user: IUser): void {
    const updateData = getData();
    updateData.users.push(user);
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function removeUser(email: string): void {
    let updateData = getData();
    updateData = {...updateData, users: updateData.users.filter((user) => user.email !== email)};
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function getUser(): IUser | undefined {
    const data = getData();
    const userLogin = localStorage.getItem('logged');

    if (data && userLogin) {
      return data.users.find((user) => user.login === userLogin);
    } else {
      return undefined;
    }
  }

  function createLesson(lesson: ILesson): void {
    const updateData = getData();
    updateData.lessons.push(lesson);
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function removeLesson(id: string) {
    const updateData = getData();
    updateData.lessons = updateData.lessons.filter((lesson) => lesson.id !== id);
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  return {
    createInitialUser,
    getData,
    createUser,
    removeUser,
    getUser,
    createLesson,
    removeLesson,
  }

}

export default useData;