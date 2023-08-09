import React from 'react';
import Styles from './DefaultPassword.module.css';
import { GlobalContext } from "../../../../../GlobalContext";
import { ButtonChangeDefaultPassword } from "./button-change-default-password";

const DefaultPassword = () => {
  const { data } = React.useContext(GlobalContext);

  return (
    <div className={Styles.defaultpassword}>
      <span>Senha padrão</span>
      <span>{data?.preferences.defaultPassword}</span>
      <ButtonChangeDefaultPassword />
    </div>
  )
}

export { DefaultPassword };