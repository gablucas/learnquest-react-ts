import React from 'react';
import Styles from '../Panel.module.css';
import { GlobalContext } from '../../../GlobalContext';
import EditDefaultPassword from './editDefaultPassword';


const Preferences = () => {
  const { data } = React.useContext(GlobalContext);
  const [toggle, setToggle] = React.useState<boolean>(false)

  return (
    <div className={Styles.preferences}>

      <div className={Styles.preferences_defaultpassword}>
        <span>Senha padrão</span>
        <span>{data?.preferences.defaultPassword}</span>
        <button onClick={() => setToggle(true)}>Alterar senha</button>
      </div>

    {toggle && (
      <EditDefaultPassword setToggle={setToggle} />
    )}
    </div>
  )
}

export default Preferences;