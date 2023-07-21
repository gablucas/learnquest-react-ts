export interface Group {
  id: string,
  name: string,
  students: string[],
  status: 'active' | 'disable',
}