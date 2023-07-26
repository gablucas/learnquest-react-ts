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
  getUsersByAcess: (access: 'student' | 'teacher' | 'admin') => IUser[] | IStudent[] | undefined
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
  showUserGroups: () => Group[],
  editGroup: (groupid: string, updateGroup: Group) => void,
  getSubject: (id: string) => Subject | undefined,
  createSubject: (subject: Subject) => void,
  removeSubject: (subject: string) => void,
  showUserSubjects: () => Subject[],
  editSubject: (id: string, updateSubject: Subject) => void,
  editDefaultPassword: (password: string) => void,
  editPassword: (password: string) => void,
  getStudentGroup: (studentID: string) => Group | undefined,
  getStudentLessons: (id?: string) => ILesson[],
  getStudentsByGroup: (groupID: string[]) => IStudent[],
  getStudentsByTeacher: (teacherID: string) => IStudent[],
  counterCorrectWrongQuestions: (counterType: 'correct' | 'wrong', lesson: TaskStudent) => number,
}

const useData = (): UseDataReturn => {
  const { setData, setUser } = React.useContext(GlobalContext);
  const navigate = useNavigate();

  function createInitialUser(): void {
    if (!localStorage.getItem('data')) {

      const admin_1: IUser = {
        id: 'U1',
        access: 'admin',
        name: 'Administrador',
        login: 'admin',
        email: 'instituicao@edu.com.br',
        password: 'teste',
        status: 'active', 
      }

      const teacher_1: IUser = {
        id: 'U2',
        access: 'teacher',
        name: 'Professor',
        login: 'professor',
        email: 'professor@edu.com.br',
        password: 'teste',
        status: 'active',
      }

      const teacher_2: IUser = {
        id: 'U3',
        access: 'teacher',
        name: 'Professor',
        login: 'professor',
        email: 'professor@edu.com.br',
        password: 'teste',
        status: 'active',
      }

      const student_1: IStudent = {
        id: 'U4',
        access: 'student',
        name: 'Aluno',
        login: 'aluno',
        email: 'aluno@edu.com.br',
        password: 'teste',
        status: 'active',
        level: 1,
        xp: 0,
        lessons: []
      }

      const student_2: IStudent = {
        id: 'U5',
        access: 'student',
        name: 'Aluno2',
        login: 'aluno2',
        email: 'aluno2@edu.com.br',
        password: 'teste',
        status: 'active',
        level: 1,
        xp: 0,
        lessons: []
      }

      const student_3: IStudent = {
        id: 'U6',
        access: 'student',
        name: 'Aluno3',
        login: 'aluno3',
        email: 'aluno3@edu.com.br',
        password: 'teste',
        status: 'active',
        level: 1,
        xp: 0,
        lessons: []
      }

      const group_1: Group = {
        id: 'G1', 
        name: 'Turma 1', 
        status: 'active', 
        students: ['U4'], 
        teachers: ['U2']
      }

      const group_2: Group = {
        id: 'G2', 
        name: 'Turma 2', 
        status: 'active', 
        students: ['U5'], 
        teachers: ['U2']
      }

      const group_3: Group = {
        id: 'G3', 
        name: 'Turma 3', 
        status: 'active', 
        students: ['U6'], 
        teachers: ['U3']
      }

      const lesson_1: ILesson = {
        groups: ['G1', 'G2'], 
        createdby: 'U1', 
        id: 'L1',
        task: [
          {id: "Q1", type: 'open', question: "Quanto é 1 + 1?", answer: "2", xp: 25}, 
          {id: "Q2", type: 'alternatives', question: "Quanto é 2 + 2?", answer: "4", options: [{id: 'Q2O1', option: '4'}, {id: 'Q2O2', option: '5'}, {id: 'Q2O3', option: '9'}], xp: 50}, 
          {id: "Q3", type: 'open', question: "Quanto é 3 + 3?", answer: "6", xp: 75}, 
          {id: "Q4", type: 'alternatives', question: "Quanto é 4 + 4?", answer: "8", options: [{id: 'Q4O1', option: '11'}, {id: 'Q4O2', option: '12'}, {id: 'Q4O3', option: '8'}], xp: 100},
        ], 
        subject: 'S1',
        text: 'Nessa aula você aprenderá sobre adição', 
        title: 'Matemática Básica - Adição', 
        video: 'az6OYFS7AUA',
        status: 'active',
      }

      const subject_1: Subject = {
        id: 'S1', 
        name: 'Matemática', 
        status: 'active', 
        teachers: ['U2']
      }

      const subject_2: Subject = {
        id: 'S2', 
        name: 'Português', 
        status: 'active', 
        teachers: ['U3']
      }

      const data: IInstituition = {
        id: 'I1',
        name: 'Instituição',
        email: 'instituicao@edu.com.br',
        users: [admin_1, teacher_1, teacher_2, student_1, student_2, student_3],
        groups: [group_1, group_2, group_3],
        lessons: [lesson_1],
        subjects: [subject_1, subject_2],
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

  function getUsersByAcess(access: 'student' | 'teacher' | 'admin'): IUser[] | IStudent[] | undefined {
    const data = getData();

    if (access === 'student') {
      return data.users.filter((user) => user.access === 'student') as IStudent[];
    } else if (access === 'teacher') {
      return data.users.filter((user) => user.access === 'teacher') as IUser[];
    } else if (access === 'admin') {
      return data.users.filter((user) => user.access === 'admin') as IUser[];
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

  function showUserGroups(): Group[] {
    const data = getData();
    const user = getLoggedUser();

    if (user?.access === 'admin') {
      return data.groups.filter((group) => group.status === 'active');
    } else if (user?.access === 'teacher') {
      return data.groups
      .filter((group) => group.status === 'active')
      .filter((group) => group.teachers.some((teacherID) => teacherID === user?.id));
    } else {
      return data.groups
      .filter((group) => group.status === 'active')
      .filter((group) => group.students.some((StudentID) => StudentID === user?.id));
    }
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

  function showUserSubjects(): Subject[] {
    const data = getData();
    const user = getLoggedUser();

    if (user?.access === 'admin') {
      return data.subjects.filter((group) => group.status === 'active');
    } else {
      return data.subjects
      .filter((subject) => subject.status === 'active')
      .filter((subject) => subject.teachers.some((teacherID) => teacherID === user?.id));
    }
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

  function getStudentGroup(studentID: string): Group | undefined {
    const data = getData();

    return data.groups.find((group) => group.students.includes(studentID));

  }

  function getStudentLessons(id?: string): ILesson[] {
    const data = getData();
    const student = id ? getUser(id) as IStudent : getLoggedUser() as IStudent;

    const studentGroup = data?.groups.find((f) => f.students.some((id) => id === student?.id));

    const lessons = data?.lessons
    .filter((lesson) => lesson.groups.some((id) => id === studentGroup?.id))
    .filter((lesson) => !student.lessons.some((l) => l.id === lesson.id))
    .filter((lesson) => !data.evaluate.some((e) => e.lessonID === lesson.id && e.student === student.id))
    .filter((lesson) => lesson.status === 'active');
    
    return lessons;
  }

  function getStudentsByGroup(groupID: string[]): IStudent[] {
    const data = getData();
    const users = data.groups
    .filter((group) => groupID.some((id) => group.id === id))
    .map((group) => group.students)
    .flat()
    .map((studentID) => data.users.find((user) => studentID === user.id))

    return users as IStudent[];
  }

  function getStudentsByTeacher(teacherID: string): IStudent[] {
    const data = getData();
    const teacherGroups = data.groups
    .filter((group) => group.teachers.some((id) => teacherID === id))
    .map((group) => group.id)

    return getStudentsByGroup(teacherGroups);
  }

  function counterCorrectWrongQuestions(counterType: 'correct' | 'wrong', lesson: TaskStudent): number {
    if (counterType === 'correct') {
      return lesson.answers.filter((f) => f.isCorrect === true).length;
    } else if (counterType === 'wrong') {
      return lesson.answers.filter((f) => f.isCorrect === false).length;
    } else {
      return 0;
    }
  }

  return {
    createInitialUser,
    getData,
    getUser,
    getUsersByAcess,
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
    showUserGroups,
    getSubject,
    createSubject,
    removeSubject,
    editSubject,
    showUserSubjects,
    editDefaultPassword,
    editPassword,
    getStudentGroup,
    getStudentLessons,
    getStudentsByGroup,
    getStudentsByTeacher,
    counterCorrectWrongQuestions,
  }
}

export default useData;