import Styles from '../../Panel.module.css';
import React from 'react';
import { GlobalContext } from "../../../../GlobalContext";
import Modal from "../../../../components/Modal"
import { Group } from '../../../../types/Group';
import useData from '../../../../hooks/useData';

type EditGroupProps = {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>,
  groupID: string,
}

const EditGroup = ({ setToggle, groupID }: EditGroupProps) => {
  const { data } = React.useContext(GlobalContext);
  const [updateGroup, setUpdateGroup] = React.useState<Group>(data.groups.find((group) => group.id === groupID) as Group);
  const { editGroup } = useData();

  function studentHasGroup(userid: string): boolean {
    return data.groups.every((group) => group.students.every((id) => id !== userid));
  }

  function onStudentGroup(userid: string): boolean {
    return data.groups.some((group) => group.id === groupID && group.students.some((student) => student === userid));
  }

  function handleGroupName(e: React.ChangeEvent<HTMLInputElement>): void {
    setUpdateGroup({...updateGroup, name: e.target.value})
  }

  function handleStudent(e: React.ChangeEvent<HTMLInputElement>, studentId: string): void {
    console.log(e.target.checked)
    if (e.target.checked) {
      setUpdateGroup({...updateGroup, students: [...updateGroup.students, studentId]})
    } else {
      const updateNewGroup = {...updateGroup};
      updateNewGroup.students = updateNewGroup.students.filter((f) => f !== studentId);
      setUpdateGroup(updateNewGroup);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (updateGroup.name) {
      editGroup(groupID, updateGroup);
      setToggle(false);
    }
  }

  if (data)
  return (
    <Modal setToggle={setToggle}>

      <div className={Styles.newgroup}>
        <h2>Atualizar turma</h2>
        <form onSubmit={handleSubmit}>

          <div>
            <label>Nome da turma</label>
            <input type='text' value={updateGroup.name} onChange={(e) => handleGroupName(e)} />
          </div>

          <div>
            <span>Adicionar aluno a turma</span>
            <div className={Styles.newgroup_students}>
              {data.users.map((user) => user.access === 'student' && (
                <div key={user.id}>
                  {(studentHasGroup(user.id) || onStudentGroup(user.id)) && (<input type='checkbox' checked={updateGroup.students.some((student) => student === user.id)} onChange={(e) => handleStudent(e, user.id)}/>)}

                  {studentHasGroup(user.id) ? (<label>{user.nome}</label>) : (<label>{`${user.nome} - ${data.groups.find((f) => f.students.some((id) => id === user.id))?.name}`}</label>)}
                </div>
              ))}
            </div>
          </div>

          <button>Atualizar turma</button>
        </form>
      </div>

      </Modal>
  )
}

export default EditGroup;