import { Subject } from "../../types/Commom";
import { getData } from "../data/getData";
import { getLoggedUser } from "./getLoggedUser";

function showUserSubjects(): Subject[] {
  const data = getData();
  const user = getLoggedUser();

  if (user?.access === 'admin') {
    return data.subjects.filter((group) => group.status === 'active');
  } else {
    return data.subjects
    .filter((subject) => subject.status === 'active')
    .filter((subject) => subject.teachers.some((teacherID) => teacherID === user?.id));
  }
}

export { showUserSubjects };