import React from 'react';
import { GlobalContext } from "../GlobalContext";

interface IHelpersReturn<T> {
  isArrayEmpty: (arr: T[]) => boolean,
  isAnyArrayFilled: (arrs: Array<T[]>) => boolean,
  arrayIncludes: (arr: string[], find: string) => boolean,
  cleanFilter: () => void,
}

const useHelpers = <T,>(): IHelpersReturn<T> => {
  const { setFilter } = React.useContext(GlobalContext);

  function isArrayEmpty(arr: T[]): boolean {
    return arr.length === 0;
  }

  function isAnyArrayFilled(arrs: Array<T[]>): boolean {
    return arrs.some((arr) => arr.length !== 0);
  }

  function arrayIncludes(arr: string[], find: string): boolean {
    return arr.includes(find);
  }

  function cleanFilter(): void {
    setFilter({access: [], student: [], subject: [], group: [], createdby: [], status: []})
  }

  return {
    isArrayEmpty,
    isAnyArrayFilled,
    arrayIncludes,
    cleanFilter,
  }
}

export default useHelpers;