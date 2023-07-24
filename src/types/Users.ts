import { Status, Subject } from "./Commom";
import { Group } from "./Group";
import { IEvaluateTask, ILesson, TaskStudent } from "./Lessons";

export interface IInstituition {
  id: string,
  name: string,
  email: string,
  users: Array<IUser | IStudent>,
  groups: Group[],
  lessons: ILesson[],
  subjects: Subject[],
  evaluate: IEvaluateTask[],
  preferences: {
    defaultPassword: string,
  }
}

export interface IUser {
  id: string,
  access: 'admin' | 'teacher' | 'student',
  name: string,
  login: string,
  email: string,
  password: string,
  status: Status,
}

export interface IStudent extends IUser {
  level: number,
  xp: number,
  lessons: TaskStudent[];
}
