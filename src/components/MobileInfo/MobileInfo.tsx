import { MobileInfoProps } from '../../types/Commom';
import Modal from '../Modal';
import Styles from './MobileInfo.module.css';


const MobileInfo = ({ info }: MobileInfoProps) => {

  return (
    <Modal>
      <div className={Styles.container}>
        {info.map((i) => (
          <div key={i.title} className={Styles.info}>
            <span>{i.title}: </span>
            <span>{i.description}</span>
          </div>
          ))}
      </div>
    </Modal>
  )
}

export default MobileInfo;