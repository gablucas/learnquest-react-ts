import Modal from '../Modal';
import Styles from './MobileInfo.module.css';

type MobileInfoProps = {
  info: Array<{title: string, description: string}>,
  handleToggle: () => void,
}


const MobileInfo = ({ info, handleToggle }: MobileInfoProps) => {

  return (
    <Modal handleToggle={handleToggle} >
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