import { ValidateOptions } from "../../types/Commom";
import { getData } from "../data/getData";

function someUserHasInfo(type: ValidateOptions, value: string): boolean {
  const checkData = getData();

  return checkData.users.some((user) => user[type] === value);
}

export { someUserHasInfo };