import React from 'react';
import Panel from '../Panel.module.css';
import { GlobalContext } from '../../../GlobalContext';
import useData from '../../../hooks/useData';
import Message from '../../../components/Message/Message';
import HandleGroup from './components/HandleGroup';
import EditIcon from '../../../components/Icons/EditIcon';
import DeleteIcon from '../../../components/Icons/DeleteIcon';
import MoreInfo from '../../../components/Icons/MoreInfo';
import { MobileInfoData } from '../../../types/Commom';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import { Group } from '../../../types/Group';
import Filter from '../../../components/Filter/Filter';
import useHelpers from '../../../hooks/useHelpers';
import FilterIcon from '../../../components/Icons/FilterIcon';

const Groups = () => {
  const { data, confirm, setConfirm, filter, setFilter } = React.useContext(GlobalContext);
  const { removeGroup } = useData();
  const { isArrayEmpty, arrayIncludes } = useHelpers();
  const [groupID, setGroupID] = React.useState<string>('');

  const [toggle, setToggle] = React.useState<boolean>(false);
  const [toggleEdit, setToggleEdit] = React.useState<boolean>(false);
  const [toggleFilter, setToggleFilter] = React.useState<boolean>(false);
  const [toggleMobile, setToggleMobile] = React.useState(false);
  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoData[]>([{title: '', description: ''}]);

  let groups = data.groups;
  if (!isArrayEmpty(filter.access)) groups = groups.filter((groups) => arrayIncludes(filter.group, groups.id));
  if (!isArrayEmpty(filter.status)) groups = groups.filter((groups) => arrayIncludes(filter.status, groups.status));

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
        <button onClick={() => setToggleFilter(true)} className={!isArrayEmpty(filter.group) || !isArrayEmpty(filter.status) ? Panel.filter : ''} >Filtrar <FilterIcon /></button>
        {(!isArrayEmpty(filter.group) || (!isArrayEmpty(filter.status))) && (<button onClick={() => setFilter({...filter, group: [], status: []})} className={Panel.cleanfilter}>Limpar filtro</button>)}
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

        {groups.map((m) => (
          <div key={m.id} className={Panel.class}>
            <span>{m.name}</span>
            <span>{m.students.length}</span>
            <span>{m.status === 'active' ? 'Ativado' : 'Desativado'}</span>
            <button className={Panel.mobile} onClick={() => handleMobileInfo(m)} ><MoreInfo /></button>
            <button onClick={() => handleEdit(m.id)}><EditIcon /></button>
            <button onClick={() => setConfirm({toggle: true, type: 'confirm', text: 'Deseja realmente excluir essa turma?', action: () => handleRemoveGroup(m.id)})}><DeleteIcon /></button>
          </div>
        ))}
      </div>

      {toggle && <HandleGroup setToggle={setToggle} />}
      {toggleEdit && (<HandleGroup setToggle={setToggleEdit} groupID={groupID} />)}
      {confirm.toggle && <Message />}
      {toggleFilter && <Filter options={{access: false, student: false, subject: false, group: true, createdby: false, status: true}} setToggle={setToggleFilter} />}
      {toggleMobile && mobileInfo && (<MobileInfo info={mobileInfo} setToggle={setToggleMobile} />)}
    </section>
  )
}

export default Groups;