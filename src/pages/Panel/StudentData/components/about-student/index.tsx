import { useContext } from 'react';
import Styles from '../../StudentData.module.css';
import { GlobalContext } from '../../../../../GlobalContext';
import { IStudent } from '../../../../../types/Users';
import { ILesson } from '../../../../../types/Lessons';

interface IAboutStudentProps {
  student: IStudent,
  lessonsTodo: ILesson[],
}

const AboutStudent = ({ student, lessonsTodo }: IAboutStudentProps) => {
  const { data } = useContext(GlobalContext);

  return (
    <>
     <div className={Styles.wrapper}>
        <h2>Informações</h2>
        <span>Nome: {student.name}</span>
        <span>Turma: {data.groups.find((group) => group.students.some((studentID) => student.id === studentID))?.name}</span>
        <span>Email: {student.email}</span>
        <span>Login: {student.login}</span>
      </div>

      <div className={Styles.wrapper}>
        <h2>Progressão</h2>
        <span>Level: {student.level}</span>
        <span>XP Atual: {student.xp}</span>
        <span>XP Próx nível: {student.level * 125}</span>
        <span>XP Total {student.xp + (student.level - 1) * 125}</span>
        <span>Rank 1</span>
      </div>
      
      <div className={Styles.wrapper}>
        <h2>Estatísticas</h2>
        <span>Aulas realizadas: {student.lessons.length}</span>
        <span>Aulas a fazer: {lessonsTodo.length}</span>
      </div>
    </>
  )
}

export default AboutStudent;