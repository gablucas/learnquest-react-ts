import { IStudent } from "../../types/Users";
import { getData } from "../data/getData";
import { getStudentsByGroup } from "./getStudentsByGroups";

function getStudentsByTeacher(teacherID: string): IStudent[] {
  const data = getData();
  const teacherGroups = data.groups
  .filter((group) => group.teachers.some((id) => teacherID === id))
  .map((group) => group.id)

  return getStudentsByGroup(teacherGroups);
}

export { getStudentsByTeacher };