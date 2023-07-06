import React from 'react';
import Styles from '../Panel.module.css';
import { GlobalContext } from '../../../GlobalContext';


const Preferences = () => {
  const { data } = React.useContext(GlobalContext);

  return (
    <div className={Styles.preferences}>
      <div>
        <h2>Senha padrão</h2>
        <span>{data?.preferences.defaultPassword}</span>
      </div>
    </div>
  )
}

export default Preferences;