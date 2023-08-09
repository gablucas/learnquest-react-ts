import React from 'react';
import Panel from '../../../Panel.module.css';
import Filter from "../../../../../components/Filter/Filter";
import FilterIcon from "../../../../../components/Icons/FilterIcon";
import useToggle from "../../../../../hooks/useToggle";
import { isAnyArrayFilled } from "../../../../../utils/isAnyArrayFilled";
import { FilterStateProps } from '../../../../../types/Filter';
import { GlobalContext } from '../../../../../GlobalContext';

type ButtonFilterLessonProps<T> = {
  isFiltered: T[],
}

const ButtonFilterLesson = <T extends keyof FilterStateProps>({ isFiltered }: ButtonFilterLessonProps<T>) => {
  const { filter } = React.useContext(GlobalContext);
  const { toggle, handleToggle } = useToggle();

  return (
    <>
      <button onClick={handleToggle} className={isAnyArrayFilled(isFiltered.map((f) => filter[f])) ? Panel.filter : ''}>Filtrar <FilterIcon /></button>
      {toggle && <Filter handleToggle={handleToggle} options={{access: false, student: false, subject: true, group: false, createdby: true, status: false}} />}
    </>
  )
}

export { ButtonFilterLesson };