import React from 'react';
import Panel from '../Panel.module.css';
import useData from '../../../hooks/useData';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import useHelpers from '../../../hooks/useHelpers';
import FilterIcon from '../../../components/Icons/FilterIcon';
import Filter from '../../../components/Filter/Filter';
import { GlobalContext } from '../../../GlobalContext';
import { MobileInfoData } from '../../../types/Commom';
import EvaluateList from './components/evaluate-list';
import EvaluateHeader from './components/evaluate-header';

const Evaluaten = () => {
  const { data, filter, toggle, setToggle } = React.useContext(GlobalContext);
  const { isArrayEmpty, isAnyArrayFilled, arrayIncludes, cleanFilter } = useHelpers();
  const { getLoggedUser } = useData();
  const loggedUser = getLoggedUser();
  
  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoData[]>([{title: '', description: ''}]);

  let evaluate = loggedUser?.access === 'admin' ? data.evaluate : data.evaluate.filter((e) => e.createdby === loggedUser?.id);
  if (!isArrayEmpty(filter.student)) evaluate = evaluate.filter((evaluate) => arrayIncludes(filter.student, evaluate.student));
  if (!isArrayEmpty(filter.subject)) evaluate = evaluate.filter((evaluate) => arrayIncludes(filter.subject, evaluate.subject));
  if (!isArrayEmpty(filter.createdby)) evaluate = evaluate.filter((evaluate) => arrayIncludes(filter.createdby, evaluate.createdby));

  const checkFilter = [filter.student, filter.subject, filter.createdby];

  return (
    <section className={Panel.container}>

    <div className={Panel.options}>
      <button onClick={() => setToggle('filter')} className={isAnyArrayFilled(checkFilter) ? Panel.filter : ''} >Filtrar<FilterIcon /></button>
      {isAnyArrayFilled(checkFilter) && (<button onClick={() => cleanFilter()} className={Panel.cleanfilter}>Limpar filtro</button>)}
    </div>

    <div className={`${Panel.info} ${Panel.evaluate}`}>
      <EvaluateHeader />
      <EvaluateList evaluate={evaluate} setMobileInfo={setMobileInfo} />
    </div>

    {toggle === 'filter' && <Filter options={{access: false, student: true, subject: true, group: false, createdby: true, status: false}} />}
    {toggle === 'mobile' && mobileInfo && (<MobileInfo info={mobileInfo} />)}
  </section>
  )
}

export default Evaluaten;