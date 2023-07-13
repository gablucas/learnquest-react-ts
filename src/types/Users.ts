import { Subjects } from "./Commom";
import { Group } from "./Group";
import { IEvaluateLesson, ILesson, LessonStudent } from "./Lessons";

export interface IInstituition {
  id: string,
  nome: string,
  email: string,
  users: Array<IUser | IStudent>,
  groups: Group[],
  lessons: ILesson[],
  subjects: Subjects[],
  evaluate: IEvaluateLesson[],
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
  status: boolean,
}

export interface IStudent extends IUser {
  level: number,
  xp: number,
  lessons: LessonStudent[];
}