import React from 'react';
import Styles from '../Panel.module.css';
import { GlobalContext } from '../../../GlobalContext';


const Preferences = () => {
  const { data } = React.useContext(GlobalContext);

  return (
    <div className={Styles.preferences}>

      <div className={Styles.preferences_defaultpassword}>
        <span>Senha padrão</span>
        <span>{data?.preferences.defaultPassword}</span>
        <button>Alterar senha</button>
      </div>
    </div>
  )
}

export default Preferences;