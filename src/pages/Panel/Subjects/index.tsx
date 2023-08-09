import React from 'react';
import Panel from '../Panel.module.css';
import { GlobalContext } from '../../../GlobalContext';
import { useHelpers } from '../../../hooks/useHelpers';
import SubjectsHeader from './components/subjects-header';
import SubjectsList from './components/subjects-list';
import { ButtonCreateSubject } from './components/button-create-subject';
import { ButtonCleanFilter } from '../../../components/button-clean-filter';
import { ButtonFilterSubject } from './components/button-filter-subject';

const Subjects = () => {
  const { data, filter } = React.useContext(GlobalContext)
  const { isArrayEmpty, arrayIncludes } = useHelpers();
  

  let subjects = data.subjects;
  if (!isArrayEmpty(filter.subject)) subjects = subjects.filter((subject) => arrayIncludes(filter.subject, subject.id));
  if (!isArrayEmpty(filter.status)) subjects = subjects.filter((subject) => arrayIncludes(filter.status, subject.status));

  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <ButtonCreateSubject />
        <ButtonFilterSubject />
        <ButtonCleanFilter isFiltered={['subject', 'status']} />
      </div>

      <div className={`${Panel.info} ${Panel.subjects}`}>
        <SubjectsHeader />
        <SubjectsList subjects={subjects} />
      </div>

    </section>
  )
}

export default Subjects;