import React from 'react';
import Styles from '../Groups.module.css';
import { GlobalContext } from '../../../../GlobalContext';
import useData from '../../../../hooks/useData';
import { Group } from '../../../../types/Group';
import Modal from '../../../../components/Modal';
import useValidate from '../../../../hooks/useValidate';
import useRandom from '../../../../hooks/useRandom';
import Error from '../../../../components/Helper/Error';

type HandleUserProps = {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>,
  groupID?: string,
}

const HandleGroup = ({ setToggle, groupID }: HandleUserProps) => {
  const { createGroup, editGroup } = useData();
  const { isEmpty, error } = useValidate();
  const { getRandomID } = useRandom();
  const { data } = React.useContext(GlobalContext);
  const [newGroup, setNewGroup] = React.useState<Group>(
      {
        id: `G${getRandomID()}`,
        name: '',
        students: [],
        status: true,
      }
    );

    React.useEffect(() => {
      if (groupID) {
        setNewGroup(data.groups.find((group) => group.id === groupID) as Group)
      }
    }, [data.groups, groupID])

    function studentHasGroup(userid: string): boolean {
      return data.groups.every((group) => group.students.every((id) => id !== userid));
    }
  
    function onStudentGroup(userid: string): boolean {
      return data.groups.some((group) => group.id === groupID && group.students.some((student) => student === userid));
    }
  
    function handleGroupName(e: React.ChangeEvent<HTMLInputElement>): void {
      setNewGroup({...newGroup, name: e.target.value})
    }

    function handleStudent(e: React.ChangeEvent<HTMLInputElement>, studentId: string): void {
      if (e.target.checked) {
        setNewGroup({...newGroup, students: [...newGroup.students, studentId]})
      } else {
        const updateNewGroup = {...newGroup};
        updateNewGroup.students = updateNewGroup.students.filter((f) => f !== studentId);
        setNewGroup(updateNewGroup);
      }
    }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (isEmpty('group' , newGroup.name)) {
      if (!groupID && newGroup.name) {
        createGroup(newGroup);
        
      } else if (groupID) {
        editGroup(groupID, newGroup);
      }
  
      setToggle(false);
    }
  }

  if (data)
  return (
    <Modal setToggle={setToggle}>

      <div className={Styles.handlegroup}>
        <div>
          <h2>{groupID ? 'Editar' : 'Criar nova'} turma</h2>
          <button onClick={() => setToggle(false)}>Fechar</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome da turma</label>
            <input type='text' value={newGroup.name} onChange={(e) => handleGroupName(e)} />
            {error === 'group' && (<Error>Campo vazio</Error>)}
          </div>

          <div>
            <span>Adicionar aluno a turma</span>
            <div className={Styles.handlegroup_students}>
              {data.users.map((user) => user.access === 'student' && (
                <div key={user.id}>
                  {(studentHasGroup(user.id) || onStudentGroup(user.id)) && (<input type='checkbox' checked={newGroup.students.some((student) => student === user.id)} onChange={(e) => handleStudent(e, user.id)}/>)}

                  {studentHasGroup(user.id) ? (<label>{user.name}</label>) : (<label>{`${user.name} - ${data.groups.find((f) => f.students.some((id) => id === user.id))?.name}`}</label>)}
                </div>
              ))}
            </div>
          </div>

          <button>{!groupID ? 'Criar turma' : 'Atualizar Turma'}</button>
        </form>
      </div>

      </Modal>
  )
}

export default HandleGroup;