import React from 'react';
import Panel from '../Panel.module.css';
import { GlobalContext } from '../../../GlobalContext';
import useData from '../../../hooks/useData';
import Message from '../../../components/Message/Message';
import HandleGroup from './components/HandleGroup';
import EditIcon from '../../../components/Icons/EditIcon';
import DeleteIcon from '../../../components/Icons/DeleteIcon';
import MoreInfo from '../../../components/Icons/MoreInfo';
import { MobileInfoProps } from '../../../types/Commom';
import Modal from '../../../components/Modal';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import { Group } from '../../../types/Group';

const Groups = () => {
  const { data, confirm, setConfirm } = React.useContext(GlobalContext);
  const { removeGroup } = useData();
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [toggleEdit, setToggleEdit] = React.useState<boolean>(false);
  const [groupID, setGroupID] = React.useState<string>('');

  const [toggleMobile, setToggleMobile] = React.useState(false);
  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoProps[]>([{title: '', description: ''}]);

  function handleEdit(classid: string): void {
    setGroupID(classid);
    setToggleEdit(true);
  }

  function handleRemoveGroup(id: string): void {
    removeGroup(id);
  }

  function handleMobileInfo(m: Group): void {
    const students = {title: 'Estudantes', description: m.students.length};
    const status = {title: 'Estado', description: m.status ? 'Ativado' : 'Desativado'};

    setMobileInfo([students, status]);
    setToggleMobile(true);
  }

  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <button onClick={() => setToggle(!toggle)}>Criar turma +</button>
      </div>

      <div className={`${Panel.info} ${Panel.groups}`}>

        <div>
          <span>Nome</span>
          <span>Alunos</span>
          <span>Estado</span>
          <span className={Panel.mobile}>Informações</span>
          <span>Editar</span>
          <span>Excluir</span>
        </div>

        {data?.groups.map((m) => (
          <div key={m.id} className={Panel.class}>
            <span>{m.name}</span>
            <span>{m.students.length}</span>
            <span>{m.status ? 'Ativado' : 'Desativado'}</span>
            <button className={Panel.mobile} onClick={() => handleMobileInfo(m)} ><MoreInfo /></button>
            <button onClick={() => handleEdit(m.id)}><EditIcon /></button>
            <button onClick={() => setConfirm({toggle: true, type: 'confirm', text: 'Deseja realmente excluir essa turma?', action: () => handleRemoveGroup(m.id)})}><DeleteIcon /></button>
          </div>
        ))}
      </div>

      {toggle && <HandleGroup setToggle={setToggle} />}
      {toggleEdit && (<HandleGroup setToggle={setToggleEdit} groupID={groupID} />)}
      {confirm.toggle && <Message />}

      {toggleMobile && mobileInfo && (
        <Modal setToggle={setToggleMobile}>
          <MobileInfo info={mobileInfo} />
        </Modal>
      )}
    </section>
  )
}

export default Groups;