import React from 'react';
import Styles from '../../Panel.module.css';
import { GlobalContext } from '../../../../GlobalContext';
import useData from '../../../../hooks/useData';
import { IInstituition } from '../../../../types/Users';
import { Group } from '../../../../types/Group';
import Modal from '../../../../components/Modal';

type NewuserProps = {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const NewGroup = ({ setToggle }: NewuserProps) => {
  const { createGroup } = useData();
  const { data } = React.useContext(GlobalContext);
  const [newGroup, setNewGroup] = React.useState<Group>(
      {
        id: ((data as IInstituition).groups.length + 1).toString(),
        name: '',
        students: [],
        status: 'active',
      }
    );


  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (newGroup.name) {
      createGroup(newGroup);
      setToggle(false);
    }
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

  if (data)
  return (
    <Modal setToggle={setToggle}>

      <div className={Styles.newgroup}>
        <h2>Criar nova turma</h2>
        <form onSubmit={handleSubmit}>

          <div>
            <label>Nome da turma</label>
            <input type='text' value={newGroup.name} onChange={(e) => handleGroupName(e)} />
          </div>

          <div>
            <span>Adicionar aluno a turma</span>
            <div className={Styles.newgroup_students}>
              {data.users.map((c) => c.access === 'student' && (
                <div key={c.id}>
                  {!data.groups.some((s) => s.students.some((s2) => s2 === c.id)) && (<input type='checkbox' onChange={(e) => handleStudent(e, c.id)}/>)}
                  {!data.groups.some((s) => s.students.some((s2) => s2 === c.id)) ? (<label>{c.nome}</label>) : (<label>{`${c.nome} - ${data.groups.find((f) => f.students.some((id) => id === c.id))?.name}`}</label>)}
                </div>
              ))}
            </div>
          </div>

          <button>Criar turma</button>
        </form>
      </div>

      </Modal>
  )
}

export default NewGroup;