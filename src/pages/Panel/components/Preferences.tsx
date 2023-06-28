import React from 'react';
import { GlobalContext } from "../../../GlobalContext";
import { IInstituition } from '../../../hooks/useUsers';

const Preferences = () => {
  const { myData } = React.useContext(GlobalContext);

  return (
    <div>
      <div>
        <h2>Senha padrão</h2>
        <span>{(myData as IInstituition).preferences.defaultPassword}</span>
      </div>
    </div>
  )
}

export default Preferences;