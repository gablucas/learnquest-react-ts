import React from 'react';
import { GlobalContext } from '../../../../../GlobalContext';
import Panel from '../../../Panel.module.css';
import Filter from "../../../../../components/Filter/Filter";
import FilterIcon from "../../../../../components/Icons/FilterIcon";
import useToggle from "../../../../../hooks/useToggle";
import { isAnyArrayFilled } from '../../../../../utils/isAnyArrayFilled';

const ButtonFilterUser = () => {
  const { filter } = React.useContext(GlobalContext);
  const { toggle, handleToggle } = useToggle();

  return (
    <>
      <button onClick={handleToggle} className={isAnyArrayFilled([filter.access, filter.status]) ? Panel.filter : ''} >Filtrar <FilterIcon /></button>
      {toggle && <Filter handleToggle={handleToggle} options={{access: true, student: false, subject: false, group: false, createdby: false, status: true}} />}
    </>
  )
}

export { ButtonFilterUser };