import useToggle from "../../../../../hooks/useToggle";
import HandleSubject from "../handle-subject";

const ButtonCreateSubject = () => {
  const { toggle, handleToggle } = useToggle();

  return (
    <>
      <button onClick={handleToggle}>Criar matéria</button>
      {toggle && <HandleSubject handleToggle={handleToggle} />}
    </>
  )
}

export { ButtonCreateSubject };