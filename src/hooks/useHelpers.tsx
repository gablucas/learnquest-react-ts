interface IHelpersReturn<T> {
  isArrayEmpty: (arr: T[]) => boolean,
  arrayIncludes: (arr: string[], find: string) => boolean,
}

const useHelpers = <T,>(): IHelpersReturn<T> => {

  function isArrayEmpty(arr: T[]): boolean {
    return arr.length === 0;
  }

  function arrayIncludes(arr: string[], find: string): boolean {
    return arr.includes(find);
  }

  return {
    isArrayEmpty,
    arrayIncludes,
  }
}

export default useHelpers;