import React from 'react';
import Styles from '../StudentLesson.module.css'
import { IEvaluateTask } from '../../../../types/Lessons';
import useData from '../../../../hooks/useData';
import useValidate from '../../../../hooks/useValidate';
import QuestionToSolve from './question-to-solve';
import useRandom from '../../../../hooks/useRandom';
import { GlobalContext } from '../../../../GlobalContext';
import { IStudent } from '../../../../types/Users';
import { useParams } from 'react-router-dom';

interface IStudentLessonProps {
  student: IStudent,
  toggleDoneLesson: () => void,
} 

const StudentLesson = ({ student, toggleDoneLesson }: IStudentLessonProps) => {
  const { data } = React.useContext(GlobalContext);
  const { id } = useParams();
  const { saveStudentLesson } = useData();
  const { isEmpty } = useValidate();
  const { getRandomID } = useRandom();
  const lesson = data.lessons.find((f) => f.id === id);

  const [answer, setAnswer] = React.useState<IEvaluateTask | undefined>(lesson &&
    {
      id: `E${getRandomID()}`, 
      createdby: lesson.createdby, 
      lessonID: lesson.id,
      student: student.id, 
      subject: lesson.subject, 
      answers: lesson.task.map((question) => ({id: question.id, value: '', isCorrect: undefined, xp: 0})),
    }
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (answer?.answers.every((answer, index) => isEmpty(`answer${index}`, answer.value))) {
      saveStudentLesson(answer);
      toggleDoneLesson();
      window.scroll(0 ,0);
    }
  }

  if (lesson)
    return (
      <div className={Styles.student_lesson}>
        <h1>{lesson.title}</h1>
        <p>{lesson.text}</p>
        {lesson.video && (<div className={Styles.video}><iframe src={`https://www.youtube.com/embed/${lesson.video}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe></div>)}

        <form className={Styles.student_lesson_task} onSubmit={handleSubmit}>
          <h2>Tarefa</h2>

          {lesson.task.map((question, index) => (
            <QuestionToSolve index={index} question={question} lesson={lesson} answer={answer} setAnswer={setAnswer} />
          ))}
          <button>Finalizar Aula</button>
        </form>
      </div>
    )
}

export default StudentLesson;