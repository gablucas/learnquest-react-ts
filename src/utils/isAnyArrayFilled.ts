function isAnyArrayFilled<T>(arrs: Array<T[]>): boolean {
  return arrs.some((arr) => arr.length !== 0);
}

export { isAnyArrayFilled };