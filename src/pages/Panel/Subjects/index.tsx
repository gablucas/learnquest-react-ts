import React from 'react';
import Panel from '../Panel.module.css';
import { GlobalContext } from '../../../GlobalContext';
import Message from '../../../components/Message/Message';
import HandleSubject from './components/handle-subject';
import { MobileInfoData } from '../../../types/Commom';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import { useHelpers } from '../../../hooks/useHelpers';
import FilterIcon from '../../../components/Icons/FilterIcon';
import Filter from '../../../components/Filter/Filter';
import SubjectsHeader from './components/subjects-header';
import SubjectsList from './components/subjects-list';

const Subjects = () => {
  const { data, filter, toggle, setToggle } = React.useContext(GlobalContext)
  const [subjectID, setSubjectID] = React.useState<string>('');
  const { isArrayEmpty, isAnyArrayFilled, arrayIncludes, cleanFilter } = useHelpers();
  
  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoData[]>([{title: '', description: ''}]);

  let subjects = data.subjects;
  if (!isArrayEmpty(filter.subject)) subjects = subjects.filter((subject) => arrayIncludes(filter.subject, subject.id));
  if (!isArrayEmpty(filter.status)) subjects = subjects.filter((subject) => arrayIncludes(filter.status, subject.status));

  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <button onClick={() => setToggle('create')}>Criar matéria +</button>
        <button onClick={() => setToggle('filter')} className={isAnyArrayFilled([filter.status, filter.subject]) ? Panel.filter : ''} >Filtrar <FilterIcon /></button>
        {isAnyArrayFilled([filter.status, filter.subject]) && (<button onClick={() => cleanFilter()} className={Panel.cleanfilter}>Limpar filtro</button>)}
      </div>

      <div className={`${Panel.info} ${Panel.subjects}`}>
        <SubjectsHeader />
        <SubjectsList subjects={subjects} setSubjectID={setSubjectID} setMobileInfo={setMobileInfo} />
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