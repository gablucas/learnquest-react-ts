import React from 'react';
import Panel from '../Panel.module.css';
import { GlobalContext } from '../../../GlobalContext';
import { Link, useNavigate } from "react-router-dom";
import useData from '../../../hooks/useData';
import { IStudent } from '../../../types/Users';
import Message from '../../../components/Message/Message';
import EditIcon from '../../../components/Icons/EditIcon';
import DeleteIcon from '../../../components/Icons/DeleteIcon';
import MoreInfo from '../../../components/Icons/MoreInfo';
import { MobileInfoData } from '../../../types/Commom';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import { ILesson } from '../../../types/Lessons';
import Filter from '../../../components/Filter/Filter';
import useHelpers from '../../../hooks/useHelpers';
import FilterIcon from '../../../components/Icons/FilterIcon';

const Lessons = () => {
  const { setConfirm, filter, toggle, setToggle } = React.useContext(GlobalContext);
  const { isArrayEmpty, isAnyArrayFilled, arrayIncludes, cleanFilter } = useHelpers();
  const { data } = React.useContext(GlobalContext);
  const { getUser, getLoggedUser, removeLesson, getSubject } = useData();
  const navigate = useNavigate();
  const loggedUser = getLoggedUser();


  let lessons = loggedUser?.access === 'admin' ? data.lessons : data.lessons.filter((lesson) => lesson.createdby === loggedUser?.id)
  if (!isArrayEmpty(filter.subject)) lessons = lessons.filter((lesson) => arrayIncludes(filter.subject, lesson.subject));
  if (!isArrayEmpty(filter.createdby)) lessons = lessons.filter((lesson) => arrayIncludes(filter.createdby, lesson.createdby));

  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoData[]>([{title: '', description: ''}]);

  function handleEdit(id: string): void {
    if (data.users.some((user) => user.access === 'student' && (user as IStudent).lessons.some((lesson) => lesson.id === id))) {
      setConfirm({type: 'message', text: 'Não é mais possível editar essa aula, pois ela já foi finalizada por um ou mais alunos'})
    } else {
      navigate(`editar/${id}`);
    }
  }

  function handleRemove(id: string): void {
    removeLesson(id);
  }

  function handleMobileInfo(lesson: ILesson): void {
    const createdby = {title: 'Criado por', description: getUser(lesson.createdby)?.name || ''};
    const subject = {title: 'Matéria', description: getSubject(lesson.subject)?.name || ''};
    const questions = {title: 'Questões', description: lesson.task.length};

    setMobileInfo([createdby, subject, questions]);
    setToggle('mobile');
  }

  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <Link to='criar'>Criar aula +</Link>
        <button onClick={() => setToggle('mobile')} className={isAnyArrayFilled([filter.subject, filter.createdby, filter.status]) ? Panel.filter : ''} >Filtrar <FilterIcon /></button>
        {isAnyArrayFilled([filter.subject, filter.createdby, filter.status]) && (<button onClick={() => cleanFilter()} className={Panel.cleanfilter}>Limpar filtro</button>)}
      </div>

      <div className={`${Panel.info} ${Panel.lessons}`}>
        <div>
          <span>Título</span>
          <span>Criada por</span>
          <span>Matéria</span>
          <span>Estado</span>
          <span className={Panel.mobile}>Informações</span>
          <span>Editar</span>
          <span>Excluir</span>
        </div>

        {lessons.map((lesson) => (
          <div key={lesson.id} className={Panel.lesson}>
            <span>{lesson.title}</span>
            <span>{getUser(lesson.createdby)?.name}</span>
            <span>{getSubject(lesson.subject)?.name}</span>
            <span>{lesson.status === 'active' ? 'Ativada' : 'Desativada'}</span>
            <button className={Panel.mobile} onClick={() => handleMobileInfo(lesson)}><MoreInfo /></button>
            <button onClick={() => handleEdit(lesson.id)}><EditIcon /></button>
            <button onClick={() => setConfirm({type: 'confirm', text: 'A exclusão desta aula também removerá de todos os alunos que já a concluíram, incluindo a XP ganha também. Deseja excluir mesmo assim?', action: () => handleRemove(lesson.id)})}><DeleteIcon /></button>
          </div>
        ))}
      </div>

      {toggle === 'confirm' && <Message />}
      {toggle === 'filter' && <Filter options={{access: false, student: false, subject: true, group: false, createdby: true, status: false}} />}
      {toggle === 'mobile' && mobileInfo && (<MobileInfo info={mobileInfo} />)}
      
    </section>
  )
}

export default Lessons;