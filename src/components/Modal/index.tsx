import React from 'react';
import Styles from './Modal.module.css';

type ModalProps = {
  children: React.ReactNode,
  handleToggle: () => void,
}

const Modal = ({ children, handleToggle }: ModalProps) => {

  function closeModal(e: React.MouseEvent<HTMLDivElement>): void {
    if (e.target === e.currentTarget) handleToggle();
  }

  return (
    <div className={Styles.modal_container} onClick={closeModal}>
      <div className={Styles.modal_content}>
        {children}
      </div>
    </div>
  )
}

export default Modal;