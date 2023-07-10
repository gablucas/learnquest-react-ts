import React from 'react';
import Styles from '../Panel.module.css';
import { GlobalContext } from '../../../GlobalContext';
import NewGroup from './components/NewGroup';
import useData from '../../../hooks/useData';
import EditGroup from './components/EditGroup';

const Groups = () => {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [toggleEdit, setToggleEdit] = React.useState<boolean>(false);
  const [groupID, setGroupID] = React.useState<string>('');

  function handleEdit(classid: string): void {
    setGroupID(classid);
    setToggleEdit(true);
  }


  const { data } = React.useContext(GlobalContext)
  const { removeGroup } = useData();

  return (
    <section className={Styles.groups_container}>

      <div className={Styles.groups_options}>
        <button onClick={() => setToggle(!toggle)}>Criar turma +</button>
      </div>

      <div className={Styles.groups}>

        <div>
          <span>Nome</span>
          <span>Alunos</span>
          <span>Estado</span>
          <span>Editar</span>
          <span>Excluir</span>
        </div>

        {data?.groups.map((m) => (
          <div key={m.id} className={Styles.class}>
            <span>{m.name}</span>
            <span>{m.students.length}</span>
            <span>{m.status ? 'Ativado' : 'Desativado'}</span>
            <button onClick={() => handleEdit(m.id)}>Editar</button>
            <button onClick={() => removeGroup(m.id)}>Excluir</button>
          </div>
        ))}
      </div>

      {toggle && <NewGroup setToggle={setToggle} />}
      {toggleEdit && (<EditGroup setToggle={setToggleEdit} groupID={groupID} />)}
    </section>
  )
}

export default Groups;