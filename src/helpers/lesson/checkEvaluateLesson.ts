import { getData } from "../data/getData";
import { getUser } from "../user/getUser";
import { getLesson } from "./getLesson";

function checkEvaluateLesson(id: string | undefined) {
  const data = getData();


  const lessonToEvaluate = data.evaluate.find((lesson) => lesson.id === id);
  const lessonInfo = getLesson(lessonToEvaluate?.lessonID);
  const studentInfo = getUser(lessonToEvaluate?.student);

  return {
    lessonToEvaluate,
    lessonInfo,
    studentInfo,
  }
}

export { checkEvaluateLesson };