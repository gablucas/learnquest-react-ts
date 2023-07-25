import React from 'react';
import Styles from './StudentLesson.module.css';
import { GlobalContext } from '../../../GlobalContext';
import { Link, useParams } from 'react-router-dom';
import useData from '../../../hooks/useData';
import { IEvaluateTask } from '../../../types/Lessons';
import { IInstituition, IStudent } from '../../../types/Users';
import useRandom from '../../../hooks/useRandom';

const StudentLesson = () => {
  const { data } = React.useContext(GlobalContext);
  const { id } = useParams();
  const [answer, setAnswer] = React.useState<IEvaluateTask>();
  const { saveStudentLesson, getLoggedUser } = useData();
  const { getRandomID } = useRandom();

  const [toggleDoneLesson, setToggleDoneLesson] = React.useState<boolean>(false);

  const student = getLoggedUser() as IStudent;
  const lesson = (data as IInstituition).lessons.find((f) => f.id === id);

  React.useEffect(() => {
    if (lesson) {
      setAnswer({id: `E${getRandomID()}`, createdby: lesson.createdby, lessonID: lesson.id, student: student.id, subject: lesson.subject, answers: lesson.task.map((question) => ({id: question.id, value: '', isCorrect: undefined, xp: 0}))});
    }
  }, [lesson, student.id, getRandomID])


  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number): void {
    if (answer) {
      const newAnswer = {...answer};
      newAnswer.answers[index].value = e.target.value;
      setAnswer(newAnswer);
    }
  }


  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (answer?.answers.every((answer) => answer.value)) {
      saveStudentLesson(answer);
      setToggleDoneLesson(true);
    }
  }

  if (toggleDoneLesson) {
    return (
      <div className={Styles.message}>
        <h1>Aula finalizada com sucesso</h1>
        <span>A tarefa entrou na fila para ser avaliada</span>
        <Link to='/estudante/aulas'>Voltar</Link>
      </div>
    )

    } else if (student.lessons.some((student) => student.id === id) || data.evaluate.some((evaluate) => evaluate.lessonID === id && evaluate.student === student.id)) {
    return (
      <div className={Styles.message}>
        <h1>Você ja fez essa aula</h1>
        <span>Verifique em "Minhas informações" em "Aulas finalizadas" ou com um responsável pela aula</span>
        <Link to='/estudante/aulas'>Voltar</Link>
      </div>
    )
  
  } else if (!toggleDoneLesson && lesson && answer) {
    return (
      <div className={Styles.student_lesson}>
        <h1>{lesson.title}</h1>
        <p>{lesson.text}</p>
        {lesson.video && (<div className={Styles.video}><iframe src={`https://www.youtube.com/embed/${lesson.video}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe></div>)}

        <form className={Styles.student_lesson_task} onSubmit={handleSubmit}>
          <h2>Tarefa</h2>
          {lesson.task.map((question, index) => (
            <div key={question.id}>
              <label>{question.question}</label>
              <input type='text' value={answer.answers[index].value} onChange={(e) => handleChange(e, index)} />
            </div>
          ))}
          <button>Finalizar Aula</button>
        </form>

      </div>
      )

  } else {
    return (
      <div className={Styles.message}>
        <h1>Essa aula não existe</h1>
        <span>Verifique com um responsável</span>
        <Link to='/estudante/aulas'>Voltar</Link>
      </div>
    )
    }
  }

export default StudentLesson;