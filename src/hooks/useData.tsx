import React, { Dispatch, SetStateAction } from 'react';
import { GlobalContext } from "../GlobalContext";
import { IInstituition, IUser, IStudent } from '../types/Users';
import { IEvaluateTask, ILesson, TaskStudent } from '../types/Lessons';
import { Group } from '../types/Group';
import { Status, Subject, ValidateOptions } from '../types/Commom';
import { useNavigate } from 'react-router-dom';

type UseDataReturn = {
  getData: () => IInstituition,
  createInitialUser: () => void,
  getUser: (id: string) => IUser | IStudent | undefined,
  createUser: (user: IUser | IStudent) => void,
  removeUser: (email: string) => void,
  editUser: (id: string, name: string, login: string, email: string, password: string, status: Status) => void,
  authUser: (login: string, password: string, setError: Dispatch<SetStateAction<string | null>>) => void,
  getLoggedUser: () => IUser | IStudent | undefined,
  logoutUser: () => void,
  checkUser: (type: ValidateOptions, value: string) => boolean,
  getLesson: (id: string) => ILesson | undefined,
  createLesson: (lesson: ILesson) => void,
  removeLesson: (id: string) => void,
  editLesson: (id: string, lesson: ILesson) => void,
  saveStudentLesson: (answer: IEvaluateTask) => void,
  evaluateLesson: (id: string, studentID: string, lesson: TaskStudent) => void,
  createGroup: (newgroup: Group) => void,
  removeGroup: (id: string) => void,
  editGroup: (groupid: string, updateGroup: Group) => void,
  getSubject: (id: string) => Subject | undefined,
  createSubject: (subject: Subject) => void,
  removeSubject: (subject: string) => void,
  editSubject: (id: string, updateSubject: Subject) => void,
  editDefaultPassword: (password: string) => void,
  editPassword: (password: string) => void,
  getStudentLessons: () => ILesson[],
}

const useData = (): UseDataReturn => {
  const { setData, setUser } = React.useContext(GlobalContext);
  const navigate = useNavigate();

  function createInitialUser(): void {
    if (!localStorage.getItem('data')) {
      const data: IInstituition = {
        id: 'I1',
        name: 'Instituição',
        email: 'instituicao@edu.com.br',
        users: [
          {
            id: 'U1',
            access: 'admin',
            name: 'Administrador',
            login: 'admin',
            email: 'instituicao@edu.com.br',
            password: 'teste',
            status: 'active', 
          },
          {
            id: 'U2',
            access: 'teacher',
            name: 'Professor',
            login: 'professor',
            email: 'professor@edu.com.br',
            password: 'teste',
            status: 'active',
          },
          {
            id: 'U3',
            access: 'student',
            name: 'Aluno',
            login: 'aluno',
            email: 'aluno@edu.com.br',
            password: 'teste',
            status: 'active',
            level: 1,
            xp: 0,
            lessons: [],
          }
        ],
        groups: [{id: 'G1', name: 'Turma 1', status: 'active', students: ['U3']}],
        lessons: [{
          groups: ['G1'], 
          createdby: 'U1', 
          id: 'T1', 
          task: [
            {id: "Q1", question: "Quanto é 1 + 1?", answer: "2", xp: 25}, 
            {id: "Q2", question: "Quanto é 2 + 2?", answer: "4", xp: 50}, 
            {id: "Q3", question: "Quanto é 3 + 3?", answer: "6", xp: 75}, 
            {id: "Q4", question: "Quanto é 4 + 4?", answer: "8", xp: 100},
          ], 
          subject: 'S1',
          text: 'Nessa aula você aprenderá sobre adição', 
          title: 'Matemática Básica - Adição', 
          video: 'az6OYFS7AUA',
          status: 'active',
        }],
        subjects: [{id: 'S1', name: 'Matemática', status: 'active'}],
        evaluate: [],
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

  function getUser(id: string): IUser | IStudent | undefined {
    const data = getData();

    if (data) {
      return data.users.find((user) => user.id === id);
    }
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

  function editUser(id: string, name: string, login: string, email: string, password: string, status: Status): void {
    const updateData = getData();
    updateData.users = updateData.users.map((user) => {
      if (user.id === id) {
        return {...user, name, login, email, password, status}
      }

      return user;
    })

    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function authUser(login: string, password: string, setError: Dispatch<SetStateAction<string | null>>): void {
    const data = getData();
    const user = data.users.find((user) => user.login.toLowerCase() === login.toLowerCase() && user.password === password);

    if (user && user.status === 'active') {
      localStorage.setItem('logged', login);
      setUser(login);

      if (getLoggedUser()?.access === "student") {
        navigate('/estudante');
      } else {
        navigate('/painel');
      }
    
    } else if (user?.status === 'disable') {
      setError('Usuario inativo')
    } else {
      setError('Usuário ou Senha invalidos');
    }
  }

  function getLoggedUser(): IUser | IStudent | undefined {
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

  function checkUser(type: ValidateOptions, value: string): boolean {
    const checkData = getData();

    return checkData.users.some((user) => user[type] === value);
  }

  function createLesson(lesson: ILesson): void {
    const updateData = getData();
    updateData.lessons.unshift(lesson);
    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function getLesson(id: string): ILesson | undefined {
    const data = getData();

    if (data) {
      return data.lessons.find((lesson) => lesson.id === id);
    }
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

  function saveStudentLesson(answer: IEvaluateTask): void {
    const updateData = getData();
    
    updateData.evaluate.unshift(answer);
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

  function editGroup(id: string, updateGroup: Group): void {
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

  function getSubject(id: string): Subject | undefined {
    const data = getData();
    const subject = data.subjects.find((subject) => subject.id === id);

    if (subject) {
      return subject;
    }
  }

  function createSubject(subject: Subject): void {
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

  function editSubject(id: string, updateSubject: Subject): void {
    const updateData = getData();
    updateData.subjects = updateData.subjects.map((subject) => {
      if (subject.id === id) {
        return {...updateSubject}
      }

      return subject;
    })

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
    const updateUser = getLoggedUser();

    updateData.users = updateData.users.map((user) => {
      if (user.id === updateUser?.id) {
        return {...user, password}
      }

      return user;
    })
    

    localStorage.setItem('data', JSON.stringify(updateData));
    setData(updateData);
  }

  function getStudentLessons(): ILesson[] {
    const data = getData();
    const student = getLoggedUser() as IStudent;

    const studentGroup = data?.groups.find((f) => f.students.some((id) => id === student?.id));

    const lessons = data?.lessons
    .filter((lesson) => lesson.groups.some((id) => id === studentGroup?.id))
    .filter((lesson) => !student.lessons.some((l) => l.id === lesson.id))
    .filter((lesson) => !data.evaluate.some((e) => e.lessonID === lesson.id && e.student === student.id))
    .filter((lesson) => lesson.status === 'active');
    
    return lessons;
  }

  return {
    createInitialUser,
    getData,
    getUser,
    createUser,
    removeUser,
    editUser,
    authUser,
    getLoggedUser,
    logoutUser,
    checkUser,
    getLesson,
    createLesson,
    removeLesson,
    editLesson,
    saveStudentLesson,
    evaluateLesson,
    createGroup,
    removeGroup,
    editGroup,
    getSubject,
    createSubject,
    removeSubject,
    editSubject,
    editDefaultPassword,
    editPassword,
    getStudentLessons,
  }
}

export default useData;