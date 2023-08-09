import DeleteIcon from "../../../../../components/Icons/DeleteIcon";
import Message from "../../../../../components/Message/Message";
import { useGroup } from "../../../../../hooks/useGroup";
import useToggle from "../../../../../hooks/useToggle"


const ButtonDeleteGroup = ({ groupID }: { groupID : string }) => {
  const { toggle, handleToggle } = useToggle();
  const { deleteGroup } = useGroup();

  return (
    <>
      <button onClick={handleToggle}><DeleteIcon /></button>
      {toggle && <Message handleToggle={handleToggle} type='confirm' text='Deseja realmente excluir este grupo?' action={() => deleteGroup(groupID)} />}
    </>
  )
}

export { ButtonDeleteGroup }