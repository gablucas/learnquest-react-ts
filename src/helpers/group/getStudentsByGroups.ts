import { IStudent } from "../../types/Users";
import { getData } from "../data/getData";

function getStudentsByGroup(groupID: string[]): IStudent[] {
  const data = getData();
  const users = data.groups
  .filter((group) => groupID.some((id) => group.id === id))
  .map((group) => group.students)
  .flat()
  .map((studentID) => data.users.find((user) => studentID === user.id))

  return users as IStudent[];
}

export { getStudentsByGroup };