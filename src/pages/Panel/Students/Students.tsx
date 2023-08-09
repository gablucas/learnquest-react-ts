import Panel from '../Panel.module.css';
import StudentsHeader from './components/students-header';
import StudentsList from './components/students-list';
import { ButtonCleanFilter } from '../../../components/button-clean-filter';
import { ButtonFilter } from '../../../components/button-filter';

const Students = () => {


  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <ButtonFilter isFiltered={['group']} />
        <ButtonCleanFilter isFiltered={['group']} />
      </div>

      <div className={`${Panel.info} ${Panel.students}`}>
        <StudentsHeader />
        <StudentsList />
      </div>

    </section>
  )
}

export default Students;