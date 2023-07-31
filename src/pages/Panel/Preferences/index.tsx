import React from 'react';
import Styles from './Preferences.module.css';
import { GlobalContext } from '../../../GlobalContext';
import EditDefaultPassword from './components/edit-default-password';

const Preferences = () => {
  const { data, toggle, setToggle } = React.useContext(GlobalContext);

  return (
    <div className={Styles.preferences}>

      <div className={Styles.preferences_defaultpassword}>
        <span>Senha padrão</span>
        <span>{data?.preferences.defaultPassword}</span>
        <button onClick={() => setToggle('edit')}>Alterar senha</button>
      </div>


      {toggle === 'edit' && (<EditDefaultPassword />)}

    </div>
  )
}

export default Preferences;