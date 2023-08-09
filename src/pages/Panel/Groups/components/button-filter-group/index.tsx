import Filter from "../../../../../components/Filter/Filter";
import FilterIcon from "../../../../../components/Icons/FilterIcon";
import useToggle from "../../../../../hooks/useToggle";

const ButtonFilterGroup = () => {
  const { toggle, handleToggle } = useToggle();

  return (
    <>
      <button onClick={handleToggle}>Filtrar <FilterIcon /></button>
      {toggle && <Filter handleToggle={handleToggle} options={{access: false, student: false, subject: false, group: true, createdby: false, status: true}} />}
    </>
  )
}

export { ButtonFilterGroup };