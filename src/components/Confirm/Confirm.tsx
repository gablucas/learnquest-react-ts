import React from 'react';
import Styles from './Confirm.module.css';
import { ConfirmStateProps } from "../../types/Commom";
import Modal from "../Modal";

type ConfirmProps = {
  confirm: ConfirmStateProps,
  setConfirm: React.Dispatch<React.SetStateAction<ConfirmStateProps>>,
}


const Confirm = ({confirm, setConfirm}: ConfirmProps) => {

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