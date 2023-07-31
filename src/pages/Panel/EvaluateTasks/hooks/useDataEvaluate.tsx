import React from 'react';
import { GlobalContext } from "../../../../GlobalContext";
import useData from '../../../../hooks/useData';

const useDataEvaluate = (id: string | undefined) => {
  const { data } = React.useContext(GlobalContext);
  const { getLesson, getUser } = useData();

  const lessonToEvaluate = data.evaluate.find((lesson) => lesson.id === id);
  const lessonInfo = getLesson(lessonToEvaluate?.lessonID);
  const studentInfo = getUser(lessonToEvaluate?.student);

  return {
    lessonToEvaluate,
    lessonInfo,
    studentInfo,
  }

}

export default useDataEvaluate;