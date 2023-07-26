import { Status } from "./Commom"

export type TaskStudent = {
  id: string,
  answers: {id: string, value: string, isCorrect: boolean | undefined, xp: number}[]
}

export interface IEvaluateTask extends TaskStudent {
  id: string,
  lessonID: string,
  createdby: string,
  student: string,
  subject: string,
}

export type TaskOptions = {
  id: string,
  option: string,
}

export type Task = {
  id: string,
  type: 'open' | 'alternatives',
  question: string,
  answer: string,
  xp: number,
  options?: TaskOptions[],
}

export interface ILesson {
  id: string,
  createdby: string,
  title: string,
  video: string,
  text: string,
  subject: string,
  task: Task[],
  groups: string[],
  status: Status,
}