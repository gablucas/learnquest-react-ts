import React from 'react';
import Styles from './Filter.module.css';
import { FilterData, FilterStateProps } from "../../types/Filter";
import { GlobalContext } from '../../GlobalContext';
import Contract from '../Icons/Expand';
import Expand from '../Icons/Contract';
import useToggle from '../../hooks/useToggle';

const FilterOptions = <U extends keyof FilterStateProps>({ dataKey, title, options }: FilterData<U>) => {
  const { toggle, handleToggle } = useToggle(true);
  const { filter, setFilter } = React.useContext(GlobalContext);

  console.log('Renderizou FilterOptions')

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>, id: string): void {
    const updateFilter = {...filter};

    if (e.target.checked) {
      updateFilter[dataKey].push(id);
    } else {
      updateFilter[dataKey] = updateFilter[dataKey].filter((option) => option !== id);
    }
    setFilter(updateFilter);
  }

  return (
    <div className={Styles.filteroptions}>
      <div onClick={handleToggle}>
        <h3>{title}</h3>
        {toggle ? <Contract />  : <Expand />}
      </div>

      {toggle && (<div className={Styles.listoptions}>
        {options.map((option) => (
          <div key={option.id} className={Styles.option}>
            <input type="checkbox" checked={filter[dataKey].includes(option.id)} onChange={(e) => handleFilter(e, option.id)}/>
            <label>{option.name}</label>
          </div>
        ))}
      </div>)}
    </div>
  )
}

export default FilterOptions;
