import { IStudent, IUser } from "../../types/Users";
import { getData } from "../data/getData";

function getLoggedUser(): IUser | IStudent | undefined {
  const data = getData();
  const userID = localStorage.getItem('logged');

  if (data && userID) {
    return data.users.find((user) => user.id === userID);
  } else {
    return undefined;
  }
}

export { getLoggedUser };