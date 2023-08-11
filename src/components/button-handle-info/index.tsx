import React from 'react';
import useToggle from "../../hooks/useToggle";


const ButtonHandleInfo = ({ children }: { children: React.ReactNode}) => {
  const { toggle, handleToggle } = useToggle();

  return (
    <>
      <button onClick={handleToggle}>Criar usuário +</button>
      {toggle && {children}}
    </>
  )
}

export { ButtonHandleInfo };