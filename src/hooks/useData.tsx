import React from 'react';
import { GlobalContext } from "../GlobalContext";
import { IInstituition, IUser, IStudent } from '../types/Users';
import { ILesson, LessonTest } from '../types/Lessons';
import { Group } from '../types/Group';
import { Subjects } from '../types/Commom';

type UseDataReturn = {
  getData: () => IInstituition,
  createInitialUser: () => void,
  createUser: (user: IUser | IStudent) => void,
  removeUser: (email: string) => void,
  editUser: (id: string, nome: string, login: string, email: string, password: string) => void,
  getUser: () => IUser | IStudent | undefined,
  logoutUser: () => void,
  createLesson: (lesson: ILesson) => void,
  removeLesson: (id: string) => void,
  editLesson: (id: string, lesson: ILesson) => void,
  saveStudentLesson: (answer: LessonTest) => void,
  createGroup: (newgroup: Group) => void,
  removeGroup: (id: string) => void,
  editGroup: (groupid: string, updateGroup: Group) => void,
  createSubject: (subject: Subjects) => void,
  removeSubject: (subject: string) => void,
  editDefaultPassword: (password: string) => void,
  editPassword: (password: string) => void,
}

const useData = (): UseDataReturn => {
  const { setData, setUser } = React.useContext(GlobalContext)

  function createInitialUser(): void {
    if (!localStorage.getItem('data')) {
      const data: IInstituition = {
        id: '1',
        nome: 'Instituição',
        email: 'instituicao@edu.com.br',
        users: [
          {
            id: '1',
            access: 'admin',
            nome: 'Admnistrador',
            login: 'admin',
            email: 'instituicao@edu.com.br',
            password: '123',
            status: true, 
          },
          {
            id: '2',
            access: 'student',
            nome: 'Estudante',
            login: 'estudante',
            email: 'estudante@edu.com.br',
            password: '123',
            status: true,
            level: 1,
            xp: 0,
            lessons: [],
          }
        ],
        groups: [{id: '1', name: 'Turma 1', status: true, students: ['2']}],
        lessons: [{
          groups: ['1'], 
          createdBy: 'admin', 
          id: '1', 
          questions: [
            {id: "1", question: "Quanto é 1 + 1?", answer: "2", xp: 25, needEvaluation: false}, 
            {id: "2", question: "Quanto é 2 + 2?", answer: "4", xp: 50, needEvaluation: false}, 
            {id: "3", question: "Quanto é 3 + 3?", answer: "6", xp: 75, needEvaluation: false}, 
            {id: "4", question: "Quanto é 4 + 4?", answer: "8", xp: 100, needEvaluation: false}
          ], 
          subject: '1', 
          text: 'Nessa aula você aprenderá a somar', 
          title: 'Aprendendo a somar', 
          video: ''
        }],
        subjects: [{id: '1', name: 'Matemática', status: true}],
        preferences: {
          defaultPassword: '123',
        }
      }

      localStorage.setItem('data', JSON.stringify(data));
    }
  }

  function getData(): IInstituition {
    return JSON.parse(localStorage.getItem('data') as string);
  }

  function createUser(user: IUser | IStudent): void {
    const updateData = getData();
    updateData.users.push(user);
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function removeUser(email: string): void {
    let updateData = getData();
    updateData = {...updateData, users: updateData.users.filter((user) => user.email !== email)};
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function editUser(id: string, nome: string, login: string, email: string, password: string): void {
    const updateData = getData();
    updateData.users = updateData.users.map((user) => {
      if (user.id === id) {
        return {...user, nome, login, email, password}
      }

      return user;
    })

    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function getUser(): IUser | IStudent | undefined {
    const data = getData();
    const userLogin = localStorage.getItem('logged');

    if (data && userLogin) {
      return data.users.find((user) => user.login.toLowerCase() === userLogin.toLowerCase());
    } else {
      return undefined;
    }
  }

  function logoutUser(): void {
    localStorage.removeItem('logged');
    setUser(null);
  }

  function createLesson(lesson: ILesson): void {
    const updateData = getData();
    updateData.lessons.unshift(lesson);
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function removeLesson(id: string) {
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

  function saveStudentLesson(answer: LessonTest): void {
    const updateData = getData();
    const user = getUser() as IStudent;

    // Verifica as questões acertadas e calcula o xp ganho
    const questions = updateData.lessons.find((lesson) => lesson.id === answer.id)?.questions;
    let xp = 0;

    questions?.forEach((question, index) => {
      if (question.answer === answer.answers[index].value) {
        answer.answers[index].isCorrect = true;
        answer.answers[index].xp = question.xp;
        xp += question.xp;
      }
    })

    if (user.xp + xp >= user.level * 125) {
      const restXP = (user.xp + xp) - (user.level * 125);
      user.level += 1;
      user.xp = restXP;
    } else {
      user.xp += xp;
    }

    user.lessons.push(answer)

    updateData.users = updateData.users.map((u) => {
      if (u.login.toLowerCase() === localStorage.getItem('logged')?.toLowerCase()) {
        return {...user}
      }
      return u;
    })

    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function createGroup(newgroup: Group): void {
    const updateData = getData();
    updateData.groups.push(newgroup);
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function removeGroup(groupid: string): void {
    const updateData = getData();
    updateData.groups = updateData.groups.filter((c) => c.id !== groupid);
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function editGroup(id: string, updateGroup: Group):void {
    const updateData = getData();
    updateData.groups = updateData.groups.map((group) => {
      if (group.id === id) {
        return {...updateGroup}
      }

      return group;
    })

    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function createSubject(subject: Subjects): void {
    const updateData = getData();
    updateData.subjects.push(subject);
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function removeSubject(subject: string): void {
    const updateData = getData();
    updateData.subjects = updateData.subjects.filter((f) => f.id !== subject)
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function editDefaultPassword(password: string): void {
    const updateData = getData();
    updateData.preferences.defaultPassword = password;
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function editPassword(password: string): void {
    const updateData = getData();
    const updateUser = getUser();

    updateData.users = updateData.users.map((user) => {
      if (user.id === updateUser?.id) {
        return {...user, password}
      }

      return user;
    })
    
    


    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  return {
    createInitialUser,
    getData,
    createUser,
    removeUser,
    editUser,
    getUser,
    logoutUser,
    createLesson,
    removeLesson,
    editLesson,
    saveStudentLesson,
    createGroup,
    removeGroup,
    editGroup,
    createSubject,
    removeSubject,
    editDefaultPassword,
    editPassword,
  }
}

export default useData;