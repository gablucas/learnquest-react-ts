import Panel from '../Panel.module.css';
import LessonsHeader from './components/lessons-header';
import LessonsList from './components/lessons-list';
import { Link } from "react-router-dom";
import { ButtonCleanFilter } from '../../../components/button-clean-filter';
import { ButtonFilterLesson } from './components/button-filter-lesson';

const Lessons = () => {

  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <Link to='criar'>Criar aula +</Link>
        <ButtonFilterLesson isFiltered={['subject', 'createdby', 'status']} />
        <ButtonCleanFilter isFiltered={['subject', 'createdby', 'status']} />
      </div>

      <div className={`${Panel.info} ${Panel.lessons}`}>
        <LessonsHeader />
        <LessonsList />
      </div>
    </section>
  )
}

export default Lessons;