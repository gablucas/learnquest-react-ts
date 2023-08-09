import React from 'react';
import Panel from '../../../Panel.module.css';
import { GlobalContext } from "../../../../../GlobalContext";
import { isAnyArrayFilled } from "../../../../../utils/isAnyArrayFilled";

const ButtonCleanFilter = () => {
  const { filter, setFilter } = React.useContext(GlobalContext);

  function cleanFilter(): void {
    setFilter({access: [], student: [], subject: [], group: [], createdby: [], status: []})
  }

  return (
    <>
      {isAnyArrayFilled([filter.access, filter.status]) && (<button onClick={cleanFilter} className={Panel.cleanfilter}>Limpar filtro</button>)}
    </>
  )
}

export { ButtonCleanFilter };