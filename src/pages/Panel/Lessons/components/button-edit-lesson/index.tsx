import { useContext } from "react";
import EditIcon from "../../../../../components/Icons/EditIcon";
import Message from "../../../../../components/Message/Message";
import useToggle from "../../../../../hooks/useToggle"
import { GlobalContext } from "../../../../../GlobalContext";
import { useNavigate } from "react-router-dom";
import { IStudent } from "../../../../../types/Users";

const ButtonEditLesson = ({ lessonID }: {lessonID: string}) => {
  const { data } = useContext(GlobalContext);
  const { toggle, handleToggle } = useToggle();
  const navigate = useNavigate();

  function handleEdit(): void {
    if (data.users.some((user) => user.access === 'student' && (user as IStudent).lessons.some((lesson) => lesson.id === lessonID))) {
      handleToggle();
    } else {
      navigate(`editar/${lessonID}`);
    }
  }

  return (
    <>
      <button onClick={handleEdit}><EditIcon /></button>
      {toggle && <Message handleToggle={handleToggle} type='message' text='Não é mais possível editar essa aula, pois ela já foi finalizada por um ou mais alunos' action={() => ''} />}
    </>
  )
}

export { ButtonEditLesson };