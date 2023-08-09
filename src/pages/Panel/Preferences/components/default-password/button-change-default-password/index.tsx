import useToggle from "../../../../../../hooks/useToggle";
import EditDefaultPassword from "../edit-default-password";

const ButtonChangeDefaultPassword = () => {
  const { toggle, handleToggle } = useToggle();

  return (
    <>
      <button onClick={handleToggle}>Alterar senha</button>
      {toggle && <EditDefaultPassword handleToggle={handleToggle} />}
    </>
  )
}

export { ButtonChangeDefaultPassword };