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
  const { data, setConfirm, filter, toggle, setToggle } = React.useContext(GlobalContext)
  const [subjectID, setSubjectID] = React.useState<string>('');
  const { removeSubject } = useData();
  const { isArrayEmpty, isAnyArrayFilled, arrayIncludes, cleanFilter } = useHelpers();
  

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
    setToggle('edit');
  }

  function handleMobileInfo(subject: Subject): void {
    const lessons = {title: 'Aulas', description: getLessonsPerSubject(subject.id)};
    const status = {title: 'Estado', description: subject.status ? 'Ativado' : 'Desativado'};

    setMobileInfo([lessons, status]);
    setToggle('mobile');
  }

  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <button onClick={() => setToggle('create')}>Criar matéria +</button>
        <button onClick={() => setToggle('filter')} className={isAnyArrayFilled([filter.status, filter.subject]) ? Panel.filter : ''} >Filtrar <FilterIcon /></button>
        {isAnyArrayFilled([filter.status, filter.subject]) && (<button onClick={() => cleanFilter()} className={Panel.cleanfilter}>Limpar filtro</button>)}
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
            <button onClick={() => setConfirm({type: 'confirm', text: 'Deseja realmente excluir está matéria?', action: () => handleRemoveSubject(m.id)})}><DeleteIcon /></button>
          </div>
        ))}
      </div>


      {toggle === 'create' && <HandleSubject />}
      {toggle === 'edit' && <HandleSubject subjectID={subjectID} />}
      {toggle === 'confirm' && <Message />}
      {toggle === 'filter' && <Filter options={{access: false, student: false, subject: true, group: false, createdby: false, status: true}} />}
      {toggle === 'mobile' && mobileInfo && (<MobileInfo info={mobileInfo} />)}
    </section>
  )
}

export default Subjects;