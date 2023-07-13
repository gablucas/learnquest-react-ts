import React from 'react';
import Styles from '../Student.module.css';
import { GlobalContext } from '../../../GlobalContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useData from '../../../hooks/useData';
import { IEvaluateLesson } from '../../../types/Lessons';
import { IInstituition, IStudent } from '../../../types/Users';
import useRandom from '../../../hooks/useRandom';

const StudentLesson = () => {
  const { data } = React.useContext(GlobalContext);
  const { id } = useParams();
  const [answer, setAnswer] = React.useState<IEvaluateLesson>();
  const { saveStudentLesson, getUser } = useData();
  const { getRandomID } = useRandom();
  const navigate = useNavigate();

  // Analisar se utilizar variavel local afeta o desempenho a cada renderizacao
  const student = getUser() as IStudent;
  const lesson = (data as IInstituition).lessons.find((f) => f.id === id);


  React.useEffect(() => {
    if (lesson) {
      setAnswer({evaluateID: getRandomID(), id: lesson.id, student: student.id, subject: lesson.subject, answers: lesson.questions.map((question) => ({id: question.id, value: '', isCorrect: false, xp: 0}))});
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
      navigate('/estudante/aulas');
    }
  }

  if (student.lessons.some((s) => s.id === id)) {
  return (
    <>
      <h1>Você ja fez essa tarefa</h1>
      <Link to='/estudante/aulas'>Voltar para tarefas</Link>
    </>
  )
  
  } else if (lesson && answer) {
  return (
    <div className={Styles.student_lesson}>
      <h1>{lesson.title}</h1>
      <p>{lesson.text}</p>

      <form className={Styles.student_lesson_questions} onSubmit={handleSubmit}>
        <h2>Avaliação</h2>
        {lesson.questions.map((question, index) => (
          <div key={question.id}>
            <label>{question.question}</label>
            <input type='text' value={answer.answers[index].value} onChange={(e) => handleChange(e, index)} />
          </div>
        ))}
        <button>Finalizar Avaliação</button>
      </form>
    </div>
  )

} else {
    return (
      <>
        <h1>Essa tarefa não existe</h1>
        <Link to='/estudante/aulas'>Voltar para tarefas</Link>
      </>
    )
  }
}

export default StudentLesson;