export type Role = 'admin' | 'teacher'| 'student';

export type ValidateOptions = 'login' | 'email'

export type Subject = {
  id: string, 
  name: string, 
  status: 'active' | 'disable',
}

export type ConfirmStateProps = {
  toggle: boolean,
  text: string,
  type: 'confirm' | 'message',
  action?: () => void,
}

export type MobileInfoData = {
  title: string,
  description: string | number,
}

export type MobileInfoProps = {
  info: MobileInfoData[],
  setToggle: React.Dispatch<React.SetStateAction<boolean>>,
}