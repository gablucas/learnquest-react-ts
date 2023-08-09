import Modal from '../Modal';
import Styles from './MobileInfo.module.css';

type MobileInfoProps = {
  info: [string, string | number][],
  handleToggle: () => void,
}


const MobileInfo = ({ info, handleToggle }: MobileInfoProps) => {

  return (
    <Modal handleToggle={handleToggle} >
      <div className={Styles.container}>
        {info.map((i) => (
          <div key={i[0]} className={Styles.info}>
            <span>{i[0]}: </span>
            <span>{i[1]}</span>
          </div>
          ))}
      </div>
    </Modal>
  )
}

export default MobileInfo;