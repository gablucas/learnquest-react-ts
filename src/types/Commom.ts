export type Subjects = {
  id: string, 
  name: string, 
  status: boolean
}

export type ConfirmStateProps = {
  toggle: boolean,
  text: string,
  action: () => void,
}