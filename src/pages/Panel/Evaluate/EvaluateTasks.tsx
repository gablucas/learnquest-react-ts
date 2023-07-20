import React from 'react';
import { Link } from 'react-router-dom';
import Panel from '../Panel.module.css';
import { GlobalContext } from '../../../GlobalContext';
import useData from '../../../hooks/useData';
import EvaluateIcon from '../../../components/Icons/EvaluateIcon';
import MoreInfo from '../../../components/Icons/MoreInfo';
import { MobileInfoProps, Subject } from '../../../types/Commom';
import Modal from '../../../components/Modal';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import { IEvaluateTask } from '../../../types/Lessons';

const EvaluateTasks = () => {
  const { data } = React.useContext(GlobalContext);
  const { getLoggedUser, getUser, getSubject } = useData();
  const loggedUser = getLoggedUser();
  const evaluate = loggedUser?.access === 'admin' ? data.evaluate : data.evaluate.filter((e) => e.createdBy === loggedUser?.id);

  const [toggleMobile, setToggleMobile] = React.useState(false);
  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoProps[]>([{title: '', description: ''}]);


  function handleMobileInfo(lesson: IEvaluateTask): void {
    const student = {title: 'Aluno', description: getUser(lesson.student)?.name || ''};
    const createdBy = {title: 'Criado por', description: getUser(lesson.createdBy)?.name || ''};
    const subject = {title: 'Matéria', description: getSubject(lesson.subject)?.name || ''};

    setMobileInfo([student, createdBy, subject]);
    setToggleMobile(true);
  }


  return (
    <section className={Panel.container}>

    <div className={Panel.options}>
      <Link to='criar'>Criar aula +</Link>
    </div>

    <div className={`${Panel.info} ${Panel.evaluate}`}>
      <div>
        <span>Título</span>
        <span>Aluno</span>
        <span>Criada por</span>
        <span>Matéria</span>
        <span>Informações</span>
        <span>Avaliar</span>
      </div>

     {evaluate.map((lesson, index) => (
      <div key={index}>
        <span>{data.lessons.find((l) => l.id === lesson.lessonID)?.title}</span>
        <span>{getUser(lesson.student)?.name}</span>
        <span>{getUser(lesson.createdBy)?.name}</span>
        <span>{(getSubject(lesson.subject) as Subject).name}</span>
        <button className={Panel.mobile} onClick={() => handleMobileInfo(lesson)} ><MoreInfo /></button>
        <Link className={Panel.action} to={`/painel/avaliar/${lesson.id}`}><EvaluateIcon /></Link>
      </div>
     ))}
    </div>

    {toggleMobile && mobileInfo && (
        <Modal setToggle={setToggleMobile}>
          <MobileInfo info={mobileInfo} />
        </Modal>
      )}
  
  </section>
  )
}

export default EvaluateTasks;