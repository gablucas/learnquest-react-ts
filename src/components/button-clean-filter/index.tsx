import React from 'react';
import Styles from './ButtonCleanFilter.module.css'
import { GlobalContext } from "../../GlobalContext";
import { isAnyArrayFilled } from "../../utils/isAnyArrayFilled";
import { FilterStateProps } from '../../types/Filter';

type ButtonCleanFilterProps<T> = {
  isFiltered: T[];
}

const ButtonCleanFilter = <T extends keyof FilterStateProps>({ isFiltered }: ButtonCleanFilterProps<T>) => {
  const { filter, setFilter } = React.useContext(GlobalContext);

  const cleanFilter = React.useCallback(() => setFilter({access: [], student: [], subject: [], group: [], createdby: [], status: []}), [setFilter])


  React.useEffect(() => {
    cleanFilter();
  }, [cleanFilter])

  return (
    <>
      {isAnyArrayFilled(isFiltered.map((f) => filter[f])) && (<button onClick={cleanFilter} className={Styles.cleanfilter}>Limpar filtro</button>)}
    </>
  )
}

export { ButtonCleanFilter };