import Panel from '../Panel.module.css';
import EvaluateList from './components/evaluate-list';
import EvaluateHeader from './components/evaluate-header';
import { ButtonCleanFilter } from '../../../components/button-clean-filter';
import { ButtonFilter } from '../../../components/button-filter';

const Evaluate = () => {
  return (
    <section className={Panel.container}>

    <div className={Panel.options}>
      <ButtonFilter isFiltered={['student', 'subject', 'createdby']} />
      <ButtonCleanFilter isFiltered={['student', 'subject', 'createdby']} />
    </div>

    <div className={`${Panel.info} ${Panel.evaluate}`}>
      <EvaluateHeader />
      <EvaluateList />
    </div>
  </section>
  )
}

export default Evaluate;