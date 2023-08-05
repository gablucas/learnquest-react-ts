import { Group } from "../../types/Group";
import { getData } from "../data/getData";
import { getLoggedUser } from "./getLoggedUser";

function getUserLoggedGroups(): Group[] {
  const data = getData();
  const user = getLoggedUser();

  if (user?.access === 'admin') {
    return data.groups.filter((group) => group.status === 'active');
  } else if (user?.access === 'teacher') {
    return data.groups
    .filter((group) => group.status === 'active')
    .filter((group) => group.teachers.some((teacherID) => teacherID === user?.id));
  } else {
    return data.groups
    .filter((group) => group.status === 'active')
    .filter((group) => group.students.some((StudentID) => StudentID === user?.id));
  }
}

export { getUserLoggedGroups };