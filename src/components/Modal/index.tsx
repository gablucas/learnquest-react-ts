import Styles from './Modal.module.css';

type ModalProps = {
  children: React.ReactNode,
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({children, setToggle}: ModalProps) => {

  function handleToggle(e: React.MouseEvent<HTMLDivElement>): void {
    if (e.target === e.currentTarget) setToggle?.(false);
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