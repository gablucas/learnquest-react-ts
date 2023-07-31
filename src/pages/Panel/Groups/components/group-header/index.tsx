import Panel from '../../../Panel.module.css';

const GroupHeader = () => {
  return (
    <div>
      <span>Nome</span>
      <span>Alunos</span>
      <span>Professores</span>
      <span>Estado</span>
      <span className={Panel.mobile}>Informações</span>
      <span>Editar</span>
      <span>Excluir</span>
    </div>
  )
}

export default GroupHeader;