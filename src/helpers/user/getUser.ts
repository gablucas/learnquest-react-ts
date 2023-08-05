import { IStudent, IUser } from "../../types/Users";
import { getData } from "../data/getData";

function getUser(id: string | undefined): IUser | IStudent | undefined {
  const data = getData();

  if (id) {
    return data.users.find((user) => user.id === id);
  }
}

export { getUser };