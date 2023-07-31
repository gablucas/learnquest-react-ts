import React from 'react'
import { GlobalContext } from "../../../../../GlobalContext";
import Panel from '../../../Panel.module.css';
import EvaluateIcon from "../../../../../components/Icons/EvaluateIcon";
import MoreInfo from "../../../../../components/Icons/MoreInfo";
import useData from "../../../../../hooks/useData";
import { MobileInfoData, Subject } from "../../../../../types/Commom";
import { IEvaluateTask } from "../../../../../types/Lessons";
import { Link } from 'react-router-dom';

interface IEvaluateList {
  evaluate: IEvaluateTask[],
  setMobileInfo: React.Dispatch<React.SetStateAction<MobileInfoData[]>>,
}

const EvaluateList = ({ evaluate, setMobileInfo }: IEvaluateList) => {
  const { data, setToggle } = React.useContext(GlobalContext);
  const { getUser , getSubject } = useData();

  function handleMobileInfo(lesson: IEvaluateTask): void {
    const student = {title: 'Aluno', description: getUser(lesson.student)?.name || ''};
    const createdby = {title: 'Criado por', description: getUser(lesson.createdby)?.name || ''};
    const subject = {title: 'Matéria', description: getSubject(lesson.subject)?.name || ''};

    setMobileInfo([student, createdby, subject]);
    setToggle('none');
  }

  return (
    <>
      {evaluate.map((lesson, index) => (
        <div key={index}>
          <span>{data.lessons.find((l) => l.id === lesson.lessonID)?.title}</span>
          <span>{getUser(lesson.student)?.name}</span>
          <span>{getUser(lesson.createdby)?.name}</span>
          <span>{(getSubject(lesson.subject) as Subject).name}</span>
          <button className={Panel.mobile} onClick={() => handleMobileInfo(lesson)} ><MoreInfo /></button>
          <Link className={Panel.action} to={`/painel/avaliar/${lesson.id}`}><EvaluateIcon /></Link>
        </div>
      ))}
    </>
  )
}

export default EvaluateList;