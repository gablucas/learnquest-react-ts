import React from 'react';
import Styles from './StudentLessons.module.css';
import useData from '../../../hooks/useData';
import { Link } from 'react-router-dom';
import MoreInfo from '../../../components/Icons/MoreInfo';
import StartLesson from '../../../components/Icons/StartLesson';
import { MobileInfoData, Subject } from '../../../types/Commom';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import { ILesson } from '../../../types/Lessons';

const StudentLessons = () => {
  const { getSubject, getStudentLessons } = useData();

  const [toggleMobile, setToggleMobile] = React.useState(false);
  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoData[]>([{title: '', description: ''}]);

  function getTotalXP(lesson: ILesson): number {
    const totalXP = lesson.task.map((m) => m.xp).reduce((acc, cur) => acc + cur);
    return totalXP;
  }

  function handleMobileInfo(lesson: ILesson): void {
    const subject = {title: 'Matéria', description: (getSubject(lesson.subject) as Subject).name};
    const questions = {title: 'Questões', description: lesson.task.length}
    const totalXP = {title: 'XP Total', description: getTotalXP(lesson)};

    setMobileInfo([subject, questions, totalXP]);
    setToggleMobile(true);
  }


  return (
    <div className={Styles.container}>

      <h1>Suas aulas</h1>

      <div className={Styles.list}>
        <div>
          <span>Aula</span>
          <span>Matéria</span>
          <span>Questões</span>
          <span>XP Total</span>
          <span className={Styles.mobile}>Informações</span>
          <span>Iniciar a aula</span>
        </div>

        <ul>
          {getStudentLessons().map((lesson) => (
            <li key={lesson.id} className={Styles.lessons}>
              <div key={lesson.id}>
                <span>{lesson.title}</span>
                <span>{getSubject(lesson.subject)?.name}</span>
                <span>{lesson.task.length}</span>
                <span>{getTotalXP(lesson)}</span>
                <button className={Styles.mobile} onClick={() => handleMobileInfo(lesson)}><MoreInfo /></button>
                <Link to={`/estudante/aula/${lesson.id}`}  key={lesson.id}><StartLesson /></Link>
              </div>  
            </li>
          ))}
        </ul>
      </div>

      {toggleMobile && mobileInfo && (
        <MobileInfo info={mobileInfo} />
      )}
    </div>
  )
}

export default StudentLessons;