import EditIcon from "../../../../../components/Icons/EditIcon";
import useToggle from "../../../../../hooks/useToggle";
import HandleSubject from "../handle-subject";

const ButtonEditSubject = ({ subjectID }: {subjectID : string}) => {
  const { toggle, handleToggle } = useToggle();

  return (
    <>
      <button onClick={handleToggle}><EditIcon /></button>
      {toggle && <HandleSubject subjectID={subjectID} handleToggle={handleToggle} />}
    </>
  )
}

export { ButtonEditSubject };