import { Classes } from "./Classes";
import { Status } from "./Commom";
import { ILesson, LessonTest } from "./Lessons";

export interface IInstituition {
  id: string,
  nome: string,
  email: string,
  users: Array<IUser | IStudent>,
  classes: Classes[],
  lessons: ILesson[],
  subjects: string[],
  preferences: {
    defaultPassword: string,
  }
}

export interface IUser {
  id: string,
  access: 'admin' | 'teacher' | 'student',
  nome: string,
  login: string,
  email: string,
  password: string,
  status: Status,
}

export interface IStudent extends IUser {
  level: number,
  xp: number,
  lessons: LessonTest[];
}