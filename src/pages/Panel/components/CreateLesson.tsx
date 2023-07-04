import React, { useContext } from 'react';
import Styles from '../Panel.module.css';
import useData, { IInstituition, ILesson } from '../../../hooks/useData';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../GlobalContext';

const CreateLesson = () => {
  const { data } = useContext(GlobalContext);
  const { getUser, createLesson} = useData();
  const navigate = useNavigate();

  const [lesson, setLesson] = React.useState<ILesson>({
    id: ((data as IInstituition).lessons.length + 1).toString(),
    createdBy: getUser()?.login as string,
    title: '',
    video: '',
    text: '',
    questions: [{id: '1' ,question: '', answer: '', xp: 0, needEvaluation: false}],
  })

  function handleCreateQuestion(e: React.MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();
    const addNewQuestion = {...lesson};
    addNewQuestion.questions.push({id: (lesson.questions.length + 1).toString(), question: '', answer: '', xp: 0, needEvaluation: false});
    setLesson(addNewQuestion);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, propertie: string, index?: number): void {
    const updateLesson = {...lesson};

    switch (propertie) {
      case 'title':
        updateLesson.title = e.target.value;
        break;
      case 'video':
        updateLesson.video = e.target.value;
        break;
      case 'text':
        updateLesson.text = e.target.value;
        break;
      case 'question':
        updateLesson.questions[index as number].question = e.target.value;
        break;
      case 'answer':
        updateLesson.questions[index as number].answer = e.target.value;
        break;
      case 'evaluate':
        updateLesson.questions[index as number].needEvaluation = (e as React.ChangeEvent<HTMLInputElement>).target.checked;
        break;
      case 'xp':
        updateLesson.questions[index as number].xp = Number(e.target.value);
        break;
    }
    setLesson({...updateLesson});
  }

  function handleSubmit(e: React.FormEvent): void {

    e.preventDefault();
    
    console.log(lesson.questions[0].question !== '')
    if (lesson.title && lesson.text && lesson.questions.every((question) => question.question && question.answer)) {

      createLesson(lesson);
      navigate('/painel/aulas');
    }
  }

  return (
    <div className={Styles.createlesson} >
      <form onSubmit={handleSubmit}>

        <div>
          <label>Título da aula</label>
          <input type='text' value={lesson.title} onChange={(e) => handleChange(e, 'title')}/>
        </div>

        <div>
          <label>Link do vídeo</label>
          <input type='text' value={lesson.video} onChange={(e) => handleChange(e, 'video')}/>
        </div>

        <div>
          <label>Descrição da aula</label>
          <input type='text' value={lesson.text} onChange={(e) => handleChange(e, 'text')}/>
        </div>

        <div>
          <h2>Avaliação</h2>

          {lesson?.questions.map((question, index) => (
            <div key={question.id} className={Styles.question}>

              <div>
                <label>Questão</label>
                <input type='text' value={question.question} onChange={(e) => handleChange(e, 'question', index)}/>
              </div>

              <div>
                <label>Essa questão precisa ser avaliada</label>
                <input type="checkbox" onChange={(e) => handleChange(e, 'evaluate', index)}/>
              </div>

              {!question.needEvaluation &&
                <div>
                  <label>Resposta</label>
                  <input type='text' value={question.answer} onChange={(e) => handleChange(e, 'answer', index)}/>
                </div>
              }

              <label>XP</label>
              <select name='xp' value={question.xp} onChange={(e)=> handleChange(e, 'xp', index)}>
                <option value="25">25 XP</option>
                <option value="50">50 XP</option>
                <option value="75">75 XP</option>
                <option value="100">100 XP</option>
              </select>
              
            </div>
          ))}
          <button onClick={handleCreateQuestion}>Criar questão</button>

        </div>

      <button>Salvar aula</button>
      </form>
    </div>
  )
}

export default CreateLesson;