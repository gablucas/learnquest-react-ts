import useToggle from "../../../../../hooks/useToggle";
import HandleGroup from "../handle-group/HandleGroup";

const ButtonCreateGroup = () => {
  const { toggle, handleToggle } = useToggle();

  return (
    <>
      <button onClick={handleToggle} >Criar grupo +</button>
      {toggle && <HandleGroup handleToggle={handleToggle} />}
    </>
  )
}

export { ButtonCreateGroup };