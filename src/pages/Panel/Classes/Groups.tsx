import React from 'react';
import Styles from '../Panel.module.css';
import { GlobalContext } from '../../../GlobalContext';
import useData from '../../../hooks/useData';
import Message from '../../../components/Message/Message';
import HandleGroup from './components/HandleGroup';
import EditIcon from '../../../components/Icons/EditIcon';
import DeleteIcon from '../../../components/Icons/DeleteIcon';

const Groups = () => {
  const { data, confirm, setConfirm } = React.useContext(GlobalContext);
  const { removeGroup } = useData();
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [toggleEdit, setToggleEdit] = React.useState<boolean>(false);
  const [groupID, setGroupID] = React.useState<string>('');

  function handleEdit(classid: string): void {
    setGroupID(classid);
    setToggleEdit(true);
  }

  function handleRemoveGroup(id: string): void {
    removeGroup(id);
  }

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
            <button onClick={() => handleEdit(m.id)}><EditIcon /></button>
            <button onClick={() => setConfirm({toggle: true, type: 'confirm', text: 'Deseja realmente excluir essa turma?', action: () => handleRemoveGroup(m.id)})}><DeleteIcon /></button>
          </div>
        ))}
      </div>

      {toggle && <HandleGroup setToggle={setToggle} />}
      {toggleEdit && (<HandleGroup setToggle={setToggleEdit} groupID={groupID} />)}
      {confirm.toggle && <Message />}
    </section>
  )
}

export default Groups;