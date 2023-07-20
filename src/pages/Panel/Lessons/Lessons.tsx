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
import { MobileInfoProps } from '../../../types/Commom';
import Modal from '../../../components/Modal';
import MobileInfo from '../../../components/MobileInfo/MobileInfo';
import { ILesson } from '../../../types/Lessons';

const Lessons = () => {
  const { confirm, setConfirm } = React.useContext(GlobalContext);
  const { data } = React.useContext(GlobalContext);
  const { getUser, getLoggedUser, removeLesson, getSubject } = useData();
  const navigate = useNavigate();
  const loggedUser = getLoggedUser();
  const lessons = loggedUser?.access === 'admin' ? data.lessons : data.lessons.filter((lesson) => lesson.createdBy === loggedUser?.id)

  const [toggleMobile, setToggleMobile] = React.useState(false);
  const [mobileInfo, setMobileInfo] = React.useState<MobileInfoProps[]>([{title: '', description: ''}]);

  function handleEdit(id: string): void {
    if (data.users.some((user) => user.access === 'student' && (user as IStudent).lessons.some((lesson) => lesson.id === id))) {
      setConfirm({toggle: true, type: 'message', text: 'Não é mais possível editar essa aula, pois ela já foi finalizada por um ou mais alunos'})
    } else {
      navigate(`editar/${id}`);
    }
  }

  function handleRemove(id: string): void {
    removeLesson(id);
  }

  function handleMobileInfo(lesson: ILesson): void {
    const createdBy = {title: 'Criado por', description: getUser(lesson.createdBy)?.name || ''};
    const subject = {title: 'Matéria', description: getSubject(lesson.subject)?.name || ''};
    const questions = {title: 'Questões', description: lesson.task.length};

    setMobileInfo([createdBy, subject, questions]);
    setToggleMobile(true);
  }

  return (
    <section className={Panel.container}>

      <div className={Panel.options}>
        <Link to='criar'>Criar aula +</Link>
      </div>

      <div className={`${Panel.info} ${Panel.lessons}`}>
        <div>
          <span>Título</span>
          <span>Criada por</span>
          <span>Matéria</span>
          <span>Questões</span>
          <span>Informações</span>
          <span>Editar</span>
          <span>Excluir</span>
        </div>

        {lessons.map((lesson) => (
          <div key={lesson.id} className={Panel.lesson}>
            <span>{lesson.title}</span>
            <span>{getUser(lesson.createdBy)?.name}</span>
            <span>{getSubject(lesson.subject)?.name}</span>
            <span>{lesson.task.length}</span>
            <button className={Panel.mobile} onClick={() => handleMobileInfo(lesson)}><MoreInfo /></button>
            <button onClick={() => handleEdit(lesson.id)}><EditIcon /></button>
            <button onClick={() => setConfirm({toggle: true, type: 'confirm', text: 'A exclusão desta aula também removerá de todos os alunos que já a concluíram, incluindo a XP ganha também. Deseja excluir mesmo assim?', action: () => handleRemove(lesson.id)})}><DeleteIcon /></button>
          </div>
        ))}
      </div>

      {confirm?.toggle && <Message />}

      {toggleMobile && mobileInfo && (
        <Modal setToggle={setToggleMobile}>
          <MobileInfo info={mobileInfo} />
        </Modal>
      )}
      
    </section>
  )
}

export default Lessons;