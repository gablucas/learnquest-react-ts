import { TaskStudent } from "../../types/Lessons";

function counterQuestionsBy(counterType: 'correct' | 'wrong', lesson: TaskStudent): number {
  if (counterType === 'correct') {
    return lesson.answers.filter((f) => f.isCorrect === true).length;
  } else if (counterType === 'wrong') {
    return lesson.answers.filter((f) => f.isCorrect === false).length;
  } else {
    return 0;
  }
}

export { counterQuestionsBy};