import Styles from '../Tutorial.module.css';

const Faq = () => {

  return (
    <div className={Styles.faq}>
      <h2>Dúvidas</h2>

      <div>
        <h3>Como os alunos tem acesso a aula?</h3>
        <span>O aluno é identificado pela sua turma, ou seja, é necessário ter uma turma criada com os alunos vínculados a ela. Dessa forma ao criar uma aula basta selecionar a turma (conjunto de alunos) que vão ter acesso a aquela aula.</span>
      </div>
      
      <div>
        <h3>O que acontece após o aluno finalizar a aula?</h3>
        <span data-testid='mainspan'>Após o aluno ter finalizado a aula, a tarefa que o mesmo realizou irá para fila de avaliações <span className={Styles.highlight}>(Avaliar tarefas)</span>, e após ser avaliada pelo professor reponsável ou algum administrador, o aluno receberá a XP pelo seus acertos na tarefa e as informações da mesma aparecerão em seu painel <span className={Styles.highlight}>(Minhas informações).</span></span>
      </div>
    </div>
  )
}

export default Faq;