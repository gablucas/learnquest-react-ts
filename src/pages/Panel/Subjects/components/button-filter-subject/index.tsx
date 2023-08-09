import Filter from "../../../../../components/Filter/Filter";
import FilterIcon from "../../../../../components/Icons/FilterIcon";
import useToggle from "../../../../../hooks/useToggle";

const ButtonFilterSubject = () => {
  const { handleToggle, toggle } = useToggle();

  return (
    <>
      <button onClick={handleToggle}>Filtrar <FilterIcon /></button>
      {toggle && <Filter handleToggle={handleToggle} options={{access: false, student: false, subject: true, group: false, createdby: false, status: true}} />}
    </>
  )
}

export { ButtonFilterSubject };