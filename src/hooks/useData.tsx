import React from 'react';
import { GlobalContext } from "../GlobalContext";

export interface IInstituition {
  id: string,
  nome: string,
  email: string,
  users: Array<IUser | IStudent>,
  classes: Classes[],
  lessons: ILesson[],
  preferences: {
    defaultPassword: string,
  }
}

export interface Classes {
  id: string,
  name: string,
  students: string[],
  status: Status,
}

interface IUser {
  id: string,
  access: 'admin' | 'teacher' | 'student',
  nome: string,
  login: string,
  email: string,
  password: string,
  status: Status,
}

type Status = 'active' | 'disabled';

export type LessonTest = {
  id: string,
  answers: {id: string, value: string}[]
}

interface IStudent extends IUser {
  lessons: LessonTest[];
}

export type Questions = {
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
  classes: string[],
}

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