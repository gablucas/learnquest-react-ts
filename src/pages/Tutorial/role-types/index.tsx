import Styles from '../Tutorial.module.css';

const RoleTypes = () => {

  return (
    <div  className={Styles.roles}>
      <h2>Tipos de acessos</h2>

      <div>
        <h3>Administrador</h3>
        <ul>
          <li>Tem acesso total</li>
          <li>Pode criar, editar e excluir usuarios, turmas, matérias, alunos e aulas</li>
          <li>Pode avaliar tarefas de todos os alunos</li>
        </ul>
      </div>

      <div>
        <h3>Professor</h3>
        <ul>
          <li>Pode ver os alunos vinculados a ele</li>
          <li>Pode criar aulas (somente para a matéria e turma(s) vinculada(s) a ele)</li>
          <li>Pode avaliar tarefas (somente das suas aulas)</li>
        </ul>
      </div>

      <div>
        <h3>Aluno</h3>
        <ul>
          <li>Pode ver as informações dele</li>
          <li>Pode participar das aulas e fazer tarefas</li>
        </ul>
      </div>
    </div>
  )
}

export default RoleTypes;