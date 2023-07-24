import React from 'react';
import Styles from '../Groups.module.css';
import useData from '../../../../hooks/useData';
import Modal from '../../../../components/Modal';
import useRandom from '../../../../hooks/useRandom';
import Select from '../../../../components/Inputs/Select';
import useForm from '../../../../hooks/useForm';
import Input from '../../../../components/Inputs/Input';
import { GlobalContext } from '../../../../GlobalContext';
import { Group } from '../../../../types/Group';
import { Status } from '../../../../types/Commom';

type HandleUserProps = {
  groupID?: string,
}

const HandleGroup = ({ groupID }: HandleUserProps) => {
  const { createGroup, editGroup } = useData();
  const { getRandomID } = useRandom();
  const { data, setToggle } = React.useContext(GlobalContext);
  const group = data.groups.find((group) => group.id === groupID);

  const [students, setStudents] = React.useState<string[]>(group ? group.students : [])

    const name = useForm({type: 'name', initialValue: group ? group.name : ''});
    const status = useForm({type: 'status', initialValue: group ? group.status : ''})


    function studentHasGroup(userid: string): boolean {
      return data.groups.every((group) => group.students.every((id) => id !== userid));
    }
  
    function onStudentGroup(userid: string): boolean {
      return data.groups.some((group) => group.id === groupID && group.students.some((student) => student === userid));
    }
  

    function handleStudent(e: React.ChangeEvent<HTMLInputElement>, studentId: string): void {
      if (e.target.checked) {
        setStudents([...students, studentId]);
      } else {
        setStudents(students.filter((student) => student !== studentId))
      }
    }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    
    const group: Group = {
      id: '',
      name: name.value,
      students: students,
      status: 'active',
    }

    if (!groupID && name.validate()) {
      group.id = `G${getRandomID()}`;
      createGroup(group);
      setToggle('none');

    } else if(groupID && name.validate() && status.validate()) {
      group.id = groupID;
      group.status = status.value as Status;
      editGroup(groupID, group)
      setToggle('none');
    }
  }

  if (data)
  return (
    <Modal>

      <div className={Styles.handlegroup}>

        <div>
          <h2>{groupID ? 'Editar' : 'Criar nova'} turma</h2>
          <button onClick={() => setToggle('none')}>Fechar</button>
        </div>

        <form onSubmit={handleSubmit}>

          <Input label='Nome da turma' type='text' {...name} />

          <div>
            <span>Adicionar aluno a turma</span>
            <div className={Styles.handlegroup_students}>
              {data.users.map((user) => user.access === 'student' && (
                <div key={user.id}>
                  {(studentHasGroup(user.id) || onStudentGroup(user.id)) && (<input type='checkbox' checked={students.some((student) => student === user.id)} onChange={(e) => handleStudent(e, user.id)}/>)}

                  {studentHasGroup(user.id) ? (<label>{user.name}</label>) : (<label>{`${user.name} - ${data.groups.find((f) => f.students.some((id) => id === user.id))?.name}`}</label>)}
                </div>
              ))}
            </div>
          </div>

          {groupID && (<Select label='Estado' options={[{name: 'Ativo', value: 'active'}, {name: 'Desativo', value: 'disable'}]} {...status} />)}

          <button>{!groupID ? 'Criar turma' : 'Atualizar Turma'}</button>
        </form>
      </div>

      </Modal>
  )
}

export default HandleGroup;