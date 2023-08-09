import DeleteIcon from "../../../../../components/Icons/DeleteIcon";
import Message from "../../../../../components/Message/Message";
import { useSubject } from "../../../../../hooks/useSubject";
import useToggle from "../../../../../hooks/useToggle";

const ButtonDeleteSubject = ({ subjectID }: { subjectID : string}) => {
  const { toggle, handleToggle } = useToggle();
  const { deleteSubject } = useSubject();

  return (
    <>
      <button onClick={handleToggle}><DeleteIcon /></button>
      {toggle && <Message handleToggle={handleToggle} type='confirm' text='Deseja realmente excluir este usuário?' action={() => deleteSubject(subjectID)} />}
    </>
  )
}

export { ButtonDeleteSubject };