import useToggle from "../../../../../hooks/useToggle"
import HandleUser from "../handle-user";

const ButtonCreateUser = () => {
  const { toggle, handleToggle } = useToggle();

  return (
    <>
      <button onClick={handleToggle}>Criar usuário +</button>
      {toggle && <HandleUser handleToggle={handleToggle} />}
    </>
  )
}

export { ButtonCreateUser };