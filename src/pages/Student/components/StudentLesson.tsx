import React from 'react';
import Styles from '../Student.module.css';
import { GlobalContext } from '../../../GlobalContext';
import { Link, useParams } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import Input from '../../../components/Inputs/Input';


const StudentLesson = () => {
  const { data } = React.useContext(GlobalContext);
  const { id } = useParams();
  const { teste } = useForm();
  // Analisar se utilizar variavel local afeta o desempenho a cada renderizacao
  const lesson = data?.lessons.find((f) => f.id === id);

  // Array com os objetos que são desestruturados em cada input para fazer a validação e passar o valor
   const testeInput = lesson?.questions.map(() => teste())

  
  
  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    
    if (testeInput?.every((i) => i.validate())) {
      console.log('Validado')
    }
  }

  
  if (lesson && testeInput)
  return (
    <div className={Styles.student_lesson}>
      <h1>{lesson.title}</h1>
      <p>{lesson.text}</p>

      <form className={Styles.student_lesson_questions} onSubmit={handleSubmit}>
        <h2>Avaliação</h2>
        {lesson.questions.map((question, index) => (
          <div key={question.id}>
            <Input type='text' label={question.question} {...testeInput[index]}/>
          </div>
        ))}
        <button>Finalizar Avaliação</button>
      </form>
    </div>
  )

  return (
    <>
      <h1>Essa tarefa não existe</h1>
      <Link to='/estudante'>Voltar para tarefas</Link>
    </>
  )
}

export default StudentLesson;