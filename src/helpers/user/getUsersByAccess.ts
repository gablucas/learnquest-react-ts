import { IStudent, IUser } from "../../types/Users";
import { getData } from "../data/getData";

function getUsersByAccess(access: 'student' | 'teacher' | 'admin'): IUser[] | IStudent[] | undefined {
  const data = getData();

  if (access === 'student') {
    return data.users.filter((user) => user.access === 'student') as IStudent[];
  } else if (access === 'teacher') {
    return data.users.filter((user) => user.access === 'teacher') as IUser[];
  } else if (access === 'admin') {
    return data.users.filter((user) => user.access === 'admin') as IUser[];
  }
}

export { getUsersByAccess };