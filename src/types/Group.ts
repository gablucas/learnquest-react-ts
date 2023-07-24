import { Status } from "./Commom";

export interface Group {
  id: string,
  name: string,
  students: string[],
  status: Status,
}