import React from 'react';
import Panel from '../Panel.module.css';
import Styles from './StudentData.module.css';
import { Navigate, useParams } from "react-router-dom";
import useData from "../../../hooks/useData";
import { IStudent } from "../../../types/Users";
import { GlobalContext } from "../../../GlobalContext";
import Contract from '../../../components/Icons/Expand';
import Expand from '../../../components/Icons/Contract';
import MoreInfo from '../../../components/Icons/MoreInfo';
import { MobileInfoData } from '../../../types/Commom';
import { ILesson, TaskStudent } from '../../../types/Lessons';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';

const StudentData = () => {
  const { id } = useParams();
  const { data, toggle, setToggle } = React.useContext(GlobalContext);
  const { getUser, getLesson, getSubject, getStudentLessons, counterCorrectWrongQuestions } = useData();
  const [toggleLessons, setToggleLessons] = React.useState({done: false, todo: false});
  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoData[]>([{title: '', description: ''}]);

  const student = id && getUser(id)?.access === 'student' ? getUser(id) as IStudent : '';
  const lessonsToDo = student ? getStudentLessons(student.id) : '';

  function handleMobileInfo(lessonType: 'done' | 'todo', lesson: TaskStudent | ILesson): void {

    if (lessonType === 'done') {
      const createdby = {title: 'Criado por', description: getUser(getLesson(lesson.id)?.createdby as string)?.name || ''};
      const subject = {title: 'Matéria', description: getSubject(getLesson(lesson.id)?.subject as string)?.name || ''};
      const questions = {title: 'Questões', description: ((lesson as TaskStudent).answers.length)};
      const correct = {title: 'Corretas', description: counterCorrectWrongQuestions('correct', lesson as TaskStudent)};
      const wrong = {title: 'Erradas', description: counterCorrectWrongQuestions('wrong', lesson as TaskStudent)};
      setMobileInfo([createdby, subject, questions, correct, wrong]);

    } else if (lessonType === 'todo') {
      const createdby = {title: 'Criado por', description: getUser(getLesson(lesson.id)?.createdby as string)?.name || ''};
      const subject = {title: 'Matéria', description: getSubject(getLesson(lesson.id)?.subject as string)?.name || ''};
      const questions = {title: 'Questões', description: ((lesson as ILesson).task.length)};
      setMobileInfo([createdby, subject, questions]);
    }

    
    setToggle('mobile');
  }

  if (!student) return <Navigate to='/painel/alunos' />
  return (
    <section className={Styles.studentdata}>

      <div className={Styles.wrapper}>
        <h2>Informações</h2>
        <span>Nome: {student.name}</span>
        <span>Turma: {data.groups.find((group) => group.students.some((studentID) => student.id === studentID))?.name}</span>
        <span>Email: {student.email}</span>
        <span>Login: {student.login}</span>
      </div>

      <div className={Styles.wrapper}>
        <h2>Progressão</h2>
        <span>Level: {student.level}</span>
        <span>XP Atual: {student.xp}</span>
        <span>XP Próx nível: {student.level * 125}</span>
        <span>XP Total {student.xp + (student.level - 1) * 125}</span>
        <span>Rank 1</span>
      </div>
      
      <div className={Styles.wrapper}>
        <h2>Estatísticas</h2>
        <span>Aulas realizadas: {student.lessons.length}</span>
        <span>Aulas a fazer: {lessonsToDo.length}</span>
      </div>

      <div className={Styles.lessons_container}>

        <div className={Styles.lessons_title} onClick={() => setToggleLessons({...toggleLessons, done: !toggleLessons.done})}>
          <h2>Tarefas realizadas</h2>
          {toggleLessons.done ? <Contract /> : <Expand />}
        </div>

        {toggleLessons.done && 
          (<>
            <div className={Styles.lessons_done}>
              <span>Aula</span>
              <span className={Panel.mobile}>Informações</span>
              <span>Criado por</span>
              <span>Matéria</span>
              <span>Questões</span>
              <span>Corretas</span>
              <span>Erradas</span>
            </div>

            <div>
              {student.lessons.map((lesson) => (
                <div className={Styles.lessons_done} key={lesson.id}>
                  <span>{getLesson(lesson.id)?.title}</span>
                  <button className={Panel.mobile} onClick={() => handleMobileInfo('done', lesson)} ><MoreInfo /></button>
                  <span>{getUser(getLesson(lesson.id)?.createdby as string)?.name}</span>
                  <span>{getSubject(getLesson(lesson.id)?.subject as string)?.name}</span>
                  <span>{lesson.answers.length}</span>
                  <span>{counterCorrectWrongQuestions('correct', lesson)}</span>
                  <span>{counterCorrectWrongQuestions('wrong', lesson)}</span>
                </div>
              ))}
            </div>
          </>)}
      </div>

      <div className={Styles.lessons_container}>

        <div className={Styles.lessons_title} onClick={() => setToggleLessons({...toggleLessons, todo: !toggleLessons.todo})}>
          <h2>Tarefas a fazer</h2>
          {toggleLessons.todo ? <Contract /> : <Expand />}
        </div>

        {toggleLessons.todo && 
          (<>
            <div className={Styles.lessons_todo}>
              <span>Aula</span>
              <span className={Panel.mobile}>Informações</span>
              <span>Criado por</span>
              <span>Matéria</span>
              <span>Questões</span>
            </div>

            <div>
              {lessonsToDo && lessonsToDo.map((lesson) => (
                <div className={Styles.lessons_todo} key={lesson.id}>
                  <span>{lesson.title}</span>
                  <button className={Panel.mobile} onClick={() => handleMobileInfo('todo', lesson)} ><MoreInfo /></button>
                  <span>{getUser(lesson.createdby)?.name}</span>
                  <span>{getSubject(lesson.subject)?.name}</span>
                  <span>{lesson.task.length}</span>
                </div>
              ))}
            </div>
          </>)}
      </div>

      {toggle === 'mobile' && mobileInfo && (<MobileInfo info={mobileInfo} />)}
    </section>
  )
}

export default StudentData;