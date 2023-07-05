import React from 'react';
import { GlobalContext } from "../GlobalContext";
import { IInstituition, IUser, IStudent } from '../types/Users';
import { ILesson, LessonTest } from '../types/Lessons';
import { Classes } from '../types/Classes';

type UseDataReturn = {
  getData: () => IInstituition,
  createInitialUser: () => void,
  createUser: (user: IUser | IStudent) => void,
  removeUser: (email: string) => void,
  getUser: () => IUser | IStudent | undefined,
  logoutUser: () => void,
  createLesson: (lesson: ILesson) => void,
  removeLesson: (id: string) => void,
  saveStudentLesson: (answer: LessonTest) => void,
  createClass: (newclass: Classes) => void,
  removeClass: (classId: string) => void,
}

const useData = (): UseDataReturn => {
  const { setData, setUser } = React.useContext(GlobalContext)

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
        classes: [],
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

  function createUser(user: IUser | IStudent): void {
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

  function getUser(): IUser | IStudent | undefined {
    const data = getData();
    const userLogin = localStorage.getItem('logged');

    if (data && userLogin) {
      return data.users.find((user) => user.login.toLowerCase() === userLogin.toLowerCase());
    } else {
      return undefined;
    }
  }

  function logoutUser(): void {
    localStorage.removeItem('logged');
    setUser(null);
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

  function saveStudentLesson(answer: LessonTest): void {
    const updateData = getData();
    updateData.users = updateData.users.map((user) => {
      if (user.login.toLowerCase() === localStorage.getItem('logged')?.toLowerCase()) {
        return {...user, lessons: [...(user as IStudent).lessons, answer]}
      }
      return user;
    })
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function createClass(newclass: Classes): void {
    const updateData = getData();
    updateData.classes.push(newclass);
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function removeClass(classId: string): void {
    const updateData = getData();
    updateData.classes = updateData.classes.filter((c) => c.id !== classId);
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  return {
    createInitialUser,
    getData,
    createUser,
    removeUser,
    getUser,
    logoutUser,
    createLesson,
    removeLesson,
    saveStudentLesson,
    createClass,
    removeClass,
  }
}

export default useData;