import React from 'react';
import { GlobalContext } from "../GlobalContext";
import { IEvaluateTask, ILesson, TaskStudent } from "../types/Lessons";
import { getData } from '../helpers/data/getData';
import { IStudent } from '../types/Users';

const useLesson = () => {
  const { setData } = React.useContext(GlobalContext);

  function createLesson(lesson: ILesson): void {
    const updateData = getData();
    updateData.lessons.unshift(lesson);
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function deleteLesson(id: string) {
    const updateData = getData();
    updateData.lessons = updateData.lessons.filter((lesson) => lesson.id !== id);

    updateData.users.forEach((user) => {
      if (user.access === 'student' && (user as IStudent).lessons.some((lesson) => lesson.id === id)) {

        const userLesson = (user as IStudent).lessons.filter((lesson) => lesson.id === id);
        let totalXP = userLesson[0].answers.filter((answer) => answer.isCorrect).map((answer2) => answer2.xp).reduce((prev, cur) => prev + cur);

        while (totalXP > (user as IStudent).xp) {
          console.log('oi')
          totalXP -= (user as IStudent).xp;
          (user as IStudent).level -= 1;
          (user as IStudent).xp = (user as IStudent).level  * 125;
        }

        (user as IStudent).xp -= totalXP;

        (user as IStudent).lessons = (user as IStudent).lessons.filter((lesson) => lesson.id !== id);
      }
    });
    
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function editLesson(id: string, updateLesson: ILesson): void {
    const updateData = getData();
    updateData.lessons = updateData.lessons.map((lesson) => {
      if (lesson.id === id) {
        return updateLesson
      }

      return lesson;
    });

    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);  
  }

  function evaluateLesson(id: string, studentID: string, lesson: TaskStudent): void {
    const updateData = getData();
    const user = updateData.users.find((user) => user.id === studentID) as IStudent;
    let totalXP = lesson.answers.map((answer) => answer.xp).reduce((pre, cur) => pre + cur);

    updateData.evaluate = updateData.evaluate.filter((lesson) => lesson.id !== id);

    user.lessons.push(lesson);

    while (totalXP >= user.level * 125 - user.xp) {
      totalXP -= user.level * 125 + user.xp;
      user.xp = 0;
      user.level += 1;
      console.log(totalXP)
    }

    user.xp += totalXP;

    updateData.users = updateData.users.map((userMap) => {
      if (userMap.id === studentID) {
        return {...user}
      }

      return userMap;
    })

    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function saveStudentLesson(answer: IEvaluateTask): void {
    const updateData = getData();
    
    updateData.evaluate.unshift(answer);
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  return {
    createLesson,
    deleteLesson,
    editLesson,
    evaluateLesson,
    saveStudentLesson,
  }

}

export { useLesson };