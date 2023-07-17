export type Role = 'admin' | 'teacher'| 'student';

export type ValidateOptions = 'login' | 'email'

export type Subject = {
  id: string, 
  name: string, 
  status: boolean
}

export type ConfirmStateProps = {
  toggle: boolean,
  text: string,
  type: 'confirm' | 'message',
  action?: () => void,
}