import React from 'react';
import Panel from '../Panel.module.css';
import { useHelpers } from '../../../hooks/useHelpers';
import { GlobalContext } from '../../../GlobalContext';
import EvaluateList from './components/evaluate-list';
import EvaluateHeader from './components/evaluate-header';
import { getLoggedUser } from '../../../helpers/user/getLoggedUser';
import { ButtonCleanFilter } from '../../../components/button-clean-filter';
import { ButtonFilterEvaluate } from './components/button-filter-evaluate';

const Evaluate = () => {
  const { data, filter } = React.useContext(GlobalContext);
  const { isArrayEmpty, arrayIncludes } = useHelpers();
  const loggedUser = getLoggedUser();
  
  let evaluate = loggedUser?.access === 'admin' ? data.evaluate : data.evaluate.filter((e) => e.createdby === loggedUser?.id);
  if (!isArrayEmpty(filter.student)) evaluate = evaluate.filter((evaluate) => arrayIncludes(filter.student, evaluate.student));
  if (!isArrayEmpty(filter.subject)) evaluate = evaluate.filter((evaluate) => arrayIncludes(filter.subject, evaluate.subject));
  if (!isArrayEmpty(filter.createdby)) evaluate = evaluate.filter((evaluate) => arrayIncludes(filter.createdby, evaluate.createdby));

  return (
    <section className={Panel.container}>

    <div className={Panel.options}>
      <ButtonFilterEvaluate isFiltered={['student', 'subject', 'createdby']} />
      <ButtonCleanFilter isFiltered={['student', 'subject', 'createdby']} />
    </div>

    <div className={`${Panel.info} ${Panel.evaluate}`}>
      <EvaluateHeader />
      <EvaluateList evaluate={evaluate} />
    </div>
  </section>
  )
}

export default Evaluate;