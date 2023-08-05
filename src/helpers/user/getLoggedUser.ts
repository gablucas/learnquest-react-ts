import { IStudent, IUser } from "../../types/Users";
import { getData } from "../data/getData";

function getLoggedUser(): IUser | IStudent | undefined {
  const data = getData();
  const userLogin = localStorage.getItem('logged');

  if (data && userLogin) {
    return data.users.find((user) => user.login.toLowerCase() === userLogin.toLowerCase());
  } else {
    return undefined;
  }
}

export { getLoggedUser };