import React from 'react'
import { GlobalContext } from "../../../../../GlobalContext";
import Panel from '../../../Panel.module.css';
import EvaluateIcon from "../../../../../components/Icons/EvaluateIcon";
import MoreInfo from "../../../../../components/Icons/MoreInfo";
import { MobileInfoData, Subject } from "../../../../../types/Commom";
import { IEvaluateTask } from "../../../../../types/Lessons";
import { Link } from 'react-router-dom';
import { getLesson } from '../../../../../helpers/lesson/getLesson';
import { getUser } from '../../../../../helpers/user/getUser';
import { getSubject } from '../../../../../helpers/subject/getSubject';

interface IEvaluateList {
  evaluate: IEvaluateTask[],
  setMobileInfo: React.Dispatch<React.SetStateAction<MobileInfoData[]>>,
}

const EvaluateList = ({ evaluate, setMobileInfo }: IEvaluateList) => {
  const { data, setToggle } = React.useContext(GlobalContext);


  function handleMobileInfo(lesson: IEvaluateTask): void {
    const title = {title: 'Nome', description: getLesson(lesson.id)?.title || ''};
    const student = {title: 'Aluno', description: getUser(lesson.student)?.name || ''};
    const createdby = {title: 'Criado por', description: getUser(lesson.createdby)?.name || ''};
    const subject = {title: 'Matéria', description: getSubject(lesson.subject)?.name || ''};

    setMobileInfo([title, student, createdby, subject]);
    setToggle('mobile');
  }

  return (
    <>
      {evaluate.map((lesson, index) => (
        <div key={index}>
          <span data-testid='lessontitle'>{data.lessons.find((l) => l.id === lesson.lessonID)?.title}</span>
          <span>{getUser(lesson.student)?.name}</span>
          <span>{getUser(lesson.createdby)?.name}</span>
          <span>{(getSubject(lesson.subject) as Subject).name}</span>
          <button role='button' className={Panel.mobile} onClick={() => handleMobileInfo(lesson)} ><MoreInfo /></button>
          <Link role='link' className={Panel.action} to={`/painel/avaliar/${lesson.id}`}><EvaluateIcon /></Link>
        </div>
      ))}
    </>
  )
}

export default EvaluateList;