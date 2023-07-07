import React from 'react';
import Styles from '../../Panel.module.css';
import { GlobalContext } from '../../../../GlobalContext';
import useData from '../../../../hooks/useData';
import { IInstituition } from '../../../../types/Users';
import { Classes } from '../../../../types/Classes';
import Modal from '../../../../components/Modal';

type NewuserProps = {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const Newclass = ({ setToggle }: NewuserProps) => {
  const { createClass } = useData();
  const { data } = React.useContext(GlobalContext);
  const [newClass, setNewClass] = React.useState<Classes>(
      {
        id: ((data as IInstituition).classes.length + 1).toString(),
        name: '',
        students: [],
        status: 'active',
      }
    );


  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (newClass.name) {
      createClass(newClass);
      setToggle(false);
    }
  }


  function handleClassName(e: React.ChangeEvent<HTMLInputElement>): void {
    setNewClass({...newClass, name: e.target.value})
  }

  function handleStudent(e: React.ChangeEvent<HTMLInputElement>, studentId: string): void {
    if (e.target.checked) {
      setNewClass({...newClass, students: [...newClass.students, studentId]})
    } else {
      const updateNewClass = {...newClass};
      updateNewClass.students = updateNewClass.students.filter((f) => f !== studentId);
      setNewClass(updateNewClass);
    }
  }

  if (data)
  return (
    <Modal setToggle={setToggle}>

      <div className={Styles.newclass}>
        <h2>Criar nova turma</h2>
        <form onSubmit={handleSubmit}>

          <div>
            <label>Nome da turma</label>
            <input type='text' value={newClass.name} onChange={(e) => handleClassName(e)} />
          </div>

          <div>
            <span>Adicionar aluno a turma</span>
            <div className={Styles.newclass_students}>
              {data.users.map((c) => c.access === 'student' && (
                <div key={c.id}>
                  {!data.classes.some((s) => s.students.some((s2) => s2 === c.id)) && (<input type='checkbox' onChange={(e) => handleStudent(e, c.id)}/>)}
                  {!data.classes.some((s) => s.students.some((s2) => s2 === c.id)) ? (<label>{c.nome}</label>) : (<label>{`${c.nome} - ${data.classes.find((f) => f.students.some((id) => id === c.id))?.name}`}</label>)}
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

export default Newclass;