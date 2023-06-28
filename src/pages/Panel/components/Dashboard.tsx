import useData from '../../../hooks/useData';
import styles from '../Panel.module.css';

const Dashboard = () => {
  const data = useData();

  return (
    <div className={styles.dashboard}>
      <div>
        Total alunos
        <span>{data.myData.users.filter((f) => f.access === 'student').length}</span>
      </div>

      <div>
        Total professores
        <span>{data.myData.users.filter((f) => f.access === 'teacher').length}</span>
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