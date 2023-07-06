export type LessonTest = {
  id: string,
  answers: {id: string, value: string, isCorrect: boolean, xp: number}[]
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
  subject: string,
  questions: Questions[],
  classes: string[],
}