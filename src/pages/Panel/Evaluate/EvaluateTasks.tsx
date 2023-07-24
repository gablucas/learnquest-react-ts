import React from 'react';
import Panel from '../Panel.module.css';
import useData from '../../../hooks/useData';
import EvaluateIcon from '../../../components/Icons/EvaluateIcon';
import MoreInfo from '../../../components/Icons/MoreInfo';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import useHelpers from '../../../hooks/useHelpers';
import FilterIcon from '../../../components/Icons/FilterIcon';
import Filter from '../../../components/Filter/Filter';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../../GlobalContext';
import { MobileInfoData, Subject } from '../../../types/Commom';
import { IEvaluateTask } from '../../../types/Lessons';

const EvaluateTasks = () => {
  const { data, filter, toggle, setToggle } = React.useContext(GlobalContext);
  const { isArrayEmpty, isAnyArrayFilled, arrayIncludes, cleanFilter } = useHelpers();
  const { getLoggedUser, getUser, getSubject } = useData();
  const loggedUser = getLoggedUser();
  
  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoData[]>([{title: '', description: ''}]);


  let evaluate = loggedUser?.access === 'admin' ? data.evaluate : data.evaluate.filter((e) => e.createdby === loggedUser?.id);
  if (!isArrayEmpty(filter.student)) evaluate = evaluate.filter((evaluate) => arrayIncludes(filter.student, evaluate.student));
  if (!isArrayEmpty(filter.subject)) evaluate = evaluate.filter((evaluate) => arrayIncludes(filter.subject, evaluate.subject));
  if (!isArrayEmpty(filter.createdby)) evaluate = evaluate.filter((evaluate) => arrayIncludes(filter.createdby, evaluate.createdby));

  function handleMobileInfo(lesson: IEvaluateTask): void {
    const student = {title: 'Aluno', description: getUser(lesson.student)?.name || ''};
    const createdby = {title: 'Criado por', description: getUser(lesson.createdby)?.name || ''};
    const subject = {title: 'Matéria', description: getSubject(lesson.subject)?.name || ''};

    setMobileInfo([student, createdby, subject]);
    setToggle('none');
  }

  return (
    <section className={Panel.container}>

    <div className={Panel.options}>
      <button onClick={() => setToggle('filter')} className={isAnyArrayFilled([filter.student, filter.subject, filter.createdby]) ? Panel.filter : ''} >Filtrar <FilterIcon /></button>
      {isAnyArrayFilled([filter.student, filter.subject, filter.createdby]) && (<button onClick={() => cleanFilter()} className={Panel.cleanfilter}>Limpar filtro</button>)}
    </div>

    <div className={`${Panel.info} ${Panel.evaluate}`}>
      <div>
        <span>Título</span>
        <span>Aluno</span>
        <span>Criada por</span>
        <span>Matéria</span>
        <span className={Panel.mobile}>Informações</span>
        <span>Avaliar</span>
      </div>

     {evaluate.map((lesson, index) => (
      <div key={index}>
        <span>{data.lessons.find((l) => l.id === lesson.lessonID)?.title}</span>
        <span>{getUser(lesson.student)?.name}</span>
        <span>{getUser(lesson.createdby)?.name}</span>
        <span>{(getSubject(lesson.subject) as Subject).name}</span>
        <button className={Panel.mobile} onClick={() => handleMobileInfo(lesson)} ><MoreInfo /></button>
        <Link className={Panel.action} to={`/painel/avaliar/${lesson.id}`}><EvaluateIcon /></Link>
      </div>
     ))}
    </div>

    {toggle === 'filter' && <Filter options={{access: false, student: true, subject: true, group: false, createdby: true, status: false}} />}
    {toggle === 'mobile' && mobileInfo && (<MobileInfo info={mobileInfo} />)}
  </section>
  )
}

export default EvaluateTasks;