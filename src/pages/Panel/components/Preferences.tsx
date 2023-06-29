import React from 'react';
import { GlobalContext } from '../../../GlobalContext';


const Preferences = () => {
  const { data } = React.useContext(GlobalContext);

  return (
    <div>
      <div>
        <h2>Senha padrão</h2>
        <span>{data.preferences.defaultPassword}</span>
      </div>
    </div>
  )
}

export default Preferences;