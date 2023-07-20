import React from 'react';
import Styles from './StudentLessons.module.css';
import { GlobalContext } from '../../../GlobalContext';
import useData from '../../../hooks/useData';
import { Link } from 'react-router-dom';
import { IStudent } from '../../../types/Users';
import MoreInfo from '../../../components/Icons/MoreInfo';
import StartLesson from '../../../components/Icons/StartLesson';
import { MobileInfoProps, Subject } from '../../../types/Commom';
import Modal from '../../../components/Modal';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import { ILesson } from '../../../types/Lessons';

const StudentLessons = () => {
  const { data } = React.useContext(GlobalContext);
  const { getLoggedUser, getSubject } = useData();
  const student = getLoggedUser() as IStudent;

  const [toggleMobile, setToggleMobile] = React.useState(false);
  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoProps[]>([{title: '', description: ''}]);

  const studentGroup = data?.groups.find((f) => f.students.some((id) => id === student?.id));
  const lessons = data?.lessons.filter((lesson) => lesson.groups.some((id) => id === studentGroup?.id && !student.lessons.some((l) => l.id === lesson.id) && !data.evaluate.some((e) => e.lessonID === lesson.id)));


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
          {lessons?.map((lesson) => (
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
        <Modal setToggle={setToggleMobile}>
          <MobileInfo info={mobileInfo} />
        </Modal>
      )}
    </div>
  )
}

export default StudentLessons;