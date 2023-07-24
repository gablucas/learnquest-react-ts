export type Role = 'admin' | 'teacher'| 'student';

export type ValidateOptions = 'login' | 'email';

export type Status = 'active' | 'disable';

export type Subject = {
  id: string, 
  name: string, 
  status: Status,
}

export type ConfirmStateProps = {
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
}

export type Toggle = 'create' | 'edit' | 'filter' | 'confirm' | 'mobile' | 'none';