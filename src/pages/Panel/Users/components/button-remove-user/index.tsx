import DeleteIcon from "../../../../../components/Icons/DeleteIcon";
import Message from "../../../../../components/Message/Message";
import useToggle from "../../../../../hooks/useToggle";
import { useUser } from '../../../../../hooks/useUser';

type ButtonRemoverUserProps = {
  userEmail: string,
}

const ButtonRemoveUser = ({ userEmail }: ButtonRemoverUserProps) => {
  const { deleteUser } = useUser();
  const { toggle, handleToggle } = useToggle();

  return (
    <>
      <button onClick={handleToggle}><DeleteIcon /></button>
      {toggle && <Message handleToggle={handleToggle} type='confirm' text='Deseja realmente excluir este usuário?' action={() => deleteUser(userEmail)} />}
    </>
  )
}

export { ButtonRemoveUser };