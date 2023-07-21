export type FilterStateProps = {
  access: string[],
  student: string[],
  subject: string[],
  group: string[],
  createdby: string[],
  status: string[],
}

export type FilterProp = {
  options: {
    access: boolean,
    student: boolean,
    subject: boolean,
    group: boolean,
    createdby: boolean,
    status: boolean,
  },
  setToggle: React.Dispatch<React.SetStateAction<boolean>>,
}

export type FilterData<U extends keyof FilterStateProps> = {
  dataKey: U,
  title: string,
  options: Array<{id: string, name: string}>
}