import React, { useContext } from 'react';
import Styles from '../Lessons.module.css';
import useData from '../../../../hooks/useData';
import Input from '../../../../components/Inputs/Input';
import useForm from '../../../../hooks/useForm';
import Textarea from '../../../../components/Inputs/Textarea';
import useRandom from '../../../../hooks/useRandom';
import Error from '../../../../components/Helper/Error';
import useValidate from '../../../../hooks/useValidate';
import Select from '../../../../components/Inputs/Select';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../../../../GlobalContext';
import { ILesson, Task } from '../../../../types/Lessons';
import { Status } from '../../../../types/Commom';

const HandleLesson = () => {
  const { data } = useContext(GlobalContext);
  const { id } = useParams();
  const { getLoggedUser, createLesson, editLesson, showUserGroups, showUserSubjects } = useData();
  const { getRandomID } = useRandom();
  const loggedUser = getLoggedUser();
  const navigate = useNavigate();
  const { isEmpty, error } = useValidate();

  const lessonToEdit = data.lessons.find((lesson) => lesson.id === id);

  const title =  useForm({type: 'title', initialValue: lessonToEdit ? lessonToEdit.title : ''})
  const video =  useForm({type: 'video', initialValue: lessonToEdit ? `https://www.youtube.com/watch?v=${lessonToEdit?.video}` : ''})
  const description =  useForm({type: 'video', initialValue: lessonToEdit ? lessonToEdit.text : ''})
  const status =  useForm({type: 'status', initialValue: lessonToEdit ? lessonToEdit.status : ''})

  const [task, setTask] = React.useState<Task[]>([{id: `T${getRandomID()}`, answer: '', question: '', xp: 25}]);
  const [groups, setGroups] = React.useState<string[]>([])
  const [subject, setSubject] = React.useState<string>('');


  React.useEffect(() => {
    if (lessonToEdit) {
      setTask(lessonToEdit.task);
      setGroups(lessonToEdit.groups);
      setSubject(lessonToEdit.subject);
    }
  }, [lessonToEdit])


  function handleCreateQuestion(e: React.MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();
    const addNewQuestion = [...task];
    addNewQuestion.push({id: `T${getRandomID()}`, question: '', answer: '', xp: 25});
    setTask(addNewQuestion);
  }

  function handleGroups(e: React.ChangeEvent<HTMLInputElement>, groupID: string): void {
    if (e.target.checked) {
      setGroups([...groups, groupID]);
    } else {
      setGroups(groups.filter((f) => f !== groupID));
    }
  }

  function handleSubject(e: React.ChangeEvent<HTMLSelectElement>): void {
    setSubject(e.target.value)
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
    
    if (title.validate() && description.validate() && isEmpty('group', groups) && isEmpty('subject', subject) && loggedUser && task.every((t, i) => isEmpty(`question${i}`, t.question) && isEmpty(`answer${i}`, t.answer))) {

      const newLesson: ILesson = {
        id: lessonToEdit ? lessonToEdit.id : `L${getRandomID()}`,
        createdby: lessonToEdit ? lessonToEdit.createdby : loggedUser.id,
        title: title.value,
        video: video.value,
        text: description.value,
        subject: subject,
        task: task,
        groups: groups,
        status: lessonToEdit ? status.value as Status : 'active',
      }

      if (id) {
        editLesson(id, newLesson);
      } else {
        createLesson(newLesson);
      }
      navigate('/painel/aulas');
    }
  }

  if (loggedUser?.access !== 'admin' && loggedUser?.id !== lessonToEdit?.createdby && lessonToEdit)
  return <Navigate to='/painel/aulas' />

  return (
    <div className={Styles.createlesson} >
      <form onSubmit={handleSubmit}>

        <div>
          <Input type='text' label='Título da aula' {...title} />
          <Input type='text' label='Link do youtube' {...video} />
          <Textarea label='Descrição' rows={10} {...description} />
        </div>

        {id && (<Select label='Estado' options={[{name: 'Ativo', value: 'active'}, {name: 'Desativo', value: 'disable'}]} {...status} />)}

        <div>
          <h2>Turmas</h2>
          <div className={Styles.createlesson_groups}>
            {showUserGroups().map((groupMap) => (
              <div key={groupMap.id}>
                <input type='checkbox' checked={groups.some((group) => group === groupMap.id)} onChange={(e) => handleGroups(e, groupMap.id)}/>
                <label>{groupMap.name}</label>
              </div>
            ))}
            {showUserGroups().length === 0 && (<label>Sem turma criada, ativa ou vinculada</label>)}
          </div>
          {error === 'group' && (<Error>Selecione pelo menos uma turma</Error>)}
        </div>

        <div className={Styles.createlesson_subjects}>
          <h2>Matéria</h2>
          <select value={subject} onChange={handleSubject}>
            {showUserSubjects().length > 0 ? (<option value=''>Selecione uma matéria</option>) : (<option value=''>Sem máteria criada, ativa ou vinculada</option>)}
            {showUserSubjects().map((sub) => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
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