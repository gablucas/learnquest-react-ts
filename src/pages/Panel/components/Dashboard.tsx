import React from 'react';
import styles from '../Panel.module.css';
import { GlobalContext } from '../../../GlobalContext';

const Dashboard = () => {
  const { data } = React.useContext(GlobalContext);

  return (
    <div className={styles.dashboard_container}>
      <div>
        Administradores
        <span>{data?.users.filter((f) => f.access === 'admin').length}</span>
      </div>

      <div>
        Professores
        <span>{data?.users.filter((f) => f.access === 'teacher').length}</span>
      </div>

      <div>
        Alunos
        <span>{data?.users.filter((f) => f.access === 'student').length}</span>
      </div>

      <div>
        Aulas
        <span>{data?.lessons.length}</span>
      </div>

      <div>
        Alunos online
        <span>0</span>
      </div>

      <div>
        Professores online
        <span>0</span>
      </div>


    </div>
  )
}

export default Dashboard;