import EditIcon from "../../../../../components/Icons/EditIcon";
import useToggle from "../../../../../hooks/useToggle";
import HandleGroup from "../handle-group/HandleGroup";

type ButtonEditGroupProps = {
  groupID: string,
}

const ButtonEditGroup = ({ groupID }: ButtonEditGroupProps) => {
  const { toggle, handleToggle } = useToggle();

  return (
    <>
      <button onClick={handleToggle}><EditIcon /></button>
      {toggle && <HandleGroup groupID={groupID} handleToggle={handleToggle} />}
    </>
  )
}

export { ButtonEditGroup };