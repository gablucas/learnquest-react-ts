import DeleteIcon from "../../../../../components/Icons/DeleteIcon";
import Message from "../../../../../components/Message/Message";
import { useLesson } from "../../../../../hooks/useLesson";
import useToggle from "../../../../../hooks/useToggle";

const ButtonDeleteLesson = ({ lessonID }: {lessonID: string}) => {
  const { deleteLesson } = useLesson();
  const { toggle, handleToggle } = useToggle();

  return (
    <>
      <button onClick={handleToggle}><DeleteIcon /></button>
      {toggle && <Message handleToggle={handleToggle} type="confirm" text='A exclusão desta aula também removerá de todos os alunos que já a concluíram, incluindo a XP ganha também. Deseja excluir mesmo assim?' action={() => deleteLesson(lessonID)} />}
    </>
  )
}

export { ButtonDeleteLesson };