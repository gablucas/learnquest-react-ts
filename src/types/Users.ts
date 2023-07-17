import { Subject } from "./Commom";
import { Group } from "./Group";
import { IEvaluateTask, ILesson, TaskStudent } from "./Lessons";

export interface IInstituition {
  id: string,
  name: string,
  email: string,
  users: Array<ITeacher | IStudent>,
  groups: Group[],
  lessons: ILesson[],
  subjects: Subject[],
  evaluate: IEvaluateTask[],
  preferences: {
    defaultPassword: string,
  }
}

export interface ITeacher {
  id: string,
  access: 'admin' | 'teacher' | 'student',
  name: string,
  login: string,
  email: string,
  password: string,
  status: boolean,
}

export interface IStudent extends ITeacher {
  level: number,
  xp: number,
  lessons: TaskStudent[];
}