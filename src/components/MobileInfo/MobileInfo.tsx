import { MobileInfoProps } from '../../types/Commom';
import Styles from './MobileInfo.module.css';


const MobileInfo = ({ info }: {info: MobileInfoProps[]}) => {

  return (
    <div className={Styles.container}>
      {info.map((i) => (
        <div key={i.title} className={Styles.info}>
          <span>{i.title}: </span>
          <span>{i.description}</span>
        </div>
        ))}
    </div>
  )
}

export default MobileInfo;