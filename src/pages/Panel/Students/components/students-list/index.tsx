import Panel from '../../../Panel.module.css';
import StudentDataIcon from '../../../../../components/Icons/StudentDataIcon';
import { Link } from 'react-router-dom';
import { IStudent } from "../../../../../types/Users";
import { ButtonMobileInfo } from '../../../../../components/button-mobile-info';
import { getStudentGroup } from '../../../../../helpers/group/getStudentGroup';

interface IStudentsList {
  students: IStudent[],
}

const StudentsList = ({ students }: IStudentsList) => {

  return (
    <>
    {students.map((student) => (
      <div key={student.id} className={Panel.students}>
        <span>{student.name}</span>
        <span>{getStudentGroup(student.id)?.name}</span>
        <span>{student.level}</span>
        <ButtonMobileInfo info={[['Nome', student.name], ['Turma', getStudentGroup(student.id)?.name || 'Sem turma'] , ['Level', student.level]]} />
        <Link to={`/painel/aluno/${student.id}`}><StudentDataIcon /></Link>
      </div>
    ))}
    </>
  )
}

export default StudentsList;