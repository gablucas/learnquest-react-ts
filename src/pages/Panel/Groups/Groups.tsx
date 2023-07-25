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
  const { data, setConfirm, filter, toggle, setToggle } = React.useContext(GlobalContext);
  const { removeGroup } = useData();
  const { isArrayEmpty, isAnyArrayFilled, arrayIncludes, cleanFilter } = useHelpers();
  const [groupID, setGroupID] = React.useState<string>('');

  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoData[]>([{title: '', description: ''}]);

  let groups = data.groups;
  if (!isArrayEmpty(filter.group)) groups = groups.filter((groups) => arrayIncludes(filter.group, groups.id));
  if (!isArrayEmpty(filter.status)) groups = groups.filter((groups) => arrayIncludes(filter.status, groups.status));

  function handleEdit(classid: string): void {
    setGroupID(classid);
    setToggle('edit');
  }

  function handleRemoveGroup(id: string): void {
    removeGroup(id);
  }

  function handleMobileInfo(m: Group): void {
    const students = {title: 'Estudantes', description: m.students.length};
    const status = {title: 'Estado', description: m.status ? 'Ativado' : 'Desativado'};

    setMobileInfo([students, status]);
    setToggle('mobile');
  }

  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <button onClick={() => setToggle('create')}>Criar turma +</button>
        <button onClick={() => setToggle('filter')} className={isAnyArrayFilled([filter.group, filter.status]) ? Panel.filter : ''} >Filtrar <FilterIcon /></button>
        {isAnyArrayFilled([filter.group, filter.status]) && (<button onClick={() => cleanFilter()} className={Panel.cleanfilter}>Limpar filtro</button>)}
      </div>

      <div className={`${Panel.info} ${Panel.groups}`}>

        <div>
          <span>Nome</span>
          <span>Alunos</span>
          <span>Professores</span>
          <span>Estado</span>
          <span className={Panel.mobile}>Informações</span>
          <span>Editar</span>
          <span>Excluir</span>
        </div>

        {groups.map((m) => (
          <div key={m.id} className={Panel.class}>
            <span>{m.name}</span>
            <span>{m.students.length}</span>
            <span>{m.teachers.length}</span>
            <span>{m.status === 'active' ? 'Ativado' : 'Desativado'}</span>
            <button className={Panel.mobile} onClick={() => handleMobileInfo(m)} ><MoreInfo /></button>
            <button onClick={() => handleEdit(m.id)}><EditIcon /></button>
            <button onClick={() => setConfirm({type: 'confirm', text: 'Deseja realmente excluir essa turma?', action: () => handleRemoveGroup(m.id)})}><DeleteIcon /></button>
          </div>
        ))}
      </div>

      {toggle === 'create' && <HandleGroup />}
      {toggle === 'edit' && (<HandleGroup groupID={groupID} />)}
      {toggle === 'confirm' && <Message />}
      {toggle === 'filter' && <Filter options={{access: false, student: false, subject: false, group: true, createdby: false, status: true}} />}
      {toggle === 'mobile' && mobileInfo && (<MobileInfo info={mobileInfo} />)}
    </section>
  )
}

export default Groups;