import React, { useContext } from 'react';
import Styles from '../../Panel.module.css';
import useData from '../../../../hooks/useData';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../../../../GlobalContext';
import { ILesson, Task } from '../../../../types/Lessons';
import Input from '../../../../components/Inputs/Input';
import useForm from '../../../../hooks/useForm';
import Textarea from '../../../../components/Inputs/Textarea';
import useRandom from '../../../../hooks/useRandom';
import Error from '../../../../components/Helper/Error';
import useValidate from '../../../../hooks/useValidate';

const HandleLesson = () => {
  const { data } = useContext(GlobalContext);
  const { id } = useParams();
  const { getLoggedUser, createLesson, editLesson } = useData();
  const { getRandomID } = useRandom();
  const loggedUser = getLoggedUser();
  const navigate = useNavigate();
  const { isEmpty, error } = useValidate();
  console.log(id)

  const LessonToEdit = data.lessons.find((lesson) => lesson.id === id);

  const title =  useForm({type: 'title', initialValue: ''})
  const video =  useForm({type: 'video', initialValue: ''})
  const description =  useForm({type: 'video', initialValue: ''})

  const [task, setTask] = React.useState<Task[]>([{id: `T${getRandomID()}`, answer: '', question: '', xp: 25}]);
  const [group, setGroup] = React.useState<string[]>([])
  const [subject, setsubject] = React.useState<string>('');
  

  function handleCreateQuestion(e: React.MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();
    const addNewQuestion = [...task];
    addNewQuestion.push({id: `T${getRandomID()}`, question: '', answer: '', xp: 25});
    setTask(addNewQuestion);
  }

  function handleGroups(e: React.ChangeEvent<HTMLInputElement>, groupID: string): void {
    if (e.target.checked) {
      setGroup([...group, groupID]);
    } else {
      setGroup(group.filter((f) => f !== groupID));
    }
  }

  function handleSubject(e: React.ChangeEvent<HTMLSelectElement>): void {
    setsubject(e.target.value)
  }

  function handleTask(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, propertie: string, index?: number): void {
    const updateTask = [...task];

    switch (propertie) {
      case 'question':
        updateTask[index as number].question = e.target.value;
        break;
      case 'answer':
        updateTask[index as number].answer = e.target.value;
        break;
      case 'xp':
        updateTask[index as number].xp = Number(e.target.value);
        break;
    }
    setTask([...updateTask]);
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    
    if (title.validate() && description.validate() && isEmpty('group', group) && isEmpty('subject', subject) && loggedUser && task.every((t, i) => isEmpty(`question${i}`, t.question) && isEmpty(`answer${i}`, t.answer))) {

      const newLesson: ILesson = {
        id: LessonToEdit ? LessonToEdit.id : `L${getRandomID()}`,
        createdBy: LessonToEdit ? LessonToEdit.createdBy : loggedUser.id,
        title: title.value,
        video: video.value,
        text: description.value,
        subject: subject,
        task: [{id: '1' ,question: '', answer: '', xp: 25}],
        groups: group,
      }

      if (id) {
        editLesson(id, newLesson);
      } else {
        createLesson(newLesson);
      }
      navigate('/painel/aulas');
    }
  }

  // if (loggedUser?.access !== 'admin' && loggedUser?.id !== LessonToEdit?.createdBy && LessonToEdit)
  // return <Navigate to='/painel/aulas' />

  return (
    <div className={Styles.createlesson} >
      <form onSubmit={handleSubmit}>

        <div>
          <Input type='text' label='Título da aula' {...title} />
          <Input type='text' label='Link do youtube' {...video} />
          <Textarea label='Descrição' rows={10} {...description} />
        </div>

        <div>
          <h2>Turmas</h2>
          <div className={Styles.createlesson_groups}>
            {data?.groups.map((c) => (
              <div key={c.id}>
                <input type='checkbox' onChange={(e) => handleGroups(e, c.id)}/>
                <label>{c.name}</label>
              </div>
            ))}
          </div>
          {error === 'group' && (<Error>Selecione pelo menos uma turma</Error>)}
        </div>

        <div className={Styles.createlesson_subjects}>
          <h2>Matéria</h2>
          <select onChange={handleSubject}>
            <option value=''>Selecione uma matéria</option>
            {data?.subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
          {error === 'subject' && (<Error>Selecione uma matéria</Error>)}
        </div>

        <div>
          <h2>Tarefa</h2>

          {task.map((question, index) => (
            <div key={question.id} className={Styles.question_container}>

              <div className={Styles.question}>
                <label>Questão {index + 1}</label>
                <textarea rows={5} value={question.question} onChange={(e) => handleTask(e, 'question', index)}/>
                {error === `question${index}` && (<Error>Campo vazio</Error>)}
              </div>

              <div>
                <label>Resposta (Para comparar com a resposta do aluno)</label>
                <textarea rows={5} value={question.answer} onChange={(e) => handleTask(e, 'answer', index)}/>
                {error === `answer${index}` && (<Error>Campo vazio</Error>)}
              </div>

              <div>
                <label>XP</label>
                <select name='xp' value={question.xp} onChange={(e)=> handleTask(e, 'xp', index)}>
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