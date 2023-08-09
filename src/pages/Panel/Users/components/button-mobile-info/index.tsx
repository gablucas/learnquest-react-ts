import Panel from '../../../Panel.module.css';
import useToggle from "../../../../../hooks/useToggle";
import MoreInfo from '../../../../../components/Icons/MoreInfo';
import MobileInfo from '../../../../../components/MobileInfo/MobileInfo';
import { IStudent, IUser } from '../../../../../types/Users';

type ButtonMobileInfoProps = {
  user: IUser | IStudent,
}

const ButtonMobileInfo = ({ user }: ButtonMobileInfoProps) => {
  const { toggle, handleToggle } = useToggle();

  const info = [
    {title: 'Nome', description: user.name},
    {title: 'Email', description: user.email},
    {title: 'Acesso', description: user.access},
    {title: 'Estado', description: user.status ? 'Ativado' : 'Desativado'}
  ]

  return (
    <>
      <button className={Panel.mobile} onClick={handleToggle} ><MoreInfo /></button>
      {toggle && (<MobileInfo handleToggle={handleToggle} info={info} />)}
    </>
  )
}

export { ButtonMobileInfo };