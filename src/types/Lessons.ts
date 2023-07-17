export type LessonStudent = {
  id: string,
  answers: {id: string, value: string, isCorrect: boolean | undefined, xp: number}[]
}

export interface IEvaluateLesson extends LessonStudent {
  evaluateID: string,
  createdBy: string,
  student: string,
  subject: string,
}

export type Questions = {
  id: string,
  question: string,
  answer: string,
  xp: number,
}

export interface ILesson {
  id: string,
  createdBy: string,
  title: string,
  video: string,
  text: string,
  subject: string,
  questions: Questions[],
  groups: string[],
}