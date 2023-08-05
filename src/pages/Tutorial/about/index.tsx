import Styles from '../Tutorial.module.css';

const About = () => {

  return (
    <div className={Styles.about}>
      <h2>O que é a LearnQuest?</h2>
      <span data-testid='textabout'>A LearnQuest é uma plataforma de ensino gamificada, ou seja, os alunos são recompensados com XP pela participação nas aulas e resolução da tarefas. O aluno também possui um nível, esse nível sobe quando o aluno atinge a quantidade de XP necessária. Esse sistema é adotado dos games de RPG, a idéia é poder tornar o aprendizado mais divertido e motivador.</span>
    </div>
  )
}

export default About;