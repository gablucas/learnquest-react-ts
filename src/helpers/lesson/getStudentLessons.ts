import { ILesson } from "../../types/Lessons";
import { IStudent } from "../../types/Users";
import { getData } from "../data/getData";
import { getLoggedUser } from "../user/getLoggedUser";
import { getUser } from "../user/getUser";

function getStudentLessons(id?: string): ILesson[] {
  const data = getData();
  const student = id ? getUser(id) as IStudent : getLoggedUser() as IStudent;

  const studentGroup = data?.groups.find((f) => f.students.some((id) => id === student?.id));

  const lessons = data?.lessons
  .filter((lesson) => lesson.groups.some((id) => id === studentGroup?.id))
  .filter((lesson) => !student.lessons.some((l) => l.id === lesson.id))
  .filter((lesson) => !data.evaluate.some((e) => e.lessonID === lesson.id && e.student === student.id))
  .filter((lesson) => lesson.status === 'active');
  
  return lessons;
}

export { getStudentLessons };