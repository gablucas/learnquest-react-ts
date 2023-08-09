import React from 'react';
import Panel from '../../../Panel.module.css';
import { GlobalContext } from "../../../../../GlobalContext";
import useToggle from "../../../../../hooks/useToggle";
import { FilterStateProps } from "../../../../../types/Filter";
import { isAnyArrayFilled } from "../../../../../utils/isAnyArrayFilled";
import Filter from '../../../../../components/Filter/Filter';
import FilterIcon from '../../../../../components/Icons/FilterIcon';

type ButtonFilterEvaluateProps<T> = {
  isFiltered: T[],
}

const ButtonFilterEvaluate = <T extends keyof FilterStateProps>({ isFiltered }: ButtonFilterEvaluateProps<T>) => {
  const { filter } = React.useContext(GlobalContext);
  const { toggle, handleToggle } = useToggle();

  return (
    <>
      <button onClick={handleToggle} className={isAnyArrayFilled(isFiltered.map((key) => filter[key])) ? Panel.filter : ''}>Filtrar <FilterIcon /></button>
      {toggle && <Filter handleToggle={handleToggle} options={{access: false, student: true, subject: true, group: false, createdby: true, status: false}} />}
    </>
  )
}

export { ButtonFilterEvaluate };