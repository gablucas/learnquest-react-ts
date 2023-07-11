import React from 'react';
import Styles from './Confirm.module.css';
import Modal from "../Modal";
import { GlobalContext } from '../../GlobalContext';

const Confirm = () => {
  const { confirm, setConfirm } = React.useContext(GlobalContext);

  function handleClick(choice: boolean): void {
    if (choice) {
      confirm.action();
    } 

    setConfirm({toggle: false, text: '', action: () => ''});
  }


  return (
    <Modal>
      <div className={Styles.confirm}>
        <p>{confirm.text}</p>
        <button onClick={() => handleClick(true)}>Prosseguir</button>
        <button onClick={() => handleClick(false)}>Cancelar</button>
      </div>
    </Modal>
  )
}

export default Confirm;