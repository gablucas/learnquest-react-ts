import { Subject } from "../../types/Commom"
import { Group } from "../../types/Group"
import { ILesson } from "../../types/Lessons"
import { IInstituition, IStudent, IUser } from "../../types/Users"

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
      name: 'Paulo',
      login: 'professor',
      email: 'professor@edu.com.br',
      password: 'teste',
      status: 'active',
    }

    const teacher_2: IUser = {
      id: 'U3',
      access: 'teacher',
      name: 'Lins',
      login: 'professor',
      email: 'professor@edu.com.br',
      password: 'teste',
      status: 'active',
    }

    const student_1: IStudent = {
      id: 'U4',
      access: 'student',
      name: 'Gabriel',
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
      name: 'Jefferson',
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
      name: 'Guilherme',
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

export { createInitialUser };