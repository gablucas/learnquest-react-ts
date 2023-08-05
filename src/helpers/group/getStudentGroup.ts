import { Group } from "../../types/Group";
import { getData } from "../data/getData";

function getStudentGroup(studentID: string): Group | undefined {
  const data = getData();

  return data.groups.find((group) => group.students.includes(studentID));
}

export { getStudentGroup };