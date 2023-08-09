import Panel from '../Panel.module.css';
import SubjectsHeader from './components/subjects-header';
import SubjectsList from './components/subjects-list';
import { ButtonCreateSubject } from './components/button-create-subject';
import { ButtonCleanFilter } from '../../../components/button-clean-filter';
import { ButtonFilter } from '../../../components/button-filter';

const Subjects = () => {

  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <ButtonCreateSubject />
        <ButtonFilter isFiltered={['subject', 'status']} />
        <ButtonCleanFilter isFiltered={['subject', 'status']} />
      </div>

      <div className={`${Panel.info} ${Panel.subjects}`}>
        <SubjectsHeader />
        <SubjectsList />
      </div>

    </section>
  )
}

export default Subjects;