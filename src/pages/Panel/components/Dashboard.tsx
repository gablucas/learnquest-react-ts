import React from 'react';
import styles from '../Panel.module.css';
import { GlobalContext } from '../../../GlobalContext';

const Dashboard = () => {
  const { myData } = React.useContext(GlobalContext);

  return (
    <div className={styles.dashboard}>
      <div>
        Total alunos
        <span>{myData && myData.users.filter((f) => f.access === 'student').length}</span>
      </div>

      <div>
        Total professores
        <span>{myData && myData.users.filter((f) => f.access === 'teacher').length}</span>
      </div>

      <div>
        Alunos online
        <span>0</span>
      </div>

      <div>
        Professores online
        <span>0</span>
      </div>

      <div>
        Aulas criadas
        <span>0</span>
      </div>

    </div>
  )
}

export default Dashboard;