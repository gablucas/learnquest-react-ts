import React, { useContext } from 'react';
import Styles from './HandleLesson.module.css';
import useData from '../../../hooks/useData';
import Input from '../../../components/Inputs/Input';
import useForm from '../../../hooks/useForm';
import Textarea from '../../../components/Inputs/Textarea';
import useRandom from '../../../hooks/useRandom';
import useValidate from '../../../hooks/useValidate';
import Select from '../../../components/Inputs/Select';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../../../GlobalContext';
import { ILesson, Task } from '../../../types/Lessons';
import { Status } from '../../../types/Commom';
import GroupsList from './components/groups-list';
import SubjectsList from './components/subjects-list';
import Tasks from './tasks';

const HandleLesson = () => {
  const { data } = useContext(GlobalContext);
  const { id } = useParams();
  const { getLoggedUser, createLesson, editLesson } = useData();
  const { getRandomID } = useRandom();
  const loggedUser = getLoggedUser();
  const navigate = useNavigate();
  const { isEmpty } = useValidate();

  const lessonToEdit = data.lessons.find((lesson) => lesson.id === id);

  const title =  useForm({type: 'title', initialValue: lessonToEdit ? lessonToEdit.title : ''});
  const video =  useForm({type: 'video', initialValue: lessonToEdit ? `https://www.youtube.com/watch?v=${lessonToEdit?.video}` : ''})
  const description =  useForm({type: 'video', initialValue: lessonToEdit ? lessonToEdit.text : ''});
  const status =  useForm({type: 'status', initialValue: lessonToEdit ? lessonToEdit.status : ''});

  const [task, setTask] = React.useState<Task[]>(lessonToEdit ? lessonToEdit.task : [{id: `T${getRandomID()}`, type: 'open', answer: '', question: '', xp: 25}]);
  const [groups, setGroups] = React.useState<string[]>(lessonToEdit ? lessonToEdit.groups : [])
  const [subject, setSubject] = React.useState<string>(lessonToEdit ? lessonToEdit.subject : '');


  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();

    function validateOpenTasks(): boolean {
      return task.every((t, i) => t.type === 'open' && isEmpty(`question${i}`, t.question) && isEmpty(`answer${i}`, t.answer));
    }
    
    function validateOpenAlternativeTasks(): boolean {
      return task.some((t, i) => isEmpty(`question${i}`, t.question) && t.options?.every((t2, optionIndex) => isEmpty(`alternative-t${i}-o${optionIndex}`, t2.option)) && isEmpty(`answer${i}`, t.answer))
    }

    if (title.validate() && description.validate() && isEmpty('group', groups) && isEmpty('subject', subject) && loggedUser && (validateOpenTasks() || validateOpenAlternativeTasks())) {

      const newLesson: ILesson = {
        id: lessonToEdit ? lessonToEdit.id : `L${getRandomID()}`,
        createdby: lessonToEdit ? lessonToEdit.createdby : 'a',
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

  const options = [{name: 'Ativo', value: 'active'}, {name: 'Desativo', value: 'disable'}];

  if (loggedUser?.access !== 'admin' && loggedUser?.id !== lessonToEdit?.createdby && lessonToEdit)
  return <Navigate to='/painel/aulas' />

  return (
    <div className={Styles.container} >
      <form onSubmit={handleSubmit}>

        <div>
          <Input type='text' label='Título da aula' {...title} />
          <Input type='text' label='Link do youtube' {...video} />
          <Textarea label='Descrição' rows={10} {...description} />
        </div>

        {id && (<Select label='Estado' options={options} {...status} />)}
        <GroupsList groups={groups} setGroups={setGroups} />
        <SubjectsList subject={subject} setSubject={setSubject} />
        <Tasks task={task} setTask={setTask} />
        
        <button>Salvar aula</button>
      </form>
    </div>
  )
}

export default HandleLesson;