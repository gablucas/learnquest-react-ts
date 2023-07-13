import React from 'react';
import Styles from './Message.module.css';
import Modal from "../Modal";
import { GlobalContext } from '../../GlobalContext';

const Message = () => {
  const { confirm, setConfirm } = React.useContext(GlobalContext);

  function handleClick(choice: boolean): void {
    if (choice && confirm.type === 'confirm') {
      confirm.action?.();
    } 

    setConfirm({toggle: false, type: 'message', text: '', action: () => ''});
  }


  return (
    <Modal>
      <div className={Styles.message}>
        <p>{confirm.text}</p>
        {confirm.type === 'confirm' && (<button onClick={() => handleClick(true)}>Prosseguir</button>)}
        <button onClick={() => handleClick(false)}>{confirm.type === 'confirm' ? 'Cancelar' : 'OK'}</button>
      </div>
    </Modal>
  )
}

export default Message;