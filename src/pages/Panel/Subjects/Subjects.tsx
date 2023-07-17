import React from 'react';
import Styles from '../Panel.module.css';
import useData from '../../../hooks/useData';
import { GlobalContext } from '../../../GlobalContext';
import Message from '../../../components/Message/Message';
import HandleSubject from './HandleSubject';
import EditIcon from '../../../components/Icons/EditIcon';
import DeleteIcon from '../../../components/Icons/DeleteIcon';

const Subjects = () => {
  const { data, confirm, setConfirm } = React.useContext(GlobalContext)
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [toggleEdit, setToggleEdit] = React.useState<boolean>(false);
  const [subjectID, setSubjectID] = React.useState<string>('');
  const { removeSubject } = useData();

  function handleRemoveSubject(id: string): void {
    removeSubject(id);
  }

  function handleEdit(id: string): void {
    setSubjectID(id);
    setToggleEdit(true);
  }

  return (
    <section className={Styles.subjects_container}>

      <div className={Styles.subjects_options}>
        <button onClick={() => setToggle(!toggle)}>Criar matéria +</button>
      </div>

      <div className={Styles.subjects}>

        <div>
          <span>Nome</span>
          <span>Aulas</span>
          <span>Estado</span>
          <span>Editar</span>
          <span>Excluir</span>
        </div>

        {data?.subjects.map((m) => (
          <div key={m.id} className={Styles.subject}>
            <span>{m.name}</span>
            <span>{data.lessons.map((lesson) => lesson.subject === m.id).length}</span>
            <span>{m.status ? 'Ativado' : 'Desativado'}</span>
            <button onClick={() => handleEdit(m.id)}><EditIcon /></button>
            <button onClick={() => setConfirm({toggle: true, type: 'confirm', text: 'Deseja realmente excluir está matéria?', action: () => handleRemoveSubject(m.id)})}><DeleteIcon /></button>
          </div>
        ))}
      </div>


      {toggle && <HandleSubject setToggle={setToggle} />}
      {toggleEdit && <HandleSubject setToggle={setToggleEdit} subjectID={subjectID} />}
      {confirm.toggle && <Message />}
    </section>
  )
}

export default Subjects;