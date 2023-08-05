import { ILesson } from "../../types/Lessons";
import { getData } from "../data/getData";

function getLesson(id: string | undefined): ILesson | undefined {
  const data = getData();

  if (id) {
    return data.lessons.find((lesson) => lesson.id === id);
  }
}

export { getLesson };