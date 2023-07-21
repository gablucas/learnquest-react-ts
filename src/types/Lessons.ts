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

export type Task = {
  id: string,
  question: string,
  answer: string,
  xp: number,
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
}