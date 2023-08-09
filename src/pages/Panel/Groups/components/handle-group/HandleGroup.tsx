import React from 'react';
import Panel from '../../../Panel.module.css';
import Styles from './HandleGroup.module.css'
import Modal from '../../../../../components/Modal';
import Select from '../../../../../components/Inputs/Select';
import useForm from '../../../../../hooks/useForm';
import Input from '../../../../../components/Inputs/Input';
import { GlobalContext } from '../../../../../GlobalContext';
import { Group } from '../../../../../types/Group';
import { Status } from '../../../../../types/Commom';
import Expand from '../../../../../components/Icons/Contract';
import Contract from '../../../../../components/Icons/Expand';
import { useGroup } from '../../../../../hooks/useGroup';
import { generateRandomID } from '../../../../../utils/generateRandomID';

type HandleUserProps = {
  groupID?: string,
}

const HandleGroup = ({ groupID }: HandleUserProps) => {
  const { createGroup, editGroup } = useGroup();
  const { data, setToggle } = React.useContext(GlobalContext);
  const groupToEdit = data.groups.find((group) => group.id === groupID);

  const [students, setStudents] = React.useState<string[]>(groupToEdit ? groupToEdit.students : []);
  const [teachers, setTeachers] = React.useState<string[]>(groupToEdit ? groupToEdit.teachers : []);
  const [toggleTeacherStudent, setToggleTeacherStudent] = React.useState<'student' | 'teacher'>('student');

  const name = useForm({type: 'name', initialValue: groupToEdit ? groupToEdit.name : ''});
  const status = useForm({type: 'status', initialValue: groupToEdit ? groupToEdit.status : ''})

  function studentHasGroup(userid: string): boolean {
    return data.groups.every((group) => group.students.every((id) => id !== userid));
  }

  function onStudentGroup(userid: string): boolean {
    return data.groups.some((group) => group.id === groupID && group.students.some((student) => student === userid));
  }

  function handleStudent(e: React.ChangeEvent<HTMLInputElement>, studentID: string): void {
    if (e.target.checked) {
      setStudents([...students, studentID]);
    } else {
      setStudents(students.filter((student) => student !== studentID))
    }
  }

  function handleTeacher(e: React.ChangeEvent<HTMLInputElement>, teacherID: string): void {
    if (e.target.checked) {
      setTeachers([...teachers, teacherID]);
    } else {
      setTeachers(teachers.filter((teacher) => teacher !== teacherID))
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    
    const group: Group = {
      id: groupToEdit ? groupToEdit.id : `G${generateRandomID()}`,
      name: name.value,
      students,
      teachers,
      status: groupToEdit ? status.value as Status :'active',
    }

    if (!groupID && name.validate()) {
      createGroup(group);
      setToggle('none');

    } else if(groupID && name.validate() && status.validate()) {
      editGroup(groupID, group)
      setToggle('none');
    }
  }

  if (data)
  return (
    <Modal>

      <div className={Styles.container}>

        <div>
          <h2>{groupID ? 'Editar' : 'Criar nova'} turma</h2>
          <button onClick={() => setToggle('none')}>Fechar</button>
        </div>

        <form onSubmit={handleSubmit}>

          <Input label='Nome da turma' type='text' {...name} />

          <div>
            <span className={Styles.togglets} onClick={() => setToggleTeacherStudent('student')}>Adicionar aluno a turma {toggleTeacherStudent === 'student' ? <Expand /> : <Contract />}</span>
            {toggleTeacherStudent === 'student' && (<div className={Panel.selectusers}>
              {data.users.map((user) => user.access === 'student' && (
                <div key={user.id}>
                  {(studentHasGroup(user.id) || onStudentGroup(user.id)) && (<input type='checkbox' checked={students.some((student) => student === user.id)} onChange={(e) => handleStudent(e, user.id)}/>)}

                  {studentHasGroup(user.id) ? (<label>{user.name}</label>) : (<label>{`${user.name} - ${data.groups.find((f) => f.students.some((id) => id === user.id))?.name}`}</label>)}
                </div>
              ))}
            </div>)}
          </div>

          <div>
            <span className={Styles.togglets} onClick={() => setToggleTeacherStudent('teacher')}>Adicionar professor a turma{toggleTeacherStudent === 'teacher' ? <Expand /> : <Contract />}</span>
            {toggleTeacherStudent === 'teacher' && (<div className={Panel.selectusers}>
              {data.users.map((user) => user.access === 'teacher' && (
                <div key={user.id}>
                  <input type='checkbox' checked={teachers.some((teacher) => teacher === user.id)} onChange={(e) => handleTeacher(e, user.id)}/>
                  <label>{user.name}</label>
                </div>
              ))}
            </div>)}
          </div>

          {groupID && (<Select label='Estado' options={[{name: 'Ativo', value: 'active'}, {name: 'Desativo', value: 'disable'}]} {...status} />)}

          <button>{!groupID ? 'Criar turma' : 'Atualizar Turma'}</button>
        </form>
      </div>

      </Modal>
  )
}

export default HandleGroup;