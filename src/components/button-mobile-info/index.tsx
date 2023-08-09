import Styles from './ButtonMobileInfo.module.css';
import useToggle from "../../hooks/useToggle";
import MoreInfo from '../Icons/MoreInfo';
import MobileInfo from '../MobileInfo/MobileInfo';

type ButtonMobileInfoProps = {
  info: [string, string | number][],
}

const ButtonMobileInfo = ({ info }: ButtonMobileInfoProps) => {
  const { toggle, handleToggle } = useToggle();

  return (
    <>
      <button className={Styles.mobile} onClick={handleToggle} ><MoreInfo /></button>
      {toggle && (<MobileInfo handleToggle={handleToggle} info={info} />)}
    </>
  )
}

export { ButtonMobileInfo };