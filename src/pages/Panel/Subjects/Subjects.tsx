import React from 'react';
import Panel from '../Panel.module.css';
import useData from '../../../hooks/useData';
import { GlobalContext } from '../../../GlobalContext';
import Message from '../../../components/Message/Message';
import HandleSubject from './HandleSubject';
import EditIcon from '../../../components/Icons/EditIcon';
import DeleteIcon from '../../../components/Icons/DeleteIcon';
import MoreInfo from '../../../components/Icons/MoreInfo';
import { MobileInfoData, Subject } from '../../../types/Commom';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import useHelpers from '../../../hooks/useHelpers';
import FilterIcon from '../../../components/Icons/FilterIcon';
import Filter from '../../../components/Filter/Filter';

const Subjects = () => {
  const { data, confirm, setConfirm, filter, setFilter } = React.useContext(GlobalContext)
  const [subjectID, setSubjectID] = React.useState<string>('');
  const { removeSubject } = useData();
  const { isArrayEmpty, arrayIncludes } = useHelpers();
  
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [toggleEdit, setToggleEdit] = React.useState<boolean>(false);
  const [toggleFilter, setToggleFilter] = React.useState<boolean>(false);
  const [toggleMobile, setToggleMobile] = React.useState(false);
  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoData[]>([{title: '', description: ''}]);

  let subjects = data.subjects;
  if (!isArrayEmpty(filter.access)) subjects = subjects.filter((subject) => arrayIncludes(filter.subject, subject.id));
  if (!isArrayEmpty(filter.status)) subjects = subjects.filter((subject) => arrayIncludes(filter.status, subject.status));

  function getLessonsPerSubject(id: string): number {
    return data.lessons.map((lesson) => lesson.subject === id).length
  }

  function handleRemoveSubject(id: string): void {
    removeSubject(id);
  }

  function handleEdit(id: string): void {
    setSubjectID(id);
    setToggleEdit(true);
  }

  function handleMobileInfo(subject: Subject): void {
    const lessons = {title: 'Aulas', description: getLessonsPerSubject(subject.id)};
    const status = {title: 'Estado', description: subject.status ? 'Ativado' : 'Desativado'};

    setMobileInfo([lessons, status]);
    setToggleMobile(true);
  }

  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <button onClick={() => setToggle(!toggle)}>Criar matéria +</button>
        <button onClick={() => setToggleFilter(true)} className={!isArrayEmpty(filter.status) || !isArrayEmpty(filter.subject) ? Panel.filter : ''} >Filtrar <FilterIcon /></button>
        {(!isArrayEmpty(filter.status) || !isArrayEmpty(filter.subject)) && (<button onClick={() => setFilter({...filter, subject: [], status: []})} className={Panel.cleanfilter}>Limpar filtro</button>)}
      </div>

      <div className={`${Panel.info} ${Panel.subjects}`}>

        <div>
          <span>Nome</span>
          <span>Aulas</span>
          <span>Estado</span>
          <span className={Panel.mobile}>Informações</span>
          <span>Editar</span>
          <span>Excluir</span>
        </div>

        {subjects.map((m) => (
          <div key={m.id} className={Panel.subject}>
            <span>{m.name}</span>
            <span>{getLessonsPerSubject(m.id)}</span>
            <span>{m.status === 'active' ? 'Ativado' : 'Desativado'}</span>
            <button className={Panel.mobile} onClick={() => handleMobileInfo(m)} ><MoreInfo /></button>
            <button onClick={() => handleEdit(m.id)}><EditIcon /></button>
            <button onClick={() => setConfirm({toggle: true, type: 'confirm', text: 'Deseja realmente excluir está matéria?', action: () => handleRemoveSubject(m.id)})}><DeleteIcon /></button>
          </div>
        ))}
      </div>


      {toggle && <HandleSubject setToggle={setToggle} />}
      {toggleEdit && <HandleSubject setToggle={setToggleEdit} subjectID={subjectID} />}
      {confirm.toggle && <Message />}
      {toggleFilter && <Filter options={{access: false, student: false, subject: true, group: false, createdby: false, status: true}} setToggle={setToggleFilter} />}
      {toggleMobile && mobileInfo && (<MobileInfo info={mobileInfo} setToggle={setToggleMobile} />)}
    </section>
  )
}

export default Subjects;