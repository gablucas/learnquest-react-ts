import React from 'react'
import { GlobalContext } from "../../../../../GlobalContext";
import Panel from '../../../Panel.module.css';
import EvaluateIcon from "../../../../../components/Icons/EvaluateIcon";
import { Subject } from "../../../../../types/Commom";
import { IEvaluateTask } from "../../../../../types/Lessons";
import { Link } from 'react-router-dom';
import { getLesson } from '../../../../../helpers/lesson/getLesson';
import { getUser } from '../../../../../helpers/user/getUser';
import { getSubject } from '../../../../../helpers/subject/getSubject';
import { ButtonMobileInfo } from '../../../../../components/button-mobile-info';

interface IEvaluateList {
  evaluate: IEvaluateTask[],
}

const EvaluateList = ({ evaluate }: IEvaluateList) => {
  const { data } = React.useContext(GlobalContext);

  return (
    <>
      {evaluate.map((lesson, index) => (
        <div key={index}>
          <span data-testid='lessontitle'>{data.lessons.find((l) => l.id === lesson.lessonID)?.title}</span>
          <span>{getUser(lesson.student)?.name}</span>
          <span>{getUser(lesson.createdby)?.name}</span>
          <span>{(getSubject(lesson.subject) as Subject).name}</span>
          <ButtonMobileInfo info={[['Nome', getLesson(lesson.id)?.title || ''], ['Aluno', getUser(lesson.student)?.name || ''], ['Criado por', getUser(lesson.createdby)?.name || ''], ['Matéria', getSubject(lesson.subject)?.name || '']]} />
          <Link role='link' className={Panel.action} to={`/painel/avaliar/${lesson.id}`}><EvaluateIcon /></Link>
        </div>
      ))}
    </>
  )
}

export default EvaluateList;