import { IInstituition } from "../../types/Users";

function getData(): IInstituition {
  return JSON.parse(localStorage.getItem('data') as string);
}

export { getData };