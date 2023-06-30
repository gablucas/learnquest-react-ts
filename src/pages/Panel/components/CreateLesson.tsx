import React from 'react';
import Styles from '../Panel.module.css';
import useData, { ILesson } from '../../../hooks/useData';
import { useNavigate } from 'react-router-dom';

const CreateLesson = () => {
  const { getUser, createLesson } = useData();
  const navigate = useNavigate();

  const [lesson, setLesson] = React.useState<ILesson>({
    id: '1',
    createdBy: getUser()?.login as string,
    title: '',
    video: '',
    text: '',
    questions: [{id: '1' ,question: '', answer: '', xp: 0, needEvaluation: false}],
  })

  function handleCreateQuestion(): void {
    const newQuestion = {...lesson};
    newQuestion.questions.push({id: (lesson.questions.length + 1).toString(), question: '', answer: '', xp: 0, needEvaluation: false});
    setLesson(newQuestion);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, index?: number): void {
    const { name, value } = e.target;
    const { checked } = e.target as HTMLInputElement

    if (name === 'needEvaluation' && index !== undefined) {
      const updateLesson = {...lesson};
      updateLesson.questions[index].needEvaluation = checked;
      setLesson(updateLesson);
    } else if (name === 'title' || name === 'text' || name === 'video') {
      setLesson({...lesson, [name]: value});
    } else {
      setLesson({...lesson, questions: lesson.questions.map((question, indexMap) => {
        if (indexMap === index) {
          return {...question, [name]: value}
        }
  
        return question;
      })});
    }
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    createLesson(lesson);
    navigate('/painel/aulas');
  }

  return (
    <div className={Styles.createlesson}>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="title">Título da aula</label>
          <input type='text' id='title' name='title' value={lesson.title} onChange={(e) => handleChange(e)}></input>
        </div>

        <div>
          <label htmlFor="video">Link do vídeo</label>
          <input type='text' id='video' name='video' value={lesson.video} onChange={(e) => handleChange(e)}></input>
        </div>

        <div>
          <label htmlFor="text">Texto da aula</label>
          <textarea id='text' name='text' value={lesson.text} onChange={(e) => handleChange(e)}></textarea>
        </div>

        <div>
          <h2>Avaliação</h2>
          <button onClick={handleCreateQuestion}>Criar questão</button>

          {lesson?.questions.map((question, index) => (
            <div key={question.id} className={Styles.question}>
              <label htmlFor=''>Questão {lesson.questions.length}</label>
              <input type='text' name='question' value={question.question} onChange={(e) => handleChange(e, index)} />

              <div className={Styles.needevaluation}>
                <input type='checkbox' name="needEvaluation" onChange={(e) => handleChange(e, index)}/>
                <span>A resposta precisa ser avaliada</span>
              </div>
              
              {!lesson.questions[index].needEvaluation &&
                <div>
                <label htmlFor=''>Resposta</label>
                <input type='text' name='answer' value={question.answer} onChange={(e) => handleChange(e, index)} />
              </div>}

              <label htmlFor=''>XP</label>
              <select name='xp' value={question.xp} onChange={(e) => handleChange(e, index)}>
                <option value="25">25 XP</option>
                <option value="50">50 XP</option>
                <option value="75">75 XP</option>
                <option value="100">100 XP</option>
              </select>
            </div>
          ))}

        </div>

      <button>Salvar aula</button>
      </form>
    </div>
  )
}

export default CreateLesson;