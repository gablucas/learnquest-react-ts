import { Subject } from "../../types/Commom";
import { getData } from "../data/getData";

function getSubject(id: string): Subject | undefined {
  const data = getData();
  const subject = data.subjects.find((subject) => subject.id === id);

  if (subject) {
    return subject;
  }
}

export {  getSubject };