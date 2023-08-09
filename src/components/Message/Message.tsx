import Styles from './Message.module.css';
import Modal from "../Modal";

type MessageProps = {
  type: string,
  text: string,
  handleToggle: () => void,
  action: () => void,
}

const Message = ({ handleToggle, type, text, action }: MessageProps) => {

  function handleClick(choice: boolean): void {
    if (choice && type === 'confirm') {
      action?.();
    } 
    handleToggle();
  }


  return (
    <Modal handleToggle={handleToggle}>
      <div className={Styles.message}>
        <p>{text}</p>
        {type === 'confirm' && (<button onClick={() => handleClick(true)}>Prosseguir</button>)}
        <button onClick={() => handleClick(false)}>{type === 'confirm' ? 'Cancelar' : 'OK'}</button>
      </div>
    </Modal>
  )
}

export default Message;