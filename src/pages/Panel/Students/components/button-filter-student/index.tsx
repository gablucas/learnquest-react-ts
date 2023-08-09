import { useContext } from "react";
import Panel from '../../../Panel.module.css';
import Filter from "../../../../../components/Filter/Filter";
import FilterIcon from "../../../../../components/Icons/FilterIcon";
import useToggle from "../../../../../hooks/useToggle";
import { isAnyArrayFilled } from "../../../../../utils/isAnyArrayFilled";
import { GlobalContext } from "../../../../../GlobalContext";
import { FilterStateProps } from "../../../../../types/Filter";

type ButtonFilterStudentProps<T> = {
  isFiltered: T[],
}

const ButtonFilterStudent = <T extends keyof FilterStateProps>({ isFiltered }: ButtonFilterStudentProps<T>) => {
  const { filter } = useContext(GlobalContext);
  const { toggle, handleToggle } = useToggle();

  return (
    <>
      <button onClick={() => handleToggle} className={isAnyArrayFilled(isFiltered.map((f) => filter[f])) ? Panel.filter : ''} >Filtrar <FilterIcon /></button>
      {toggle && <Filter handleToggle={handleToggle} options={{access: false, student: false, subject: false, group: true, createdby: false, status: false}} />}
    </>
  )
}

export { ButtonFilterStudent };