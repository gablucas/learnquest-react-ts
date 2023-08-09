import EditIcon from "../../../../../components/Icons/EditIcon";
import useToggle from "../../../../../hooks/useToggle";
import HandleUser from "../handle-user";

type ButtonEditUserProps = {
  userID: string,
}

const ButtonEditUser = ({ userID }: ButtonEditUserProps) => {
  const { toggle, handleToggle } = useToggle();

  return (
    <>
      <button onClick={handleToggle}><EditIcon /></button>
      {toggle && <HandleUser userID={userID} handleToggle={handleToggle} />}
    </>
  )
}

export { ButtonEditUser };