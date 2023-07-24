import React from 'react';
import { GlobalContext } from '../../GlobalContext';
import Styles from './Modal.module.css';

type ModalProps = {
  children: React.ReactNode,
}

const Modal = ({ children }: ModalProps) => {
  const { setToggle } = React.useContext(GlobalContext);

  function handleToggle(e: React.MouseEvent<HTMLDivElement>): void {
    if (e.target === e.currentTarget) setToggle('none');
  }

  return (
    <div className={Styles.modal_container} onClick={handleToggle}>
      <div className={Styles.modal_content}>
        {children}
      </div>
    </div>
  )
}

export default Modal;