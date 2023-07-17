import React, { useContext } from 'react';
import Styles from '../../Panel.module.css';
import useData from '../../../../hooks/useData';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../../../../GlobalContext';
import { ILesson } from '../../../../types/Lessons';
import { IInstituition } from '../../../../types/Users';

const HandleLesson = () => {
  const { data } = useContext(GlobalContext);
  const { getLoggedUser, createLesson, editLesson } = useData();
  const navigate = useNavigate();
  const { id } = useParams();

  const LessonToEdit = data.lessons.find((lesson) => lesson.id === id);

  const [lesson, setLesson] = React.useState<ILesson>({
    id: ((data as IInstituition).lessons.length + 1).toString(),
    createdBy: getLoggedUser()?.id as string,
    title: '',
    video: '',
    text: '',
    subject: '',
    questions: [{id: '1' ,question: '', answer: '', xp: 25}],
    groups: []
  })

  React.useEffect(() => {
    if (id && LessonToEdit) {
      setLesson({
        id: LessonToEdit.id,
        createdBy: LessonToEdit?.createdBy,
        title: LessonToEdit.title,
        video: LessonToEdit.video,
        text: LessonToEdit.text,
        subject: LessonToEdit.subject,
        questions: LessonToEdit.questions,
        groups: LessonToEdit.groups,
      })
    }
  }, [id, LessonToEdit])

  function handleCreateQuestion(e: React.MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();
    const addNewQuestion = {...lesson};
    addNewQuestion.questions.push({id: (lesson.questions.length + 1).toString(), question: '', answer: '', xp: 25});
    setLesson(addNewQuestion);
  }

  function handlegroups(e: React.ChangeEvent<HTMLInputElement>, classId: string): void {
    if (e.target.checked) {
      setLesson({...lesson, groups: [...lesson.groups, classId]})
    } else {
      const updateLesson = {...lesson};
      updateLesson.groups = updateLesson.groups.filter((f) => f !== classId);
      setLesson(updateLesson)
    }
  }

  function handleSubject(e: React.ChangeEvent<HTMLSelectElement>): void {
    setLesson({...lesson, subject: e.target.value})
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
      case 'xp':
        updateLesson.questions[index as number].xp = Number(e.target.value);
        break;
    }
    setLesson({...updateLesson});
  }

  function handleSubmit(e: React.FormEvent): void {

    e.preventDefault();
    
    console.log(lesson.questions[0].question !== '')
    if (lesson.title && lesson.text && lesson.groups.length > 0 && lesson.subject && lesson.questions.every((question) => question.question && question.answer)) {

      if (id) {
        editLesson(id, lesson);
      } else {
        createLesson(lesson);
      }
      navigate('/painel/aulas');
    }
  }

  return (
    <div className={Styles.createlesson} >
      <form onSubmit={handleSubmit}>

        <div>
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
        </div>

        <div>
          <h2>Turmas</h2>
          <div className={Styles.createlesson_groups}>
            {data?.groups.map((c) => (
              <div key={c.id}>
                <input type='checkbox' onChange={(e) => handlegroups(e, c.id)}/>
                <label>{c.name}</label>
              </div>
            ))}
          </div>
        </div>

        <div className={Styles.createlesson_subjects}>
          <h2>Matéria</h2>
          <select onChange={handleSubject}>
            <option value=''>Selecione uma matéria</option>
            {data?.subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
        </div>

        <div>
          <h2>Avaliação</h2>

          {lesson?.questions.map((question, index) => (
            <div key={question.id} className={Styles.question_container}>

              <div className={Styles.question}>
                <label>Questão {index + 1}</label>
                <input type='text' value={question.question} onChange={(e) => handleChange(e, 'question', index)}/>
              </div>

              <div>
                <label>Resposta  {index + 1}</label>
                <input type='text' value={question.answer} onChange={(e) => handleChange(e, 'answer', index)}/>
              </div>
              

              <div>
                <label>XP</label>
                <select name='xp' value={question.xp} onChange={(e)=> handleChange(e, 'xp', index)}>
                  <option value="25">25 XP</option>
                  <option value="50">50 XP</option>
                  <option value="75">75 XP</option>
                  <option value="100">100 XP</option>
                </select>
              </div>
              
            </div>
          ))}
          <button className={Styles.newquestion} onClick={handleCreateQuestion}>Criar nova questão</button>
        </div>

      <button>Salvar aula</button>
      </form>
    </div>
  )
}

export default HandleLesson;