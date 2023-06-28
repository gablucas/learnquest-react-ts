import Container from "../../components/Container";
import Styles from './Plans.module.css';


const Plans = () => {

  return (
    <Container>
      <div className={Styles.plans}>

        <div>
          <h2>Plano 1</h2>
          <ul>
            <li>20 professores</li>
          </ul>
          <button>Assinar</button>
        </div>

        <div>
          <h2>Plano 2</h2>
          <ul>
            <li>100 professores</li>
            <li>200 alunos</li>
          </ul>
          <button>Assinar</button>

        </div>

        <div>
          <h2>Plano 3</h2>
          <ul>
            <li>100 professores</li>
            <li>200 alunos</li>
          </ul>
          <button>Assinar</button>
        </div>

      </div>
    </Container>
  )

}

export default Plans;