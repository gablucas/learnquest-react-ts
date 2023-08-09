import React from 'react';
import { GlobalContext } from '../../GlobalContext';
import Styles from './ButtonFilter.module.css'
import Filter from "../Filter/Filter";
import FilterIcon from "../Icons/FilterIcon";
import useToggle from "../../hooks/useToggle";
import { isAnyArrayFilled } from '../../utils/isAnyArrayFilled';
import { FilterStateProps } from '../../types/Filter';

type ButtonFilterProsp<T> = {
  isFiltered: T[],
}

const ButtonFilter = <T extends keyof FilterStateProps>({ isFiltered }: ButtonFilterProsp<T>) => {
  const { filter } = React.useContext(GlobalContext);
  const { toggle, handleToggle } = useToggle();

  return (
    <>
      <button onClick={handleToggle} className={isAnyArrayFilled(isFiltered.map((key) => filter[key])) ? Styles.filter : ''} >Filtrar <FilterIcon /></button>
      {toggle && <Filter handleToggle={handleToggle} options={isFiltered} />}
    </>
  )
}

export { ButtonFilter };