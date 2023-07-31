import Panel from '../../../Panel.module.css';

const LessonsHeader = () => {
  return (
    <div>
      <span>Título</span>
      <span>Criada por</span>
      <span>Matéria</span>
      <span>Estado</span>
      <span className={Panel.mobile}>Informações</span>
      <span>Editar</span>
      <span>Excluir</span>
    </div>
  )
}

export default LessonsHeader;